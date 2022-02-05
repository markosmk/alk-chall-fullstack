import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOperations } from '../../context/reducers/operationSlice';
import ItemOperation from '../../components/ItemOperation';

const Operations = () => {
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
      <h1>Lista de Operaciones</h1>
      <p>Muestra la tabla de los ingresos y egresos de/los usuarios</p>

      <button onClick={handleCreateNew}>Crear Nueva Operacion</button>
      <hr />
      <div
        style={{
          backgroundColor: '#eee',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
      >
        <h3>Opciones/Filtros</h3>
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
    </div>
  );
};

export default Operations;
