import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, ptBR } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
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
  { field: 'productName', headerName: 'Produto', flex: 2, headerClassName: 'dg-header', cellClassName: 'critic-cell', valueGetter: (params) => params.row.product.name },
  { field: 'stockName', headerName: 'Estoque', flex: 2, headerClassName: 'dg-header', cellClassName: 'critic-cell', valueGetter: (params) => params.row.stock.name },
  { field: 'amount', headerName: 'Quantidade', flex: 2, headerClassName: 'dg-header', cellClassName: 'critic-cell', type: 'number', valueGetter: (params) => `${params.row.amount}` },
];

export default function List(props) {

  const pageSize = props.pageSize ? props.pageSize : 15;
  const minHeight = props.minHeight ? props.minHeight : 85;

  const [stockProduct, setStockProduct] = useState([]);

  useEffect(() => {
    async function getStockProduct() {
      try {
        const response = await api.get(`produtos/estoque-baixo`);
        setStockProduct(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }

    getStockProduct();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: `${minHeight}vh` }}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <WarningAmberIcon />
            <h3 style={{ margin: 0, paddingLeft: '10px' }}>Produtos com 10 ou menos unidades em estoque</h3>
          </Grid>
        </Grid>
        <ThemeProvider theme={theme}>
          <DataGrid
            sx={{ border: 0, color: '#b71c1c', fontWeight: '600' }}
            components={{ Toolbar: CustomToolbar }}
            autoHeight
            rows={stockProduct}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
          />
        </ThemeProvider >
      </Paper>
    </div>
  )
}
