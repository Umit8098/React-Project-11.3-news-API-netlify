import { Outlet, Navigate } from "react-router-dom";

// redux-toolkit
import { useSelector } from 'react-redux';

import Box from "@mui/material/Box";
// img (loading) eklemek için jsx ortamında import edilmesi gerekiyor;
import loadingGif from '../assets/loading.gif';


const PrivateRouter = () => {

    // const currentUser = true;
    // const {user} = useSelector( (state) => state.auth );
    const currentUser = useSelector( (state) => state.auth.user );
    const loading = useSelector( (state) => state.auth.loading );

    if (loading) {
        // return <div style={{textAlign:"center", marginTop:"20vh"}}>Loading...</div>;
        return <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                minHeight="100vh"
               >
                <img src={loadingGif} alt="loading-gif" width='200px'/>
               </Box>;
    }

    return (
        currentUser ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRouter;