import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ItemOperation from '../../components/ItemOperation';

import { getOperations } from '../../context/reducers/operationSlice';
// import FormOperation from './FormOperation';

const Panel = () => {
  const { list: operations, isLoading } = useSelector((state) => state.operation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOperations());
  }, [dispatch]);

  const handleCreateNew = () => {
    console.log('CrearNuevo :');
  };

  return (
    <div>
      <h1>Balance</h1>
      <p>Muestra la tabla de los ingresos y egresos de/los usuarios</p>
      <p>
        Balance: <strong>$12300.00</strong>
      </p>
      <h1>Ultimas 10 operaciones</h1>
      <div
        style={{
          backgroundColor: '#eee',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
      >
        <h3>Opciones/Filtros</h3>
        <label for="last">Filtro Cantidad</label>
        <select name="" id="last">
          <option value="">Ultimos 10</option>
          <option value="">Ultimos 20</option>
          <option value="">Ultimos 30</option>
        </select>
        <label for="order">Ordenar por fecha</label>
        <select name="" id="order">
          <option value="">Mas Recientes primero</option>
          <option value="">Mas Antiguas primero</option>
        </select>
        <label for="type">Filtro por tipo</label>
        <select name="" id="type">
          <option value="">Ingreso</option>
          <option value="">Egreso</option>
        </select>
        <label for="type">Filtro por categoria</label>
        <select name="" id="type">
          <option value="">Todas</option>
          <option value="">Sin Categoria</option>
          <option value="">Categoria 1</option>
          <option value="">Categoria 2</option>
        </select>
      </div>
      <button onClick={handleCreateNew}>Crear Nueva Operacion</button>
      <ul>
        {isLoading ? (
          <>Cargando...</>
        ) : (
          operations &&
          operations.map((item) => {
            return <ItemOperation key={item.id} item={item} />;
          })
        )}
      </ul>
      {/* <FormOperation /> */}
    </div>
  );
};

export default Panel;
