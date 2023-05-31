import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from './features/Auth/Login';
import { getUserDetails } from './features/Auth/authSlice';
import Peticiones from './Peticiones';

function App() {
  const Dispatch = useDispatch();
  const { success } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (success) {
      Dispatch(getUserDetails());
    }
  }, []);

  return <div>{success ? <Peticiones /> : <Login />}</div>;
}

export default App;
