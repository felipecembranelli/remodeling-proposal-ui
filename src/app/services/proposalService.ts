import { ProposalFormData } from '@/app/types/proposal';

export async function createProposal(formData: ProposalFormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proposals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create proposal');
  }

  return response.json();
}

export async function getProposals() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proposals`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch proposals');
  }

  return response.json();
}

export async function getProposal(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proposals/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch proposal');
  }

  return response.json();
}

export async function updateProposal(id: string, formData: ProposalFormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proposals/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update proposal');
  }

  return response.json();
}

export async function deleteProposal(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proposals/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete proposal');
  }

  //return response.json();
  return;
} 