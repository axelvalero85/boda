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
    message: "En este día tan importante para nosotros tu compañía es el mejor regalo. Si te gustaría darnos un regalo o apoyarnos para la luna de miel, te compartimos nuestra mesa de regalos.",
    url: "https://zepika.com/pages/boda-dani-axel"
  },
  
  timeline: {
    ceremony: "14:00 hrs",
    cocktail: "17:00 hrs", 
    reception: "16:30 hrs",
    party: "18:00 hrs"
  },

  logos: {
    black: "https://customer-assets.emergentagent.com/job_axeldani-wedding/artifacts/rclm0ktl_LOGO%20AD.png",
    golden: "https://customer-assets.emergentagent.com/job_axeldani-wedding/artifacts/w07soup3_LOGO%20AD2.png"
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