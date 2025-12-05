import {
  Container,
  Box,
  Avatar,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
} from "@mui/material";

// firebase
import { useState } from "react";
import { 
  signIn, 
  signUpProvider, 
  forgotPassword,
} from '../utils/firebase';
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const Login = () => {

    const currentUser = useSelector((state) => state.auth.user);

  // const currentUser = true;
  // console.log(currentUser);

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const navigate = useNavigate();

  const[error, setError] = useState(""); // formun boş olarak gönderilmesi hata mesajı için state..
  const[loading, setLoading] = useState(false); // butonun tekrar tekrar tıklanmasını engellemek için..
  const[googleLoading, setGoogleLoading] = useState(false); // google butonunun tekrar tekrar tıklanmasını engellemek için..

  // Eğer kullanıcı zaten giriş yaptıysa, login sayfasına tekrar giremesin
  if (currentUser) {
      return <Navigate to="/" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setError("");

    if (!email || !password) {
      setError("Lütfen email ve password alanlarını doldurun.");
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password, navigate);
    } catch (error) {
      setError("Email veya şifre hatalı, Kullanıcı bulunamadı, Şifre yanlış, Giriş yapılırken bir hata oluştu. Login failed. Please check your credentials.");
      // console.log(error)
      console.error(error)
    } finally {
      setLoading(false);
    }
  
    // console.log({email, password});
  };


  const handleGoogleSingIn = async () => {

    setGoogleLoading(true);
    setError("");

    try {
      await signUpProvider(navigate);
    } catch (error) {
      setError("Google sign-in sırasında bir hata oluştu.");
      // console.log(error);
      console.error(error);
    } finally {
      setGoogleLoading(false);
    }
  };


  const handleForgotPassword = () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
    forgotPassword(email);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          marginTop: "20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mx: "auto",
        }}
      >
        <Avatar
          alt="avatar_img"
          src="https://cdn.pixabay.com/photo/2017/03/21/02/00/user-2160923_960_720.png"
          sx={{ width: 156, height: 156 }}
        />
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ m: 4 }}
        >
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "50%", mb: 2 }}>
            {error} 
          </Alert>
        )}

      <form style={{ width: "50%", maxWidth: "100%" }}
        onSubmit={handleLogin}>

          {/* form submit edilirken button ve inputlar çalışmasın.. */}
          <Box
            sx={{
            pointerEvents: loading || googleLoading ? "none" : "auto",
            opacity: loading || googleLoading ? 0.5 : 1,
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
                fullWidth
                // disabled={loading || googleLoading}
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
                fullWidth
                // disabled={loading || googleLoading}
              />

              <Typography
                variant="body2"
                color="primary"
                sx={{
                  cursor: "pointer",
                  textAlign: "left",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  mt: 1, // margin top
                }}
                // onClick={() => forgotPassword(email)}
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Typography>


              {/* <Button
                variant="contained"
                color="primary"
                type="submit"
                // onClick={handleLogin}
                fullWidth
              >
                Login
              </Button> */}
              
              <Button
                variant="contained"
                color="primary"
                type="submit"
                // disabled={loading}
                fullWidth
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              
              <Button
                variant="contained"
                color="secondary"
                onClick={handleGoogleSingIn}
                // disabled={loading || googleLoading}
                fullWidth
              >
                {googleLoading ? "Connecting..." : "CONTINUE WITH GOOGLE"}
              </Button>
            </Stack>

          </Box>

        </form>
      </Box>
    </Container>
  );
};

export default Login;