export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  status: 'available' | 'rented';
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
}

export interface Contract {
  id: string;
  propertyId: string;
  property: string;
  tenant: string;
  status: 'active' | 'pending' | 'expired';
  value: string;
  dueDate: string;
  startDate: string;
  endDate: string;
}

export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  status: 'paid' | 'pending' | 'late';
  dueDate: string;
  paidAt?: string;
}

export interface Appointment {
  id: string;
  propertyId: string;
  property: string;
  client: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}