import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React from 'react';
import { Route, Routes } from "react-router-dom";

import Dashboard from '../Dashboard';

import StockInAdd from '../stock_in/Add';
import StockInDetail from '../stock_in/Detail';
import StockInList from '../stock_in/List';

import StockOutAdd from '../stock_out/Add';
import StockOutDetail from '../stock_out/Detail';
import StockOutList from '../stock_out/List';

import StockAdd from '../stock/Add';
import StockDetail from '../stock/Detail';
import StockEdit from '../stock/Edit';
import StockList from '../stock/List';

import CategoryAdd from '../category/Add';
import CategoryDetail from '../category/Detail';
import CategoryEdit from '../category/Edit';
import CategoryList from '../category/List';

import ProductAdd from '../product/Add';
import ProductDetail from '../product/Detail';
import ProductEdit from '../product/Edit';
import ProductList from '../product/List';

import StockProductList from '../stock_product/List';
import StockProductByProductList from '../stock_product/ListByProduct';
import StockProductByStockList from '../stock_product/ListByStock';

import StockMovementByProduct from '../stock_movement/ByProduct';
import StockMovementByStock from '../stock_movement/ByStock';
import StockMovementDetail from '../stock_movement/Detail';
import StockMovementList from '../stock_movement/List';

import Profile from '../user/Profile';

import UsersAdd from '../manager/Users/Add';
import UsersEdit from '../manager/Users/Edit';
import UsersList from '../manager/Users/List';

export default function MainContent({ userInfo }) {
  return (
    <div>
      <Container maxWidth="{false}" sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Routes>
            <Route index element={<Dashboard />} />

            <Route exact path="/perfil" element={<Profile userInfo={userInfo} />} />

            <Route exact path="/gestao/usuarios" element={<UsersList userInfo={userInfo} />} />
            <Route exact path="/gestao/usuarios/novo" element={<UsersAdd userInfo={userInfo} />} />
            <Route exact path="/gestao/usuarios/:id" element={<UsersEdit userInfo={userInfo} />} />

            <Route exact path="/estoque-produto" element={<StockProductList />} />
            <Route exact path="/estoque-produto/estoque/:id" element={<StockProductByStockList />} />
            <Route exact path="/estoque-produto/produto/:id" element={<StockProductByProductList />} />

            <Route exact path="/entradas" element={<StockInList />} />
            <Route exact path="/entradas/novo" element={<StockInAdd userInfo={userInfo} />} />
            <Route exact path="/entradas/detalhes/:id" element={<StockInDetail />} />

            <Route exact path="/saidas" element={<StockOutList />} />
            <Route exact path="/saidas/novo" element={<StockOutAdd userInfo={userInfo} />} />
            <Route exact path="/saidas/detalhes/:id" element={<StockOutDetail />} />

            <Route exact path="/movimentacao" element={<StockMovementList />} />
            <Route exact path="/movimentacao/estoque/:stock_id/produto/:product_id" element={<StockMovementDetail />} />
            <Route exact path="/movimentacao/estoque/:id" element={<StockMovementByStock />} />
            <Route exact path="/movimentacao/produto/:id" element={<StockMovementByProduct />} />

            <Route exact path="/estoques" element={<StockList />} />
            <Route exact path="/estoques/novo" element={<StockAdd />} />
            <Route exact path="/estoques/detalhes/:id" element={<StockDetail />} />
            <Route exact path="/estoques/editar/:id" element={<StockEdit />} />

            <Route exact path="/categorias" element={<CategoryList />} />
            <Route exact path="/categorias/novo" element={<CategoryAdd />} />
            <Route exact path="/categorias/detalhes/:id" element={<CategoryDetail />} />
            <Route exact path="/categorias/editar/:id" element={<CategoryEdit />} />

            <Route exact path="/produtos" element={<ProductList />} />
            <Route exact path="/produtos/novo" element={<ProductAdd />} />
            <Route exact path="/produtos/detalhes/:id" element={<ProductDetail />} />
            <Route exact path="/produtos/editar/:id" element={<ProductEdit />} />

          </Routes>
        </Grid>
      </Container>
    </div>
  )
}
