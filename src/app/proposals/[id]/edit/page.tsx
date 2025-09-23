'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Grid,
  Divider,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Proposal, ProposalFormData } from '@/app/types/proposal';
import { getProposal, updateProposal } from '@/app/services/proposalService';

export default function EditProposalPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [formData, setFormData] = useState<ProposalFormData>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    propertyType: '',
    propertySize: 0,
    region: '',
    budget: 0,
    requestedServices: [],
  });
  const [errors, setErrors] = useState<Partial<ProposalFormData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProposal();
  }, [params.id]);

  const loadProposal = async () => {
    try {
      const data = await getProposal(params.id);
      setProposal(data);
      setFormData({
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        clientEmail: data.clientEmail,
        propertyType: data.propertyType,
        propertySize: data.propertySize,
        region: data.region,
        budget: data.budget,
        requestedServices: data.requestedServices,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load proposal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof ProposalFormData]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ProposalFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      requestedServices: prev.requestedServices.includes(service)
        ? prev.requestedServices.filter(s => s !== service)
        : [...prev.requestedServices, service],
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<ProposalFormData> = {};
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.clientPhone)) {
      newErrors.clientPhone = 'Please enter a valid phone number';
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Please enter a valid email address';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }

    if (!formData.propertySize || formData.propertySize <= 0) {
      newErrors.propertySize = 'Property size must be greater than 0';
    }

    if (!formData.region) {
      newErrors.region = 'Region is required';
    }

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = 'Budget must be greater than 0';
    }

    if (formData.requestedServices.length === 0) {
      newErrors.requestedServices = ['At least one service is required'];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!proposal) return;

    setIsSubmitting(true);
    try {
      await updateProposal(proposal.id, formData);
      router.push(`/proposals/${proposal.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update proposal');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!proposal) {
    return (
      <Container>
        <Typography>Proposal not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(`/proposals/${proposal.id}`)}
          sx={{ mb: 2 }}
        >
          Back to Proposal
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Proposal
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Client Information */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom>
                Client Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client Name"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    error={!!errors.clientName}
                    helperText={errors.clientName}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    error={!!errors.clientPhone}
                    helperText={errors.clientPhone || 'Format: (XXX) XXX-XXXX'}
                    required
                    placeholder="(555) 555-5555"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    error={!!errors.clientEmail}
                    helperText={errors.clientEmail}
                    required
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Property Details */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom>
                Property Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.propertyType}>
                    <InputLabel>Property Type</InputLabel>
                    <Select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      label="Property Type"
                    >
                      <MenuItem value="residential">Residential</MenuItem>
                      <MenuItem value="commercial">Commercial</MenuItem>
                      <MenuItem value="industrial">Industrial</MenuItem>
                    </Select>
                    {errors.propertyType && (
                      <FormHelperText>{errors.propertyType}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Property Size (sq ft)"
                    name="propertySize"
                    type="number"
                    value={formData.propertySize}
                    onChange={handleInputChange}
                    error={!!errors.propertySize}
                    helperText={errors.propertySize}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.region}>
                    <InputLabel>Region</InputLabel>
                    <Select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      label="Region"
                    >
                      <MenuItem value="north">North</MenuItem>
                      <MenuItem value="south">South</MenuItem>
                      <MenuItem value="east">East</MenuItem>
                      <MenuItem value="west">West</MenuItem>
                    </Select>
                    {errors.region && (
                      <FormHelperText>{errors.region}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Budget ($)"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleInputChange}
                    error={!!errors.budget}
                    helperText={errors.budget}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Requested Services */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom>
                Requested Services
              </Typography>
              <Grid container spacing={2}>
                {['Lawn Mowing', 'Tree Trimming', 'Flower Bed Maintenance', 'Irrigation', 'Mulching'].map((service) => (
                  <Grid item xs={12} sm={6} key={service}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.requestedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          color="primary"
                        />
                      }
                      label={service}
                    />
                  </Grid>
                ))}
              </Grid>
              {errors.requestedServices && (
                <FormHelperText error>{errors.requestedServices[0]}</FormHelperText>
              )}
            </Paper>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => router.push(`/proposals/${proposal.id}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 