/* eslint-disable no-throw-literal */
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import api from '../../configs/api.config';
import Logo from '../layout/Logo';

export default function Login({ passUserInfo }) {

  const [userInfo, setUserInfo] = useState({});
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setErrors([]);
    try {
      const postData = {
        user: data.get('user').trim(),
        password: data.get('password').trim()
      };

      if (postData.user === '' || postData.password === '') {
        throw 'Campos obrigatórios não preenchidos';
      }

      const response = await api.post('/usuarios/login', postData);
      if (response.data.status === 'error') {
        throw response.data.message;
      }

      const now = new Date();
      const item = { value: response.data.uuid, expiry: now.getTime() + 28800000 }
      localStorage.setItem('labs-action-token', JSON.stringify(item));

      setUserInfo(response.data);
      passUserInfo(response.data);

    } catch (error) {
      const errorArray = [];
      if (error.response) {
        const data = error.response.data.errors;
        for (let err in data) {
          errorArray.push(Object.values(data[err]));
        }
      } else {
        errorArray.push(error);
      }
      setErrors(errorArray.flat());
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Logo width={250} height={250} pl={0} />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="usuário"
            name="user"
            autoComplete="usuário"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="senha"
            type="password"
            id="password"
            autoComplete="senha"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ENTRAR
          </Button>
        </Box>
        {errors && errors.map((row, index) => (
          <Alert key={index} severity="error" sx={{ width: '100%' }}>{row}</Alert>
        ))}
      </Box>
    </Container>
  )
}
