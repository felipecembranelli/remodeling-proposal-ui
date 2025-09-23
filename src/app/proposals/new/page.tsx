import { Container, Typography, Paper, Box } from '@mui/material';
import ProposalForm from '@/app/components/ProposalForm';

export default function NewProposalPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Proposal
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fill out the form below to generate a new landscaping proposal. We'll help you create a detailed plan based on your property details and requirements.
          </Typography>
        </Box>
        <ProposalForm />
      </Paper>
    </Container>
  );
} 