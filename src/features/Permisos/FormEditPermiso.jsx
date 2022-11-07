import { Button, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateClientes } from './clientesSlice';

export default function FormEditCliente({ handleClose, id }) {
  const dispatch = useDispatch();
  //console.log(id);
  const { clientes } = useSelector((state) => state.Clientes);
  //console.log(clientes);
  const { FullName, Dni } = clientes.find((Cliente) => Cliente.id === id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      FullName: FullName,
      Dni: Dni,
    },
  });

  //console.log(datosParaEditar);
  const onSubmit = (dato) => {
    const { FullName, Dni } = dato;
    dispatch(updateClientes({ id, FullName, Dni }));
    handleClose();
    reset();
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
        <label>Dni</label>
        <Input
          name='Dni'
          type='number'
          {...register('Dni', { required: true, maxLength: 8, minLength: 8 })}
        />
        {errors.Dni?.type === 'required' && <p>El Campo es requirido </p>}
        {errors.Dni?.type === 'maxLength' && <p>El debe tener 8 digitos </p>}
        {errors.Dni?.type === 'minLength' && <p>El debe tener 8 digitos </p>}
      </div>
      <Button type='submit'>Guardar</Button>
    </form>
  );
}
