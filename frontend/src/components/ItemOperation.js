import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';
dayjs.locale('es-mx');

const ItemOperation = ({ item }) => {
  const handleDelete = (id) => {
    console.log('Eliminar :', id);
  };

  const handleUpdate = (id) => {
    console.log('Actualziar :', id);
  };

  return (
    <li>
      <p>
        <div>{item.concept}</div>
        <div>
          {item.Category ? item.Category.name : 'No Category'} - {item.type} - ${' '}
          {item.amount < 0 ? item.amount * -1 : item.amount}-{' '}
          {dayjs(item.date).format('dddd, D [de] MMMM, YYYY')}
        </div>
      </p>
      <div>
        <button onClick={() => handleUpdate(item.id)}>Editar</button> |{' '}
        <button onClick={() => handleDelete(item.id)}>Eliminar</button>
      </div>
    </li>
  );
};

export default ItemOperation;
