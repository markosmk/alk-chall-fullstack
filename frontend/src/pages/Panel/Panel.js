import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { openModal } from '../../context/reducers/modalSlice';
import Filters from '../../components/Filters';
import ListOperations from '../../components/ListOperations';

const Panel = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="mx-auto max-w-7xl rounded-t-lg bg-white py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Balance</h1>
        <p className="mt-4 max-w-xl text-sm text-gray-700">
          Muestra la tabla de los ingresos y egresos de/los usuarios
        </p>
        <p>
          Balance: <strong>$12300.00</strong>
        </p>
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => dispatch(openModal())}
        >
          Crear Nueva Operacion
        </button>
      </div>
      {/* <Filters /> */}
      <p className="py-4 px-4 text-gray-400 sm:px-6">Ultimas 10 operaciones</p>

      <ListOperations />
    </div>
  );
};

export default Panel;
