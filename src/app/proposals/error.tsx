'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="error">
          Something went wrong!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {error.message || 'An error occurred while loading the proposals.'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={reset}
          sx={{ mt: 2 }}
        >
          Try again
        </Button>
      </Box>
    </Container>
  );
} 