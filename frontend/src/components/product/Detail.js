import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import api from '../../configs/api.config';

export default function Detail() {

  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await api.get(`produtos/${id}`);
        setProducts(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getProducts();
  }, [id]);

  const due_date = products.due_date ? products.due_date.split('-').reverse().join('/') : '-';

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: 0, marginBottom: '15px' }}>#{products.id} - {products.name}</h3>
        <ul style={{ fontSize: '1.2em' }}>
          <li style={{ marginBottom: '5px' }}><strong>ID: </strong>{products.id}</li>
          <li style={{ marginBottom: '5px' }}><strong>Nome: </strong>{products.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Categoria: </strong>{products.category?.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Descrição: </strong>{products.description}</li>
          <li style={{ marginBottom: '5px' }}><strong>Marca: </strong>{products.brand}</li>
          <li style={{ marginBottom: '5px' }}><strong>Lote: </strong>{products.batch}</li>
          <li style={{ marginBottom: '5px' }}><strong>Validade: </strong>{due_date}</li>
          <li style={{ marginBottom: '5px' }}><strong>Ativo: </strong>{products.enabled ? 'Sim' : 'Não'}</li>
          <li style={{ marginBottom: '5px' }}><strong>Criado em: </strong>{new Date(products.createdAt).toLocaleDateString('pt-BR')}</li>
          <li style={{ marginBottom: '5px' }}><strong>Atualizado em: </strong>{new Date(products.updatedAt).toLocaleDateString('pt-BR')}</li>
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
            <Link to="/produtos/" >
              <Button>Voltar</Button>
            </Link>
            <Link to={`/produtos/editar/${products.id}`} >
              <Button>Editar</Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Paper>
    </div>
  )
}
