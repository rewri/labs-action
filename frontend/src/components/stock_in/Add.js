import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../configs/api.config';

export default function Add({ userInfo }) {

  const [stocks, setStocks] = useState([]);
  const [stock, setStock] = useState('');
  useEffect(() => {
    async function getStocks() {
      try {
        const response = await api.get(`estoques`);
        const enabledStocks = response.data.filter(stock => stock.enabled === true);
        setStocks(enabledStocks);
      } catch (error) {
        console.error(error.response);
      }
    }
    getStocks();
  }, []);

  const handleChangeStock = (event) => {
    setStock(event.target.value);
  };

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await api.get(`produtos`);
        const enabledProducts = response.data.filter(product => product.enabled === true);
        setProducts(enabledProducts);
      } catch (error) {
        console.error(error.response);
      }
    }
    getProducts();
  }, []);

  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };

  const [amount, setAmount] = useState(1);
  const handleChangeAmount = (event) => {
    if (event.target.value < 1) {
      return false;
    }
    setAmount(event.target.value);
  }

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const [stockIn, setStockIn] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
      id_stock: data.get('id_stock'),
      id_product: data.get('id_product'),
      amount: data.get('amount'),
      id_user: userInfo.id,
      description: data.get('description'),
    };
    try {
      const response = await api.post(`entradas`, postData);
      setSubmitted(true);
      setStockIn(response.data);
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
    <>
      {userInfo.role === 'admin' && (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
          {submitted ? (<div>
            <h4>{stockIn.id} Entrada cadastrada com sucesso!</h4>
            <Link to="/entradas">
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
                Nova entrada de estoque
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={12}>
                    <InputLabel id="id_stock">Estoque</InputLabel>
                    <Select
                      autoComplete="Estoque"
                      name="id_stock"
                      required
                      fullWidth
                      id="id_stock"
                      label="Estoque"
                      value={stock}
                      onChange={handleChangeStock}
                    >
                      {stocks.map((stock) => (
                        <MenuItem key={stock.id} value={stock.id}>
                          {stock.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <InputLabel id="id_product">Produto</InputLabel>
                    <Select
                      autoComplete="Produto"
                      name="id_product"
                      required
                      fullWidth
                      id="id_product"
                      label="Produto"
                      value={product}
                      onChange={handleChangeProduct}
                    >
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="Quantidade"
                      name="amount"
                      required
                      fullWidth
                      id="amount"
                      label="Quantidade"
                      type="number"
                      min="1"
                      value={amount}
                      onChange={handleChangeAmount}
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
      )}
    </>
  )
}
