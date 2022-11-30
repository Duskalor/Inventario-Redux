import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ListaCliente from './features/Clientes/ListaCliente';
import Layout from './Layout';
import Login from './features/Auth/Login';
import { getUserDetails } from './features/Auth/authSlice';
import Peticiones from './Peticiones';

function App() {
  const Dispatch = useDispatch();
  const prueba = useSelector((state) => state.Auth);
  const { success } = prueba;
  useEffect(() => {
    if (success) {
      Dispatch(getUserDetails());
    }
  }, [Dispatch]);
  //console.log(success);

  return <div>{success ? <Peticiones /> : <Login />}</div>;
}

export default App;
