import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import LayoutDatos from './features/Datos/LayoutDatos';
import LayoutEntrada from './features/Entrada/LayoutEntrada';
import LayoutProducto from './features/Productos/LayoutProducto';
import LayoutReports from './features/Report/LayoutReports';
import LayoutSalida from './features/Salidas/LayoutSalida';
import LayoutUsuarios from './features/Usuarios/LayoutUsuarios';
import LayoutAlmacenes from './features/Almacenes/LayoutAlmacenes';
import { ButtonLogout } from './components/ButtonLogout';
import { TitleSystem } from './components/TitleSystem';
import { BoxContainer } from './components/BoxContainer';
import LayoutPermisos from './features/Permisos/LayoutPermisos';

export default function Layout() {
  const { permisos } = useSelector((state) => state.Permisos);
  const { user } = useSelector((state) => state.Auth);

  const UserPermiso = permisos.find(
    (permiso) => permiso.id === user.IdPermisos
  );
  return (
    <BoxContainer
      sx={{
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '1200px',
          height: '600px',
          backgroundColor: 'rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '1rem',
          pb: '1rem',
          color: '#00CCFF',
        }}
      >
        <TitleSystem user={user} UserPermiso={UserPermiso} />

        <BoxContainer>
          <Grid
            container
            columns={14}
            gap={10}
            justifyContent='center'
            p={5}
            mx={4}
          >
            {UserPermiso?.Configuracion === 1 && (
              <Grid item md={2}>
                <LayoutDatos />
              </Grid>
            )}
            {UserPermiso?.Productos === 1 && (
              <Grid item md={2}>
                <LayoutProducto />
              </Grid>
            )}
            {UserPermiso?.Almacenes === 1 && (
              <Grid item md={2}>
                <LayoutAlmacenes />
              </Grid>
            )}

            {UserPermiso?.Usuarios === 1 && (
              <Grid item md={2}>
                <LayoutUsuarios />
              </Grid>
            )}
            {UserPermiso?.Usuarios === 1 && (
              <Grid item md={2}>
                <LayoutPermisos />
              </Grid>
            )}

            {UserPermiso?.Entradas === 1 && (
              <Grid item md={2}>
                <LayoutEntrada />
              </Grid>
            )}
            {UserPermiso?.Salidas === 1 && (
              <Grid item md={2}>
                <LayoutSalida />
              </Grid>
            )}

            <Grid item md={2}>
              <LayoutReports />
            </Grid>
          </Grid>
        </BoxContainer>
        <ButtonLogout />
      </Box>
    </BoxContainer>
  );
}
