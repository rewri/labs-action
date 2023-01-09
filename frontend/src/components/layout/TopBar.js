import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from "react-router-dom";

export default function TopBar({ userInfo }) {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.removeItem('labs-action-token');
    window.location.href = '/'
  }

  return (
    <AppBar position="static">
      <Container maxWidth="{false}">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Labs action - Controle de Estoque Interno
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

          {userInfo && (
            <Box sx={{ flexGrow: 0 }}>
              <Typography variant="p" sx={{ pr: 3, fontWeight: 'bold' }}>{userInfo.name}</Typography>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Clara Fumes" src={`/assets/images/avatar/${userInfo.avatar}`} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="profile" onClick={handleCloseUserMenu}>
                  <Link to="/perfil">
                    Meu Perfil
                  </Link>
                </MenuItem>
                {userInfo.role === 'admin' && (
                  <MenuItem key="manager" onClick={handleCloseUserMenu}>
                    <Link to="/gestao/usuarios">
                      Administrar
                    </Link>
                  </MenuItem>
                )}
                <MenuItem key="logout" onClick={logout}>
                  <Link>
                    Sair
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  )
}
