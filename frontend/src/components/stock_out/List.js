import PageViewIcon from '@mui/icons-material/Pageview';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
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

const columns = [
  { field: 'stockName', headerName: 'Estoque', flex: 2, headerClassName: 'dg-header', valueGetter: (params) => params.row.stock.name },
  { field: 'productName', headerName: 'Produto', flex: 2, headerClassName: 'dg-header', valueGetter: (params) => params.row.product.name },
  { field: 'userName', headerName: 'Usuário', flex: 2, headerClassName: 'dg-header', valueGetter: (params) => params.row.user.name },
  { field: 'amount', headerName: 'Quantidade', flex: 1, headerClassName: 'dg-header', cellClassName: 'stock-out-cell', type: 'number', valueGetter: (params) => `- ${params.row.amount}` },
  { field: 'createdAt', headerName: 'Removido em', flex: 1, headerClassName: 'dg-header', type: 'dateTime', valueGetter: ({ value }) => value && new Date(value).toLocaleDateString('pt-BR') },
  {
    headerName: 'Ações',
    headerClassName: 'dg-header',
    field: 'actions',
    type: 'actions',
    flex: 1,
    getActions: (params) => [
      <Link to={`/saidas/detalhes/${params.id}`} >
        <GridActionsCellItem
          icon={<PageViewIcon sx={{ fontSize: 25 }} />}
          label="Ver"
          title="Ver detahes"
        />
      </Link>
    ],
  }
];

export default function List(props) {

  const pageSize = props.pageSize ? props.pageSize : 15;
  const minHeight = props.minHeight ? props.minHeight : 85;

  const [stockIn, setStockIn] = useState([]);

  useEffect(() => {
    async function getStockIn() {
      try {
        const response = await api.get(`saidas`);
        setStockIn(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getStockIn();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: `${minHeight}vh` }}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={6} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <RemoveShoppingCartIcon />
            <h3 style={{ margin: 0, paddingLeft: '10px' }}>Saídas de estoque</h3>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Link to={`/saidas/novo`}>
                <Button variant="outlined">Nova saída</Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <ThemeProvider theme={theme}>
          <DataGrid
            sx={{ border: 0 }}
            components={{ Toolbar: CustomToolbar }}
            autoHeight
            rows={stockIn}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
          />
        </ThemeProvider >
      </Paper>
    </div>
  )
}
