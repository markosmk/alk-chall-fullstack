import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../context/reducers/modalSlice';
import ModalForm from '../ModalForm';

const initForm = {
  concept: '',
  amount: '',
  date: '',
  type: '',
};

const FormOperation = ({ handleCreateNew, handleUpdate }) => {
  const { data } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const [form, setForm] = useState(initForm);
  const [info, setInfo] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!form.hasOwnProperty('id')) {
      handleCreateNew(form);
    } else {
      handleUpdate(form);
    }
    /*
    try {
      const response = await fetch('http://localhost:8000/operations', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result) {
        console.log(result);
        setInfo(result);
        setForm(initForm);
      }
    } catch (error) {
      console.log(error);
    }*/

    // console.log(form);
  };

  const handleForm = (ev) => {
    const { name, value } = ev.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // en caso de editar actualizar los campos
  useEffect(() => {
    if (!data.hasOwnProperty('id')) {
      setTimeout(() => {
        setForm(initForm);
      }, 200); // tiempo de ocultar el modal (transicion)
    } else {
      setForm(data);
    }
  }, [data]);

  return (
    <ModalForm title="Crear Nueva Operacion">
      <form onSubmit={handleSubmit}>
        <div className="bg-white py-6 space-y-4 lg:pb-8 rounded-md">
          <div>
            <h2>Response:</h2>
            <pre>{JSON.stringify(info, null, ' ')}</pre>
          </div>

          <div>
            <label htmlFor="concept" className="block text-sm font-medium text-gray-700">
              Concepto
            </label>
            <input
              type="text"
              name="concept"
              id="concept"
              value={form?.concept}
              onChange={handleForm}
              className="mt-1 transition block w-full px-3 py-2 border-2 border-gray-200 rounded-md bg-gray-100 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:ring-black focus:border-black focus:bg-white sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Monto
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={form?.amount}
                onChange={handleForm}
                className="mt-1 transition block w-full px-3 py-2 border-2 border-gray-200 rounded-md bg-gray-100 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:ring-black focus:border-black focus:bg-white sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={form?.date}
                onChange={handleForm}
                className="mt-1 transition block w-full px-3 py-2 border-2 border-gray-200 rounded-md bg-gray-100 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:ring-black focus:border-black focus:bg-white sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <select
                name="type"
                value={form?.type}
                onChange={handleForm}
                className="mt-1 transition block w-full px-3 py-2 border-2 border-gray-200 rounded-md bg-gray-100 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:ring-black focus:border-black focus:bg-white sm:text-sm"
              >
                <option value="">--- Seleccionar ---</option>
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>
            </div>
          </div>

          <div className="mt-4 block space-x-3 text-right">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={() => dispatch(closeModal())}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-black border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>

      <h2>Resultado:</h2>
      <pre>{JSON.stringify(form, null, ' ')}</pre>
    </ModalForm>
  );
};

export default FormOperation;
