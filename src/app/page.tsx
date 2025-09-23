'use client'

import { useRouter } from 'next/navigation'
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material'
import {
  Home as HomeIcon,
  Description as DescriptionIcon,
  Speed as SpeedIcon,
  Savings as SavingsIcon,
} from '@mui/icons-material'

export default function Home() {
  const router = useRouter()
  const theme = useTheme()

  const features = [
    {
      icon: <HomeIcon sx={{ fontSize: 40 }} />,
      title: 'Professional Remodeling',
      description: 'Get detailed proposals for your remodeling projects, tailored to your property type and requirements.',
    },
    {
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      title: 'Comprehensive Proposals',
      description: 'Receive well-structured proposals including design concepts, materials, timeline, and cost breakdown.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Quick Generation',
      description: 'Generate professional proposals in minutes using our AI-powered system.',
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 40 }} />,
      title: 'Cost-Effective',
      description: 'Get accurate cost estimates and stay within your budget with detailed breakdowns.',
    },
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Remodeling Proposal System
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Transform your space with professional remodeling proposals
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => router.push('/proposals/new')}
                sx={{ mr: 2 }}
              >
                Create New Proposal
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => router.push('/proposals')}
              >
                View Proposals
              </Button>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/landscape-hero.jpg"
                alt="Beautiful landscape"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid> */}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Why Choose Our System?
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Our AI-powered system helps you create professional remodeling proposals quickly and efficiently
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Create your remodeling proposal in four simple steps
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    1
                  </Typography>
                  <Typography variant="h6">Client Information</Typography>
                  <Typography color="text.secondary">
                    Enter your contact details and project requirements
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    2
                  </Typography>
                  <Typography variant="h6">Property Details</Typography>
                  <Typography color="text.secondary">
                    Specify your property type, size, and location
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    3
                  </Typography>
                  <Typography variant="h6">Services Selection</Typography>
                  <Typography color="text.secondary">
                    Choose the remodeling services you need
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    4
                  </Typography>
                  <Typography variant="h6">Review & Submit</Typography>
                  <Typography color="text.secondary">
                    Review your proposal and submit for generation
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Ready to Transform Your Space?
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Create your professional remodeling proposal now and bring your vision to life
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push('/proposals/new')}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  )
} 