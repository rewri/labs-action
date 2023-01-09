import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageViewIcon from '@mui/icons-material/Pageview';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, ptBR } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../configs/api.config';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#01579B' },
    },
  },
  ptBR,
);

function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ marginBottom: '10px' }}>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

async function handleDelete(id) {
  try {
    await api.delete(`estoques/${id}`);
    window.location.reload(false);
  } catch (error) {
    console.error(error.response);
    if (error.response.status === 406) {
      alert(error.response.data.error);
    }
  }
}

const columns = [
  { field: 'name', headerName: 'Nome', flex: 2, headerClassName: 'dg-header' },
  { field: 'description', headerName: 'Descrição', flex: 2, headerClassName: 'dg-header' },
  { field: 'enabled', headerName: 'Ativo', flex: 1, headerClassName: 'dg-header', type: 'boolean' },
  { field: 'createdAt', headerName: 'Criado em', flex: 1, headerClassName: 'dg-header', type: 'dateTime', valueGetter: ({ value }) => value && new Date(value).toLocaleDateString('pt-BR') },
  {
    headerName: 'Ações',
    headerClassName: 'dg-header',
    field: 'actions',
    type: 'actions',
    flex: 2,
    getActions: (params) => [
      <Link to={`/estoque-produto/estoque/${params.id}`} >
        <GridActionsCellItem
          icon={<AssignmentIcon color="primary" sx={{ fontSize: 25 }} />}
          label="Produtos neste estoque"
          title="Produtos neste estoque"
        />
      </Link>,
      <Link to={`/movimentacao/estoque/${params.id}`} >
        <GridActionsCellItem
          icon={<SyncAltIcon color="primary" sx={{ fontSize: 25 }} />}
          label="Movimentação neste estoque"
          title="Movimentação neste estoque"
        />
      </Link>,
      <Link to={`/estoques/detalhes/${params.id}`} >
        <GridActionsCellItem
          icon={<PageViewIcon sx={{ fontSize: 25 }} />}
          label="Ver"
          title="Ver detahes"
        />
      </Link>,
      <Link to={`/estoques/editar/${params.id}`} >
        <GridActionsCellItem
          icon={<EditIcon sx={{ fontSize: 25 }} />}
          label="Editar"
          title="Editar"
        />
      </Link>,
      <GridActionsCellItem
        icon={<DeleteIcon color="error" sx={{ fontSize: 25 }} />}
        label="Excluir"
        title="Excluir"
        onClick={() => { if (window.confirm('Deseja realmente excluir?')) handleDelete(params.id) }}
      />,
    ],
  }
];

export default function List() {

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function getStocks() {
      try {
        const response = await api.get(`estoques`);
        setStocks(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getStocks();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={6} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <ArticleIcon />
            <h3 style={{ margin: 0, paddingLeft: '10px' }}>Estoques</h3>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Link to={`/estoques/novo`}>
                <Button variant="outlined">Novo estoque</Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <ThemeProvider theme={theme}>
          <DataGrid
            sx={{ border: 0 }}
            components={{ Toolbar: CustomToolbar }}
            autoHeight
            rows={stocks}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
          />
        </ThemeProvider >
      </Paper>
    </div>
  )
}
