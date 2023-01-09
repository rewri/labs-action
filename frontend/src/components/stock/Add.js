import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../configs/api.config';

export default function Add() {

  const [stock, setStock] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
      name: data.get('name'),
      code: data.get('code'),
      description: data.get('description')
    };
    try {
      const response = await api.post(`estoques`, postData);
      setSubmitted(true);
      setStock(response.data)
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
        <h4>{stock.name} - Cadastrado com sucesso!</h4>
        <Link to="/estoques">
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
            Novo estoque
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Código do estoque"
                  name="code"
                  fullWidth
                  id="code"
                  label="Código"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Nome do estoque"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Descrição auxiliar"
                  name="description"
                  fullWidth
                  id="description"
                  label="Descrição"
                  multiline
                  rows={4}
                />
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
              Enviar
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
