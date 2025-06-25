import { FormProvider, useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Stack, IconButton, InputAdornment } from '@mui/material';
import { useAuth } from '../../contexts/auth';
import Error from '../../components/Error';
import LabelInput from '../../components/LabelInput';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';

const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Invalid email address',
    },
  },
  password: { required: 'Password is required' },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(async ({ email, password }) => {
    const loggedIn = await login(email, password);
    if (loggedIn) {
      const params = new URLSearchParams(search);
      navigate({
        pathname: params.get('redirect') || '/',
        replace: true,
      });
    }
  }, [login, navigate, search]);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
          <form onSubmit={handleSubmit(handleLogin)}>

            <Typography variant="h4" component="h1" gutterBottom>
              Log in
            </Typography>

            <Error error={error} />

            <LabelInput
              label="Email"
              type="email"
              name="email"
              placeholder='your@email.com'
              validationRules={validationRules.email}
              data-cy="email_input"
            />

            <LabelInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              validationRules={validationRules.password}
              data-cy="password_input"
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

            <Box display="flex" justifyContent="center" mt={2}>
              <Stack spacing={2}>
                <Stack direction={'row'} spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    endIcon={<LoginIcon />}
                    data-cy="submit_btn"
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </Stack>

                <Typography variant="caption" align='center'>
                  No account yet?{' '}
                  <Typography variant='inherit' display={'inline'} color='primary'>
                    <NavLink 
                      to="/register" 
                      style={{color:'inherit'}}
                    >
                      Sign up
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