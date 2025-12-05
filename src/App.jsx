import './App.css'
import AppRouter from "./router/AppRouter"


// firebase'den user verisinin çekilmesi için
import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser, clearUser, } from "./features/authSlice";
import { useEffect } from 'react';

// Tema sağlayıcıyı ekle
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';


function App() {

  const dispatch = useDispatch();

  const mode = useSelector((state) => state.theme.mode);
  const theme = createTheme({
    palette: {
      mode: mode, // light veya dark},
      background: {
      default: mode === "light" ? "#f5f5f5" : "#121212", // sayfa arka planı
    },
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (currentUser) {
        // 👉 Redux’a temiz user bilgisi gönder
        dispatch(setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }));
      } else dispatch(clearUser());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 🔥 bu satır global background ve fontları uygular */}
      <AppRouter/>
    </ThemeProvider>
  )
}

export default App;
