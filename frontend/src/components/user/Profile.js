import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../configs/api.config';

export default function Profile({ userInfo }) {

  const uuid = userInfo.uuid;
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get(`usuarios/perfil/${uuid}`);
        setProfile(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getProfile();
  }, [uuid]);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: 0, marginBottom: '15px' }}>{profile.name}</h3>
        <ul style={{ fontSize: '1.2em' }}>
          <li style={{ marginBottom: '5px' }}><strong>ID: </strong>{profile.id}</li>
          <li style={{ marginBottom: '5px' }}><strong>Nome: </strong>{profile.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Username: </strong>{profile.username}</li>
          <li style={{ marginBottom: '5px' }}><strong>Papel: </strong>{profile.role}</li>
          <li style={{ marginBottom: '5px' }}><strong>Lotação: </strong>{profile.laboratory}</li>
          <li style={{ marginBottom: '5px' }}><strong>Descrição: </strong>{profile.description}</li>
          <li style={{ marginBottom: '5px' }}><strong>Ativo: </strong>{profile.enabled ? 'Sim' : 'Não'}</li>
          <li style={{ marginBottom: '5px' }}><strong>Criado em: </strong>{new Date(profile.createdAt).toLocaleDateString('pt-BR')}</li>
          <li style={{ marginBottom: '5px' }}><strong>Atualizado em: </strong>{new Date(profile.updatedAt).toLocaleDateString('pt-BR')}</li>
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
            <Link to={`/perfil/editar/${profile.uuid}`} >
              <Button>Editar</Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Paper>
    </div>
  )
}
