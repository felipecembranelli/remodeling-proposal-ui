'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  Collapse,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { createProposal } from '@/app/services/proposalService';

interface ProposalFormData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyType: string;
  propertySize: number;
  region: string;
  budget: number;
  requestedServices: string[];
  siteAnalysis: string;
}

interface FormErrors {
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  propertyType?: string;
  propertySize?: string;
  region?: string;
  budget?: string;
  siteAnalysis?: string;
  requestedServices?: string[];
}

const steps = ['Client Information', 'Property Details', 'Site Analysis', 'Services Selection', 'Review & Submit'];

export default function ProposalForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<ProposalFormData>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    propertyType: '',
    propertySize: 0,
    region: '',
    budget: 0,
    requestedServices: [],
    siteAnalysis: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof ProposalFormData]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ProposalFormData]) {
      setErrors(prev => ({
        ...prev,
        [name as keyof ProposalFormData]: undefined,
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
    
    switch (activeStep) {
      case 0: // Client Information
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
        break;

      case 1: // Property Details
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
        break;

      case 2: // Site Analysis
        if (!formData.siteAnalysis.trim()) {
          newErrors.siteAnalysis = 'Site analysis is required';
        }
        break;

      case 3: // Services Selection
        if (formData.requestedServices.length === 0) {
          newErrors.requestedServices = ['At least one service is required'];
        }
        break;

      case 4: // Review & Submit
        // Validate all fields for the final step
        if (!formData.clientName.trim()) {
          newErrors.clientName = 'Client name is required';
        }
        if (!formData.clientPhone.trim()) {
          newErrors.clientPhone = 'Phone number is required';
        }
        if (!formData.clientEmail.trim()) {
          newErrors.clientEmail = 'Email is required';
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
        if (!formData.siteAnalysis.trim()) {
          newErrors.siteAnalysis = 'Site analysis is required';
        }
        if (formData.requestedServices.length === 0) {
          newErrors.requestedServices = ['At least one service is required'];
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const proposal = await createProposal(formData);
      router.push(`/proposals/${proposal.id}`);
    } catch (error) {
      console.error('Error creating proposal:', error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to create proposal. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
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
        );
      case 1:
        return (
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
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Site Analysis"
                name="siteAnalysis"
                value={formData.siteAnalysis}
                onChange={handleInputChange}
                error={!!errors.siteAnalysis}
                helperText={errors.siteAnalysis || 'Describe the property characteristics and conditions'}
                required
                multiline
                rows={6}
                placeholder="Enter property characteristics, conditions, and any specific requirements..."
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            {['Kitchen Remodel', 'Bathroom Renovation', 'Flooring Installation', 'Interior Painting', 'Carpentry Work'].map((service) => (
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
            {errors.requestedServices && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.requestedServices[0]}</FormHelperText>
              </Grid>
            )}
          </Grid>
        );
      case 4:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Please Review Your Proposal Details
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Client Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Name: {formData.clientName || 'Not provided'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {formData.clientPhone || 'Not provided'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {formData.clientEmail || 'Not provided'}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Property Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {formData.propertyType || 'Not provided'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {formData.propertySize ? `${formData.propertySize} sq ft` : 'Not provided'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Region: {formData.region || 'Not provided'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Budget: {formData.budget ? `$${formData.budget.toLocaleString()}` : 'Not provided'}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Site Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                {formData.siteAnalysis || 'Not provided'}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Requested Services
              </Typography>
              {formData.requestedServices.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {formData.requestedServices.map((service) => (
                    <li key={service}>
                      <Typography variant="body2" color="text.secondary">
                        {service}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No services selected
                </Typography>
              )}
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={hasReviewed}
                  onChange={(e) => setHasReviewed(e.target.checked)}
                  color="primary"
                  required
                />
              }
              label={
                <Typography variant="body2">
                  I have reviewed all the information and confirm it is accurate
                </Typography>
              }
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting || !hasReviewed}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isSubmitting ? 'Creating Proposal...' : 'Create Proposal'}
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setErrorMessage(null)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
} 