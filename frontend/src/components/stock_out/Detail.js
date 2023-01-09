import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import api from '../../configs/api.config';

export default function Detail() {

  const { id } = useParams();
  const [stockout, setStockOut] = useState([]);

  useEffect(() => {
    async function getStockOut() {
      try {
        const response = await api.get(`saidas/${id}`);
        setStockOut(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getStockOut();
  }, [id]);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: 0, marginBottom: '15px' }}>
          Saída de <span style={{ color: '#01579B' }}>{stockout.amount} item(s)</span> <span style={{ color: '#01579B' }}>{stockout.product?.name}</span> em <span style={{ color: '#01579B' }}>{stockout.stock?.name}</span>
        </h3>
        <ul style={{ fontSize: '1.2em' }}>
          <li style={{ marginBottom: '5px' }}><strong>ID: </strong>{stockout.id}</li>
          <li style={{ marginBottom: '5px' }}><strong>Estoque: </strong>{stockout.stock?.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Produto: </strong>{stockout.product?.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Usuário: </strong>{stockout.user?.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Quantidade: </strong>{stockout.amount}</li>
          <li style={{ marginBottom: '5px' }}><strong>Retirado em: </strong>{new Date(stockout.createdAt).toLocaleDateString('pt-BR')} - {new Date(stockout.createdAt).toLocaleTimeString('pt-BR')}</li>
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
            <Link to="/saidas/" >
              <Button>Voltar</Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Paper>
    </div>
  )
}
