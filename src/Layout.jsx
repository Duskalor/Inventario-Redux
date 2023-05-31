import { Box, Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/Auth/authSlice';

import LayoutClientes from './features/Clientes/LayoutClientes';
import LayoutDatos from './features/Datos/LayoutDatos';
import LayoutEntrada from './features/Entrada/LayoutEntrada';
import LayoutPermisos from './features/Permisos/LayoutPermisos';
import LayoutProducto from './features/Productos/LayoutProducto';
import LayoutProveedores from './features/Proveedor/LayoutProveedores';
import LayoutReports from './features/Report/LayoutReports';
import LayoutSalida from './features/Salidas/LayoutSalida';
import LayoutUsuarios from './features/Usuarios/LayoutUsuarios';

export default function Layout() {
  const { RazonSocial } = useSelector((state) => state.Datos);
  const { user } = useSelector((state) => state.Auth);
  const { permisos } = useSelector((state) => state.Permisos);

  const UserPermiso = permisos.find(
    (permiso) => permiso.id === user.IdPermisos
  );
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h4' align='center' mt={7} ml={4}>
        Sistema De Inventario {RazonSocial}
      </Typography>
      <Typography variant='h4' align='center' mt={4} mr={4}>
        Bienvenido {user.FullName}
      </Typography>
      <LayoutReports />
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          top: '43%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          pt: 2,
          pl: 4,
          pb: 3,
          borderRadius: 4,
        }}
      >
        <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 8 }}>
          {UserPermiso?.Clientes === 1 && (
            <Grid item xs='auto' sm={2} md={2}>
              <LayoutClientes />
            </Grid>
          )}
          {UserPermiso?.Configuracion === 1 && (
            <Grid item xs='auto' sm={2} md={2}>
              <LayoutDatos />
            </Grid>
          )}
          {UserPermiso?.Productos === 1 && (
            <Grid item xs='auto' sm={2} md={2}>
              <LayoutProducto />
            </Grid>
          )}
          {UserPermiso?.Proveedores === 1 && (
            <Grid item xs='auto' sm={2} md={2}>
              <LayoutProveedores />
            </Grid>
          )}
          {UserPermiso?.Usuarios === 1 && (
            <Grid item xs='auto' sm={2} md={2}>
              <LayoutUsuarios />
            </Grid>
          )}

          {UserPermiso?.Permisos === 1 && (
            <Grid item xs='auto' sm={2} md={2}>
              <LayoutPermisos />
            </Grid>
          )}
          {UserPermiso?.Entradas === 1 && (
            <Grid item xs='auto' sm={2} md={2}>
              <LayoutEntrada />
            </Grid>
          )}
          {UserPermiso?.Salidas === 1 && (
            <Grid item xs='auto' sm={2} md={2}>
              <LayoutSalida />
            </Grid>
          )}
        </Grid>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Button variant='contained' onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}
