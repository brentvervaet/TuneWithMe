import { FormProvider, useForm } from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Stack, 
  IconButton, InputAdornment, LinearProgress } from '@mui/material';
import { useAuth } from '../../contexts/auth';
import Error from '../../components/Error';
import LabelInput from '../../components/LabelInput';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import zxcvbn from 'zxcvbn';
import {red,orange,yellow,lime,green,grey} from '@mui/material/colors';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default function Register() {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const methods = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, getValues, watch } = methods;

  const handleRegister = useCallback(async ({ firstname,lastname,username, email, password }) => {
    
    const loggedIn = await register({
      firstname:capitalizeFirstLetter(firstname),
      lastname:capitalizeFirstLetter(lastname),
      username,
      email,
      password,
    });

    if (loggedIn) {
      navigate({
        pathname: '/',
        replace: true,
      });
    }
  }, [register, navigate]);

  const validationRules = useMemo(() => ({
    firstname: { required: 'Firstname is required' },
    lastname: { required: 'Lastname is required' },
    username: { required: 'Username is required' },
    email: { required: 'Email is required' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 5,
        message: 'Password must be at least 5 characters long',
      },
    },
    confirmPassword: {
      required: 'Password confirmation is required',
      validate: (value) => {
        const password = getValues('password');
        return password === value || 'Passwords do not match';
      },
    },
  }), [getValues]);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Watch password field and update password strength
  const password = watch('password');
  useMemo(() => {
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  }, [password]);

  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
        return red[500];
      case 1:
        return orange[400];
      case 2:
        return yellow[600];
      case 3:
        return lime[600];
      case 4:
        return green[500];
      default:
        return red[500];
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
          <form onSubmit={handleSubmit(handleRegister)}>
            
            <Typography variant="h4" component="h1" gutterBottom>
              Register
            </Typography>

            <Error error={error} />

            <LabelInput
              label="Username"
              type="text"
              name="username"
              validationRules={validationRules.username}
            />
            <LabelInput
              label="Firstname"
              type="text"
              name="firstname"
              validationRules={validationRules.firstname}
            />
            <LabelInput
              label="Lastname"
              type="text"
              name="lastname"
              validationRules={validationRules.lastname}
            />

            <LabelInput
              label="Email"
              type="email"
              name="email"
              placeholder='your@email.com'
              validationRules={validationRules.email}
            />

            <LabelInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              validationRules={validationRules.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box mt={2}>
              <LinearProgress
                variant="determinate"
                value={(passwordStrength + 1) * 20}
                sx={{
                  height: 5,
                  bgcolor: grey[300],
                  '& .MuiLinearProgress-bar': {
                    bgcolor: getPasswordStrengthColor(passwordStrength),
                  },
                }}
              />
              <Typography
                variant="caption"
                display="block"
                align="center"
                sx={{ color: getPasswordStrengthColor(passwordStrength),mt:1 }}
              >
                Password strength: {['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength]}
              </Typography>
            </Box>

            <LabelInput
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              validationRules={validationRules.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" justifyContent="center" mt={2}>
              <Stack spacing={2}>
                <Stack direction={'row'} spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register'}

                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={() => methods.reset()}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </Stack>
                <Typography variant="caption" align='center'>
                  Already have an account?{' '}
                  <Typography variant='inherit' color="primary" display={'inline'}>
                    <NavLink to="/login" style={{ color: 'inherit' }}>
                      Log in
                    </NavLink>
                  </Typography>
                </Typography>
              </Stack>
            </Box>
          </form>
        </Paper>
      </Container>
    </FormProvider>
  );
}