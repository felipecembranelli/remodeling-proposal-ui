import { Container, Skeleton, Paper, Box } from '@mui/material';

export default function LoadingProposals() {
  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Skeleton variant="rectangular" width={200} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Paper>
    </Container>
  )
} 