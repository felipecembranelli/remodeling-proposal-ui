export interface ProposalFormData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyType: string;
  propertySize: number;
  region: string;
  budget: number;
  requestedServices: string[];
}

export interface Proposal extends ProposalFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  totalPrice: number;
  notes?: string;
} 