'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Proposals', path: '/proposals' },
    { label: 'New Proposal', path: '/proposals/new' },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{
        background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontWeight: 700,
              letterSpacing: '0.5px',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            RemodelingPro
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    component={Link}
                    href={item.path}
                    onClick={handleMobileMenuClose}
                    sx={{
                      color: isActive(item.path) ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(26, 35, 126, 0.08)',
                      },
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  href={item.path}
                  sx={{
                    color: 'white',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: isActive(item.path) ? '100%' : '0%',
                      height: '2px',
                      backgroundColor: 'white',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    fontWeight: isActive(item.path) ? 600 : 400,
                    px: 2,
                    py: 1,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
} 