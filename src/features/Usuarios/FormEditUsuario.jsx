import { Button, Input, InputLabel, NativeSelect } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsuarios } from './UsuariosSlice';

export default function FormEditUsuario({ handleClose, id }) {
  const dispatch = useDispatch();
  //console.log(id);
  const { usuarios } = useSelector((state) => state.Usuarios);
  const { permisos } = useSelector((state) => state.Permisos);
  //console.log(clientes);
  const { FullName, Email, Usuario, IdPermisos } = usuarios.find(
    (Usuario) => Usuario.id === id
  );
  const { Descripcion } = permisos.find((permiso) => permiso.id === IdPermisos);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      FullName: FullName,
      email: Email,
      Usuario: Usuario,
      IdPermisos: IdPermisos,
    },
  });

  //console.log(datosParaEditar);
  const onSubmit = (dato) => {
    const { FullName, email, Usuario, IdPermisos } = dato;
    dispatch(updateUsuarios({ id, FullName, email, Usuario, IdPermisos }));
    handleClose();
    reset();
    //console.log(dato);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>
        <Input
          type='text'
          name='FullName'
          {...register('FullName', {
            required: true,
          })}
        />
        {errors.FullName?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <label>Email</label>
        <Input
          name='Email'
          type='email'
          {...register('email', { required: true })}
        />
        {errors.email?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <label>Usuario</label>
        <Input
          name='Usuario'
          type='text'
          {...register('Usuario', { required: true })}
        />
        {errors.Usuario?.type === 'required' && <p>El Campo es requirido </p>}
      </div>

      {/* <div>
        <label>Permiso</label>
        <Input
          type='number'
          {...register('IdPermisos', {
            required: true,
          })}
        />
        {errors.IdPermisos?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div> */}
      <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Permiso
        </InputLabel>
        <NativeSelect
          {...register('IdPermisos', {
            required: true,
          })}
          defaultValue={Descripcion}
        >
          {permisos.map((permiso) => {
            return (
              <option key={permiso.id} value={permiso.id}>
                {permiso.Descripcion}
              </option>
            );
          })}
        </NativeSelect>
        {errors.IdPermisos?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>

      <Button type='submit'>Guardar</Button>
    </form>
  );
}
