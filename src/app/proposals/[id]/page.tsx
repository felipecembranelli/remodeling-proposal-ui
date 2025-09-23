'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Chip,
  Button,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Service {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  totalCost: number;
}

interface Material {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  totalCost: number;
}

interface Proposal {
  id: string;
  propertyType: string;
  propertySize: string;
  region: string;
  budget: string;
  proposalRawBody: string;
  status: string;
  createdAt: string;
  validUntil: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
}

export default function ProposalDetail() {
  const { id } = useParams();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proposals/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch proposal');
        }
        const data = await response.json();
        setProposal(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !proposal) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error" gutterBottom>
          {error || 'Proposal not found'}
        </Typography>
        <Button
          component={Link}
          href="/proposals"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Proposals
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          component={Link}
          href="/proposals"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Proposals
        </Button>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h5" gutterBottom>
              Proposal
            </Typography>
            <Typography variant="body1" gutterBottom>
              Id # {proposal.id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
            <Chip
              label={proposal.status}
              color={proposal.status.toLowerCase() === 'approved' ? 'success' : 'default'}
              sx={{ fontSize: '1rem', py: 2, px: 1 }}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {/* Client Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Client Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {proposal.clientName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {proposal.clientEmail}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> {proposal.clientPhone}
              </Typography>
              <Typography variant="body1">
                <strong>Location:</strong> {proposal.region}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Project Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Project Details
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Created:</strong> {proposal.createdAt}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Budget:</strong> ${proposal.budget}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Property Type:</strong> {proposal.propertyType}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Property Size (sql ft):</strong> {proposal.propertySize}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Valid Until:</strong> {proposal.validUntil}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Description Section - Full Width */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Content
            </Typography>
            <Box 
              sx={{ 
                mt: 2,
                p: 3,
                backgroundColor: 'background.default',
                borderRadius: 1,
                minHeight: '300px',
                '& pre': {
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  margin: 0,
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  lineHeight: 1.6
                }
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: proposal.proposalRawBody
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 