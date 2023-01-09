import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import api from '../../../configs/api.config';

export default function Edit({ userInfo }) {

  const { id } = useParams();
  const [user, setUser] = useState('');
  const [role, setRole] = React.useState('default');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [laboratory, setLaboratory] = useState('');
  const [description, setDescription] = useState('');
  const [enabled, setEnabled] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const response = await api.get(`usuarios/${id}`);
        setUser(response.data);
        setRole(response.data.role);
        setName(response.data.name);
        setDescription(response.data.description);
        setEnabled(response.data.enabled);
        setUserName(response.data.username);
        setPassword(response.data.password);
        setLaboratory(response.data.laboratory);
      } catch (error) {
        console.error(error.response);
      }
    }
    getUser();
  }, [id]);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  }
  const handleDescription = (event) => {
    setDescription(event.target.value);
  }
  const handleEnabled = (event) => {
    setEnabled(event.target.checked);
  }
  const handleUsername = (event) => {
    setUserName(event.target.value);
  }
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleLaboratory = (event) => {
    setLaboratory(event.target.value);
  };

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {

      id: data.get('id'),
      role: data.get('role'),
      name: data.get('name'),
      username: data.get('username'),
      password: data.get('password'),
      laboratory: data.get('laboratory'),
      description: data.get('description'),
      enabled: data.get('enabled') === 'on' ? true : false,
      id_profile: 1,
    };
    try {
      const response = await api.put(`usuarios/${postData.id}`, postData);
      setSubmitted(true);
      setUser(response.data)
    } catch (error) {
      const data = error.response.data.errors;
      const errorArray = [];
      for (let err in data) {
        errorArray.push(Object.values(data[err]));
      }
      setErrors(errorArray.flat());
    }
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
      {submitted ? (<div>
        <h4>{user.name} - Editado com sucesso!</h4>
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
            Editar usuário
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} hidden={true}>
                <TextField
                  name="id"
                  id="id"
                  value={user.id}
                  hidden
                />
              </Grid>

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
                <InputLabel id="name">Nome completo</InputLabel>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={handleName}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="username">Usuário</InputLabel>
                <TextField
                  autoComplete="Usuário"
                  required
                  name="username"
                  fullWidth
                  id="username"
                  value={username}
                  onChange={handleUsername}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="password">Senha</InputLabel>
                <TextField
                  autoComplete="Senha"
                  name="password"
                  fullWidth
                  id="password"
                  value={password}
                  type="password"
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="laboratory">Laboratório</InputLabel>
                <TextField
                  autoComplete="Laboratório"
                  name="laboratory"
                  fullWidth
                  id="laboratory"
                  value={laboratory}
                  onChange={handleLaboratory}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="description">Descrição auxiliar</InputLabel>
                <TextField
                  autoComplete="Descrição auxiliar"
                  name="description"
                  fullWidth
                  id="description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={handleDescription}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="enabled">Ativo?</InputLabel>
                <Checkbox
                  aria-label='enabled'
                  name="enabled"
                  id="enabled"
                  checked={enabled}
                  onClick={handleEnabled} />
              </Grid>
            </Grid>
            {errors.map((row) => (
              <div>{row}</div>
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Atualizar
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
