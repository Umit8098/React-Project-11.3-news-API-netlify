import { initializeApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";


//* See: https://firebase.google.com/docs/web/learn-more#config-object
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Auth Reference
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// REGISTER
export const createUser = async(email, password, navigate, displayName) => {
    //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
    try {
        let userCredential= await createUserWithEmailAndPassword(auth, email, password)        
        //? kullanıcı profilini güncellemek için kullanılan firebase metodu
        // await updateProfile(auth.currentUser, {
        //     displayName: displayName
        // })
        await updateProfile(userCredential.user, {
            displayName: displayName
        })
        // console.log(userCredential)
        navigate("/");
        return userCredential;
    } catch (error) {
        // console.log(error.code, error.message);
        console.error(error.code, error.message);
        throw error;
    }
};


// LOGIN
export const signIn = async (email, password, navigate) => {
    //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
    try {
        let userCredential= await signInWithEmailAndPassword(auth, email, password);
        // console.log(userCredential)
        navigate("/");
    } catch (error) {
        // console.log(error);
        console.error(error);
        throw error;
    }
};


// GOOGLE LOGIN
//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Google ile girişi enable yap
//* => Authentication => sign-in-method => Authorized domains => add domain
//! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle (firebase->app->build->authentication->settings->authorized domain kısmında add domain..)
export const signUpProvider = async (navigate) => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu

    // ✅ HER ZAMAN hesap seçme ekranını göster
    provider.setCustomParameters({
        prompt: "select_account"
    });

    try {
      const result = await signInWithPopup(auth, provider);
      // console.log(result)
      
       // Google bazen displayName dönmez
      if (!result.user.displayName) {
        await updateProfile(result.user, {
          displayName: result.user.email.split("@")[0]
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
};

// LOGOUT
export const logOut = async () => {
  try {
    await signOut(auth);
    // console.log("✅ Kullanıcı çıkış yaptı");
  } catch (error) {
    console.log("❌ Logout hatası:", error);
    throw error;
  }
};

// RESET PASSWORD
export const forgotPassword = async (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  try {
    await sendPasswordResetEmail(auth, email)
    alert("Please check your mail box! Password reset link sent to your email.");
  } catch (error) {
    alert(error.message);
    console.log(error);
    throw error;
  }
};

