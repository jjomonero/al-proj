import { Property, Contract, Payment, Appointment } from "@/types";

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Base URL configuration
const BASE_URL = import.meta.env.VITE_API_URL || "https://lov-p-3e7c78b3-720f-4640-b061-a876617413c1.fly.dev";

// Mock data
const properties: Property[] = [
  {
    id: "1",
    title: "Apartamento Moderno",
    address: "Rua das Flores, 123",
    price: 2500,
    status: "available",
    type: "Apartamento",
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    images: ["/apartment1.jpg", "/apartment2.jpg"]
  },
  {
    id: "2",
    title: "Casa Espaçosa",
    address: "Av. Principal, 456",
    price: 3800,
    status: "rented",
    type: "Casa",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: ["/house1.jpg", "/house2.jpg"]
  }
];

const contracts: Contract[] = [
  {
    id: "1",
    propertyId: "1",
    property: "Apartamento Moderno",
    tenant: "João Silva",
    status: "active",
    value: "R$ 2.500,00",
    dueDate: "15/05/2024",
    startDate: "15/01/2024",
    endDate: "15/01/2025"
  },
  {
    id: "2",
    propertyId: "2",
    property: "Casa Espaçosa",
    tenant: "Maria Santos",
    status: "pending",
    value: "R$ 3.800,00",
    dueDate: "10/05/2024",
    startDate: "10/01/2024",
    endDate: "10/01/2025"
  }
];

const payments: Payment[] = [
  {
    id: "1",
    contractId: "1",
    amount: 2500,
    status: "paid",
    dueDate: "2024-04-15",
    paidAt: "2024-04-14"
  },
  {
    id: "2",
    contractId: "2",
    amount: 3800,
    status: "pending",
    dueDate: "2024-05-10"
  }
];

const appointments: Appointment[] = [
  {
    id: "1",
    propertyId: "1",
    property: "Apartamento Moderno",
    client: "Carlos Oliveira",
    date: "2024-05-20",
    time: "14:00",
    status: "scheduled"
  },
  {
    id: "2",
    propertyId: "2",
    property: "Casa Espaçosa",
    client: "Ana Paula",
    date: "2024-05-21",
    time: "10:00",
    status: "scheduled"
  }
];

// API helper function to handle requests
const handleRequest = async (endpoint: string) => {
  try {
    await delay(1000); // Simulate network delay
    const url = `${BASE_URL}${endpoint}`;
    // For now, return mock data directly since we're using simulated data
    return null;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const api = {
  properties: {
    list: async () => {
      await delay(1000);
      return properties;
    },
    getById: async (id: string) => {
      await delay(500);
      return properties.find(p => p.id === id);
    }
  },
  contracts: {
    list: async () => {
      await delay(1000);
      return contracts;
    },
    getById: async (id: string) => {
      await delay(500);
      return contracts.find(c => c.id === id);
    }
  },
  payments: {
    list: async () => {
      await delay(1000);
      return payments;
    },
    getById: async (id: string) => {
      await delay(500);
      return payments.find(p => p.id === id);
    }
  },
  appointments: {
    list: async () => {
      await delay(1000);
      return appointments;
    },
    getById: async (id: string) => {
      await delay(500);
      return appointments.find(a => a.id === id);
    }
  }
};
