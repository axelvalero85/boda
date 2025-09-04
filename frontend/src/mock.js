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
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Pareja feliz"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Momento romántico"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Anillo de compromiso"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Caminando juntos"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Abrazo tierno"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Risas y alegría"
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