// Mock data for Axel and Dani's wedding website

export const weddingData = {
  couple: {
    bride: "Dani",
    groom: "Axel",
    weddingDate: "7 de Febrero, 2026",
    venue: "Finca San Gabriel La Cañada, Estado de México"
  },
  
  rsvp: {
    isOpen: true,
    deadline: "15 de Enero, 2026"
  },
  
  photos: [
    {
      id: 1,
      url: "https://customer-assets.emergentagent.com/job_boda-especial/artifacts/3besqdva_Dos.JPG",
      alt: "Axel y Dani juntos en el bosque"
    },
    {
      id: 2,
      url: "https://customer-assets.emergentagent.com/job_boda-especial/artifacts/2qjwnbw5_Anillos.JPG",
      alt: "Los anillos de boda"
    },
    {
      id: 3,
      url: "https://customer-assets.emergentagent.com/job_boda-especial/artifacts/3dz7ma6t_Axel.JPG",
      alt: "Axel en el bosque"
    },
    {
      id: 4,
      url: "https://customer-assets.emergentagent.com/job_axeldani-wedding/artifacts/kwqibtpu_pasto2.jpg",
      alt: "Pareja sentada en el pasto"
    },
    {
      id: 5,
      url: "https://customer-assets.emergentagent.com/job_boda-especial/artifacts/29yoedq1_Dani.JPG",
      alt: "Dani en el bosque"
    },
    {
      id: 6,
      url: "https://customer-assets.emergentagent.com/job_boda-especial/artifacts/hu721xpq_Caballo.png",
      alt: "Momento romántico junto al caballo"
    }
  ],
  
  venue: {
    name: "Finca San Gabriel La Cañada",
    address: "Estado de México",
    coordinates: {
      lat: 19.327,
      lng: -99.281
    },
    description: "Un hermoso lugar natural perfecto para celebrar nuestro amor."
  },
  
  giftRegistry: {
    message: "Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, aquí tienes el enlace a nuestra mesa de regalos:",
    url: "https://mesaderegalos.liverpool.com.mx/milistaderegalos/51234567" // Mock URL
  },
  
  timeline: {
    ceremony: "16:00 hrs",
    cocktail: "17:30 hrs", 
    reception: "19:00 hrs",
    party: "21:00 hrs"
  }
};

// Mock RSVP responses storage
export const mockRSVPs = [];

// Function to simulate saving RSVP
export const saveRSVP = (rsvpData) => {
  mockRSVPs.push({
    ...rsvpData,
    id: Date.now(),
    timestamp: new Date().toISOString()
  });
  return Promise.resolve({ success: true, message: "RSVP guardado exitosamente" });
};