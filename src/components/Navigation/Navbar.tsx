'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
              fontWeight: 600
            }}
          >
            Landscaping Proposals
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              href="/proposals"
              color="inherit"
              sx={{
                fontWeight: isActive('/proposals') ? 700 : 400,
                textDecoration: isActive('/proposals') ? 'underline' : 'none'
              }}
            >
              Proposals
            </Button>
            <Button
              component={Link}
              href="/"
              color="inherit"
              variant="outlined"
              sx={{
                fontWeight: isActive('/') ? 700 : 400,
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              New Proposal
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 