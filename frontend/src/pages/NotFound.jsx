import { Container, Typography, Box, Button} from '@mui/material';
import { useLocation ,useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleGoHome = () => {
    navigate('/',{replace:true});
  };

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Box textAlign="center" mt={5}>
          <Typography variant="h1" component="h1" gutterBottom>
            Page not found
          </Typography>
          <Typography variant="body2">
            There is no page with url: {pathname}, try something else.
          </Typography>
        </Box>
        <Box mt={2}>
          <Button size="small" startIcon={<HomeIcon />} onClick={handleGoHome}>
            Go Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;