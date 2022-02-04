import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOperations } from '../../context/reducers/operationSlice';
// import FormOperation from './FormOperation';

const Panel = () => {
  const { list: operations, isLoading } = useSelector((state) => state.operation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOperations());
  }, [dispatch]);

  return (
    <div>
      <h1>Panel Home Dashboard</h1>
      <p>Muestra la tabla de los ingresos y egresos de/los usuarios</p>

      <h1>Operaciones Existentes</h1>
      <ul>
        {isLoading ? (
          <>Cargando...</>
        ) : (
          operations &&
          operations.map((item) => {
            return (
              <li key={item.id}>
                <p>
                  {item.concept} - {item.amount}
                </p>
              </li>
            );
          })
        )}
      </ul>
      <hr />
      <h1>Agregar Operacion</h1>
      {/* <FormOperation /> */}
    </div>
  );
};

export default Panel;
