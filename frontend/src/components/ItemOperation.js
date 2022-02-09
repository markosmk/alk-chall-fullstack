import dayjs from 'dayjs';

import {
  CalendarIcon,
  CollectionIcon,
  PencilAltIcon,
  TrashIcon,
  CashIcon,
} from '@heroicons/react/outline';
import 'dayjs/locale/es-mx';
dayjs.locale('es-mx');

const ItemOperation = ({ item }) => {
  const amount = item.amount < 0 ? item.amount * -1 : item.amount;

  const handleDelete = (id) => {
    console.log('Eliminar :', id);
  };

  const handleUpdate = (id) => {
    console.log('Actualziar :', id);
  };

  return (
    <li className="border-b">
      <a
        href="#s"
        onClick={handleUpdate}
        className="flex group bg-white hover:bg-gray-50"
      >
        <div className="px-4 py-4 sm:px-6 w-full">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-black truncate">{item.concept}</p>
            <div className="ml-2 flex-shrink-0 flex">
              <p
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.type === 'egreso'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {item.type}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-xs font-extralight text-gray-600">
                <CollectionIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                {item.Category ? item.Category.name : 'No Category'}
              </p>
              <p className="mt-2 flex items-center text-xs font-extralight text-gray-600 sm:mt-0 sm:ml-6">
                <CalendarIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                <time dateTime={item.date}>
                  {dayjs(item.date).format('dddd, D [de] MMMM, YYYY')}
                </time>
              </p>
            </div>
            <div className="mt-2 flex items-center text-xs text-gray-600 sm:mt-0">
              <CashIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              $ {Number(amount).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="hidden group-hover:flex flex-col justify-evenly">
          <button
            type="button"
            className="flex-grow items-center justify-center px-4 py-2 border border-transparent font-medium text-black bg-gray-200 hover:bg-green-100 hover:text-green-800 focus:outline-none sm:text-sm"
            onClick={() => handleUpdate(item.id)}
          >
            <PencilAltIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex-grow items-center justify-center px-4 py-2 border border-transparent font-medium text-black bg-gray-200 hover:bg-red-100 hover:text-red-800 focus:outline-none sm:text-sm"
            onClick={() => handleDelete(item.id)}
          >
            <TrashIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </a>
    </li>
  );
};

export default ItemOperation;
