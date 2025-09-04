from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email Configuration
class EmailConfig:
    SMTP_SERVER = os.getenv("GMAIL_SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("GMAIL_SMTP_PORT", "587"))
    USERNAME = os.getenv("GMAIL_USERNAME")
    PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
    FROM_NAME = os.getenv("GMAIL_FROM_NAME", "Wedding RSVP System")
    USE_TLS = True

class EmailService:
    def __init__(self):
        self.config = EmailConfig()
        self._validate_config()
    
    def _validate_config(self):
        if not self.config.USERNAME or not self.config.PASSWORD:
            raise ValueError("Gmail credentials not properly configured")
    
    def send_rsvp_notification(self, rsvp_data: dict) -> bool:
        """Send RSVP notification email to the couple"""
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Nueva Confirmación RSVP - {rsvp_data['name']}"
            msg["From"] = f"{self.config.FROM_NAME} <{self.config.USERNAME}>"
            msg["To"] = self.config.USERNAME  # Send to axelvalero@gmail.com
            
            # Create HTML and text versions
            html_content = self._create_notification_html(rsvp_data)
            text_content = self._create_notification_text(rsvp_data)
            
            msg.attach(MIMEText(text_content, "plain"))
            msg.attach(MIMEText(html_content, "html"))
            
            # Send email
            context = ssl.create_default_context()
            with smtplib.SMTP(self.config.SMTP_SERVER, self.config.SMTP_PORT) as server:
                server.starttls(context=context)
                server.login(self.config.USERNAME, self.config.PASSWORD)
                server.send_message(msg)
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to send RSVP notification email: {str(e)}")
            return False
    
    def _create_notification_html(self, rsvp_data: dict) -> str:
        """Create HTML email template for RSVP notification"""
        attendance_text = "✅ SÍ asistirá" if rsvp_data['attendance'] == 'si' else "❌ NO asistirá"
        attendance_color = "#28a745" if rsvp_data['attendance'] == 'si' else "#dc3545"
        
        transport_text = ""
        if rsvp_data.get('transport'):
            transport_text = f"<p><strong>🚗 Transporte:</strong> {'Necesita transporte' if rsvp_data['transport'] == 'si' else 'No necesita transporte'}</p>"
        
        phone_text = f"<p><strong>📱 Teléfono:</strong> {rsvp_data['phone']}</p>" if rsvp_data.get('phone') else ""
        allergies_text = f"<p><strong>🍽️ Alergias/Restricciones:</strong> {rsvp_data['allergies']}</p>" if rsvp_data.get('allergies') else ""
        message_text = f"<p><strong>💬 Mensaje:</strong> {rsvp_data['message']}</p>" if rsvp_data.get('message') else ""
        
        return f"""
        <html>
            <body style="font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background-color: #ae9c8f;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2e2e22; font-size: 28px; margin: 0;">💒 Nueva Confirmación RSVP</h1>
                        <h2 style="color: #917955; font-size: 24px; margin: 10px 0;">Axel & Dani</h2>
                        <p style="color: #666; font-size: 16px;">Boda • 07 de Febrero, 2026</p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #2e2e22; margin-top: 0;">📝 Detalles de la Confirmación</h3>
                        <p><strong>👤 Nombre:</strong> {rsvp_data['name']}</p>
                        <p><strong>📧 Email:</strong> {rsvp_data['email']}</p>
                        {phone_text}
                        <p><strong>✨ Asistencia:</strong> <span style="color: {attendance_color}; font-weight: bold;">{attendance_text}</span></p>
                        {transport_text}
                        {allergies_text}
                        {message_text}
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            ⏰ Recibido el {rsvp_data.get('timestamp', datetime.now(timezone.utc)).strftime('%d/%m/%Y a las %H:%M')}
                        </p>
                        <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">
                            🌐 Sistema de Confirmaciones - Boda Axel & Dani
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
    
    def _create_notification_text(self, rsvp_data: dict) -> str:
        """Create plain text email template for RSVP notification"""
        attendance_text = "SÍ asistirá" if rsvp_data['attendance'] == 'si' else "NO asistirá"
        
        text_parts = [
            "=== NUEVA CONFIRMACIÓN RSVP ===",
            "Boda de Axel & Dani - 07 de Febrero, 2026",
            "",
            "DETALLES DE LA CONFIRMACIÓN:",
            f"Nombre: {rsvp_data['name']}",
            f"Email: {rsvp_data['email']}",
        ]
        
        if rsvp_data.get('phone'):
            text_parts.append(f"Teléfono: {rsvp_data['phone']}")
        
        text_parts.append(f"Asistencia: {attendance_text}")
        
        if rsvp_data.get('transport'):
            transport_text = "Necesita transporte" if rsvp_data['transport'] == 'si' else "No necesita transporte"
            text_parts.append(f"Transporte: {transport_text}")
        
        if rsvp_data.get('allergies'):
            text_parts.append(f"Alergias/Restricciones: {rsvp_data['allergies']}")
        
        if rsvp_data.get('message'):
            text_parts.append(f"Mensaje: {rsvp_data['message']}")
        
        text_parts.extend([
            "",
            f"Recibido el {rsvp_data.get('timestamp', datetime.now(timezone.utc)).strftime('%d/%m/%Y a las %H:%M')}",
            "",
            "Sistema de Confirmaciones - Boda Axel & Dani"
        ])
        
        return "\n".join(text_parts)

# Initialize email service
email_service = EmailService()

# Create the main app without a prefix
app = FastAPI(title="Axel & Dani Wedding API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper functions for MongoDB serialization
def prepare_for_mongo(data):
    """Convert datetime objects to ISO strings for MongoDB storage"""
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
    return data

def parse_from_mongo(item):
    """Parse datetime strings back from MongoDB"""
    if isinstance(item, dict):
        for key, value in item.items():
            if key == 'timestamp' and isinstance(value, str):
                try:
                    item[key] = datetime.fromisoformat(value)
                except ValueError:
                    pass  # Keep as string if parsing fails
    return item

# RSVP Models
class RSVPResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    attendance: str = Field(..., pattern="^(si|no)$")  # "si" or "no"
    allergies: Optional[str] = Field(None, max_length=500)
    transport: Optional[str] = Field(None, pattern="^(si|no)?$")  # "si", "no", or None
    message: Optional[str] = Field(None, max_length=1000)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RSVPCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    attendance: str = Field(..., pattern="^(si|no)$")
    allergies: Optional[str] = Field(None, max_length=500)
    transport: Optional[str] = Field(None, pattern="^(si|no)?$")
    message: Optional[str] = Field(None, max_length=1000)

class RSVPStats(BaseModel):
    total_responses: int
    attending: int
    not_attending: int
    transport_needed: int

# Legacy Status Check Models (keeping for backward compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Routes
@api_router.get("/")
async def root():
    return {
        "message": "Axel & Dani Wedding API", 
        "version": "1.0.0",
        "status": "active"
    }

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        await db.list_collection_names()
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database connection failed: {str(e)}")

# RSVP Endpoints
@api_router.post("/rsvp", response_model=RSVPResponse)
async def create_rsvp(rsvp_data: RSVPCreate):
    """Create a new RSVP response"""
    try:
        # Create RSVP object
        rsvp_dict = rsvp_data.dict()
        rsvp_obj = RSVPResponse(**rsvp_dict)
        
        # Prepare for MongoDB storage
        rsvp_mongo = prepare_for_mongo(rsvp_obj.dict())
        
        # Insert into database
        result = await db.rsvp_responses.insert_one(rsvp_mongo)
        
        if result.inserted_id:
            logger.info(f"RSVP created successfully for {rsvp_obj.name} ({rsvp_obj.email})")
            return rsvp_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to save RSVP")
            
    except Exception as e:
        logger.error(f"Error creating RSVP: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving RSVP: {str(e)}")

@api_router.get("/rsvp", response_model=List[RSVPResponse])
async def get_rsvp_responses():
    """Get all RSVP responses"""
    try:
        rsvp_responses = await db.rsvp_responses.find().to_list(1000)
        parsed_responses = [parse_from_mongo(rsvp) for rsvp in rsvp_responses]
        return [RSVPResponse(**rsvp) for rsvp in parsed_responses]
    except Exception as e:
        logger.error(f"Error fetching RSVPs: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching RSVPs: {str(e)}")

@api_router.get("/rsvp/stats", response_model=RSVPStats)
async def get_rsvp_stats():
    """Get RSVP statistics"""
    try:
        # Count total responses
        total_responses = await db.rsvp_responses.count_documents({})
        
        # Count attending
        attending = await db.rsvp_responses.count_documents({"attendance": "si"})
        
        # Count not attending
        not_attending = await db.rsvp_responses.count_documents({"attendance": "no"})
        
        # Count transport needed
        transport_needed = await db.rsvp_responses.count_documents({"transport": "si"})
        
        return RSVPStats(
            total_responses=total_responses,
            attending=attending,
            not_attending=not_attending,
            transport_needed=transport_needed
        )
    except Exception as e:
        logger.error(f"Error fetching RSVP stats: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")

@api_router.get("/rsvp/{rsvp_id}", response_model=RSVPResponse)
async def get_rsvp_by_id(rsvp_id: str):
    """Get a specific RSVP by ID"""
    try:
        rsvp = await db.rsvp_responses.find_one({"id": rsvp_id})
        if not rsvp:
            raise HTTPException(status_code=404, detail="RSVP not found")
        
        parsed_rsvp = parse_from_mongo(rsvp)
        return RSVPResponse(**parsed_rsvp)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching RSVP {rsvp_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching RSVP: {str(e)}")

# Legacy Status Check Endpoints (keeping for backward compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    """Legacy status check endpoint"""
    try:
        status_dict = input.dict()
        status_obj = StatusCheck(**status_dict)
        status_mongo = prepare_for_mongo(status_obj.dict())
        
        await db.status_checks.insert_one(status_mongo)
        return status_obj
    except Exception as e:
        logger.error(f"Error creating status check: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error creating status check: {str(e)}")

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    """Legacy status check endpoint"""
    try:
        status_checks = await db.status_checks.find().to_list(1000)
        parsed_checks = [parse_from_mongo(check) for check in status_checks]
        return [StatusCheck(**check) for check in parsed_checks]
    except Exception as e:
        logger.error(f"Error fetching status checks: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching status checks: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Database connection closed")

@app.on_event("startup")
async def startup_event():
    logger.info("Axel & Dani Wedding API starting up...")
    logger.info(f"MongoDB URL: {mongo_url}")
    logger.info(f"Database: {os.environ['DB_NAME']}")
    
    # Test database connection
    try:
        await db.list_collection_names()
        logger.info("Database connection successful")
    except Exception as e:
        logger.error(f"Database connection failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)