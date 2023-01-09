import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../configs/api.config';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Counter() {

  const [counters, setCounters] = useState([]);

  useEffect(() => {
    async function getCounters() {
      try {
        const response = await api.get('totais');
        setCounters(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getCounters();
  }, []);

  const { stocks, categories, products } = counters;

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Item>
          <Typography component="p" variant="h3" style={{ color: "#01579B" }}>{stocks}</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>estoques cadastrados</Typography>
          <Link style={{ color: "#01579B", fontWeight: 500 }} to="/estoques/" >
            Ver todos
          </Link>
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <Typography component="p" variant="h3" style={{ color: "#01579B" }}>{categories}</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>categorias cadastradas</Typography>
          <Link style={{ color: "#01579B", fontWeight: 500 }} to="/categorias/" >
            Ver todas
          </Link>
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <Typography component="p" variant="h3" style={{ color: "#01579B" }}>{products}</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>produtos cadastrados</Typography>
          <Link style={{ color: "#01579B", fontWeight: 500 }} to="/produtos/" >
            Ver todos
          </Link>
        </Item>
      </Grid>
    </Grid>
  )
}
