import { 
  Box, 
  Stack, 
  TextField, 
  Button, 
  Container, 
  Avatar,
  Typography,
  Alert,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// firebase
import { createUser } from "../utils/firebase";

// random name oluşturmak için..
const names = ["Alice", "Bob", "Charlie", "Dora", "Eve"];
const generateRandomDisplayName = () => {
  return `${names[Math.floor(Math.random() * names.length)]}${Math.floor(Math.random() * 1000)}`;
};

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RegisterForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);
  // Kullanıcı giriş yaptıysa /'e gönder
  if (currentUser) {
      return <Navigate to="/" />;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Lütfen email ve password alanlarını doldurun.");
      return;
    }
    const displayName = generateRandomDisplayName(); // random name atandı
    try {
      setLoading(true);
      await createUser(email, password, navigate, displayName);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Kayıt işlemi sırasında bir hata oluştu. Registration failed.");
      // setError(error.message);
      // console.log(error);
      console.error(error);
    } finally {
      setLoading(false);
    } 
    // console.log({
    //   email,
    //   password
    // });
  }

  return (
    <Container maxWidth='sm'>
    <Box 
      sx={{
        height: '100vh',
        marginTop: "20vh",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%",
        mx: "auto",
      }}
    >
      <Avatar 
        alt="register_img"
        src="https://cdn.pixabay.com/photo/2014/02/04/13/17/register-257986_960_720.jpg"
        sx={{ width: 156, height: 156 }}
      />

      <Typography 
        variant='h4' 
        component='h1' 
        sx={{m:4}}
      >
        Register
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: "50%", mb: 2 }}>
          {error}
        </Alert>
      )}

      <form style={{ width: "50%", maxWidth: "100%" }}
        onSubmit={handleSubmit}>


        {/* form submit edilirken button ve inputlar çalışmasın.. */}
        <Box
            sx={{
            pointerEvents: loading ? "none" : "auto",
            opacity: loading ? 0.5 : 1,
            transition: "opacity 0.3s ease",
              }}
        >


          <Stack spacing={3} sx={{ width: "100%" }}>
            <TextField
              id="email"
              label="email"
              name="email"
              variant="outlined"
              type="email"
              autoComplete="on"
              value={email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
              // disabled={loading}
              fullWidth
            />

            <TextField
              id="password"
              label="password"
              name="password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              value={password ?? ""}
              onChange={(e) => setPassword(e.target.value)}
              // disabled={loading}
              fullWidth
            />

            <Button 
              variant="contained" 
              color="primary"
              // onClick={handleSingUp}
              fullWidth
              type="submit"
              // disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Stack>
        
        </Box>

      </form>
    </Box>
    </Container>
  );
}