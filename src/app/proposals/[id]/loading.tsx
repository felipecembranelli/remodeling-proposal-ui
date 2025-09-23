import {
  Container,
  Grid,
  Paper,
  Skeleton,
  Box,
} from '@mui/material';

export default function LoadingProposalDetail() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="rectangular" width={120} height={36} sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={48} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
            <Skeleton variant="rectangular" width={100} height={32} />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {/* Client Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Skeleton variant="rectangular" width={150} height={32} sx={{ mb: 2 }} />
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3, 4].map((index) => (
                <Skeleton key={index} variant="text" height={24} sx={{ mb: 1 }} />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Project Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Skeleton variant="rectangular" width={150} height={32} sx={{ mb: 2 }} />
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3].map((index) => (
                <Skeleton key={index} variant="text" height={24} sx={{ mb: 1 }} />
              ))}
              <Skeleton variant="rectangular" height={80} sx={{ mt: 2 }} />
            </Box>
          </Paper>
        </Grid>

        {/* Services */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Skeleton variant="rectangular" width={150} height={32} sx={{ mb: 3 }} />
            {[1, 2, 3].map((index) => (
              <Skeleton key={index} variant="rectangular" height={52} sx={{ mb: 1 }} />
            ))}
          </Paper>
        </Grid>

        {/* Materials */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Skeleton variant="rectangular" width={150} height={32} sx={{ mb: 3 }} />
            {[1, 2, 3].map((index) => (
              <Skeleton key={index} variant="rectangular" height={52} sx={{ mb: 1 }} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 