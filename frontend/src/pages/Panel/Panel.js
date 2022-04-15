import { useSelector, useDispatch } from 'react-redux';
import HeaderPage from 'components/HeaderPage';

import ListOperations from 'components/ListOperations';
import { getOperations } from 'context/reducers/operationSlice';
import { useEffect } from 'react';

const Panel = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.operation);

  useEffect(() => {
    dispatch(getOperations());
  }, [dispatch]);

  return (
    <>
      <HeaderPage
        title="Balance"
        description="Se muestra una lista con las ultimas 10 operaciones ingresadas"
        linkUrl="/operations/new"
        linkText="Crear Operacion"
      >
        <p className="my-4">
          <span className="text-lg text-gray-400">Balance Actual: </span>
          <span>-/+</span>
          <strong className="text-2xl">$12300.00</strong>
        </p>
      </HeaderPage>

      <p className="py-4 px-4 text-gray-400 sm:px-6">Ultimas 10 operaciones</p>

      <ListOperations isLoading={isLoading} operations={list} error={error} />
    </>
  );
};

export default Panel;
