import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../../configs/api.config';

export default function Add({ userInfo }) {

  const [user, setUser] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  console.log(errors);
  const [role, setRole] = useState('default');
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
      role: data.get('role'),
      name: data.get('name'),
      username: data.get('username'),
      password: data.get('password'),
      laboratory: data.get('laboratory'),
      description: data.get('description'),
      enabled: 1,
      id_profile: 1,
    };
    try {
      const response = await api.post(`usuarios`, postData);
      setSubmitted(true);
      setUser(response.data)
    } catch (error) {
      const errorArray = [];
      if (error.response.status === 400) {
        errorArray.push(error.response.data.error);
      }
      if (error.response.data.errors) {
        const data = error.response.data.errors;
        for (let err in data) {
          errorArray.push(Object.values(data[err]));
        }
      }
      setErrors(errorArray.flat());
    }
  };

  return (
    <>
      {userInfo.role === 'admin' && (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
          {submitted ? (<div>
            <h4>{user.name} - Cadastrado com sucesso!</h4>
            <Link to="/gestao/usuarios">
              <Button>Voltar</Button>
            </Link>
          </div>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
              }}
            >
              <Typography component="h1" variant="h5">
                Novo usuário
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <InputLabel id="role">Papel</InputLabel>
                    <Select
                      autoComplete="Estoque"
                      name="role"
                      required
                      fullWidth
                      id="role"
                      label="Estoque"
                      value={role}
                      onChange={handleChangeRole}
                    >
                      <MenuItem key='default' value='default'>
                        PADRÃO
                      </MenuItem>
                      <MenuItem key='admin' value='admin'>
                        ADMINISTRADOR
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="Nome Completo"
                      required
                      name="name"
                      fullWidth
                      id="name"
                      label="Nome Completo"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="Usuário"
                      required
                      name="username"
                      fullWidth
                      id="username"
                      label="Usuário"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="Senha"
                      name="password"
                      required
                      fullWidth
                      id="password"
                      label="Senha"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="Laboratório"
                      name="laboratory"
                      fullWidth
                      id="laboratory"
                      label="Laboratório"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="Descrição auxiliar"
                      name="description"
                      fullWidth
                      id="description"
                      label="Descrição auxiliar"
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
                {errors.map((row, index) => (
                  <Alert key={index} severity="error" sx={{ mt: 2 }}>{row}</Alert>
                ))}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Enviar
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      )}
    </>
  )
}
