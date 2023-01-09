import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import api from '../../configs/api.config';

export default function Detail() {

  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get(`categorias/${id}`);
        setCategories(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getCategories();
  }, [id]);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: 0, marginBottom: '15px' }}>#{categories.id} - {categories.name}</h3>
        <ul style={{ fontSize: '1.2em' }}>
          <li style={{ marginBottom: '5px' }}><strong>ID: </strong>{categories.id}</li>
          <li style={{ marginBottom: '5px' }}><strong>Nome: </strong>{categories.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Descrição: </strong>{categories.description}</li>
          <li style={{ marginBottom: '5px' }}><strong>Ativo: </strong>{categories.enabled ? 'Sim' : 'Não'}</li>
          <li style={{ marginBottom: '5px' }}><strong>Criado em: </strong>{new Date(categories.createdAt).toLocaleDateString('pt-BR')}</li>
          <li style={{ marginBottom: '5px' }}><strong>Atualizado em: </strong>{new Date(categories.updatedAt).toLocaleDateString('pt-BR')}</li>
        </ul>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="outlined">
            <Link to="/categorias/" >
              <Button>Voltar</Button>
            </Link>
            <Link to={`/categorias/editar/${categories.id}`} >
              <Button>Editar</Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Paper>
    </div>
  )
}
