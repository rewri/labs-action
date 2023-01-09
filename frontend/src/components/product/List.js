import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageViewIcon from '@mui/icons-material/Pageview';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import VaccinesIcon from '@mui/icons-material/Vaccines';
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
    await api.delete(`produtos/${id}`);
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
  { field: 'stockName', headerName: 'Categoria', flex: 2, headerClassName: 'dg-header', valueGetter: (params) => params.row.category?.name },
  { field: 'brand', headerName: 'Marca', flex: 1, headerClassName: 'dg-header' },
  { field: 'batch', headerName: 'Lote', flex: 1, headerClassName: 'dg-header' },
  { field: 'due_date', headerName: 'Validade', flex: 1, headerClassName: 'dg-header', type: 'date', valueGetter: ({ value }) => value && value.split('-').reverse().join('/') },
  { field: 'enabled', headerName: 'Ativo', flex: 1, headerClassName: 'dg-header', type: 'boolean' },
  {
    headerName: 'Ações',
    headerClassName: 'dg-header',
    field: 'actions',
    type: 'actions',
    flex: 2,
    getActions: (params) => [
      <Link to={`/estoque-produto/produto/${params.id}`} >
        <GridActionsCellItem
          icon={<AssignmentIcon color="primary" sx={{ fontSize: 25 }} />}
          label="Estoques com esse produto"
          title="Estoques com esse produto"
        />
      </Link>,
      <Link to={`/movimentacao/produto/${params.id}`} >
        <GridActionsCellItem
          icon={<SyncAltIcon color="primary" sx={{ fontSize: 25 }} />}
          label="Movimentação deste produto"
          title="Movimentação deste produto"
        />
      </Link>,
      <Link to={`/produtos/detalhes/${params.id}`} >
        <GridActionsCellItem
          icon={<PageViewIcon sx={{ fontSize: 25 }} />}
          label="Ver"
          title="Ver detahes"
        />
      </Link>,
      <Link to={`/produtos/editar/${params.id}`} >
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

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await api.get(`produtos`);
        setProducts(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getProducts();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={6} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <VaccinesIcon />
            <h3 style={{ margin: 0, paddingLeft: '10px' }}>Produtos</h3>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Link to={`/produtos/novo`}>
                <Button variant="outlined">Novo produto</Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <ThemeProvider theme={theme}>
          <DataGrid
            sx={{ border: 0 }}
            components={{ Toolbar: CustomToolbar }}
            autoHeight
            rows={products}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
          />
        </ThemeProvider >
      </Paper>
    </div>
  )
}
