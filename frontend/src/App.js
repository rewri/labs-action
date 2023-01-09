import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import Footer from './components/layout/Footer';
import MainContent from './components/layout/MainContent';
import MainMenu from './components/layout/MainMenu';
import TopBar from './components/layout/TopBar';
import Login from './components/user/Login';
import api from './configs/api.config';

function App() {

  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('labs-action-token');
    const item = JSON.parse(storedUserInfo);
    console.log(item);
    async function getProfile() {
      try {
        const item = JSON.parse(storedUserInfo);
        const response = await api.get(`usuarios/${item.value.replace(/['"]+/g, '')}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    if (storedUserInfo) {
      const item = JSON.parse(storedUserInfo);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem('labs-action-token')
        return null;
      } else {
        getProfile();
      }
    }
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TopBar userInfo={userInfo} />
        </Grid>
        {userInfo ? (
          <>
            <Grid item xs={2} sx={{ backgroundColor: "#fff" }}>
              <MainMenu />
            </Grid>
            <Grid item xs={10} sx={{ mb: 3 }}>
              <MainContent userInfo={userInfo} />
            </Grid>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sx={{ backgroundColor: '#fff', pb: 15 }}>
            <Login passUserInfo={setUserInfo} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default App;
