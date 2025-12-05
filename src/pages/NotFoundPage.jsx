import errorImg from '../assets/404.png';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function NotFound() {

  const navigate = useNavigate();

  return (
    <Box 
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5"
      }}
    >
      <Card sx={{ maxWidth: 420 }}>
        <CardMedia
          sx={{ height: 240 }}
          image={errorImg}
          title="error"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sayfa Bulunamadı
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={() => navigate('/')}>Ana Sayfa</Button>
          <Button size="small" onClick={() => navigate(-1)}>Geri Dön</Button>
        </CardActions>

      </Card>
    </Box>
  );
}