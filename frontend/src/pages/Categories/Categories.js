import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemOperation from '../../components/ItemOperation';

import { getCategories } from '../../context/reducers/categorySlice';
import { getOperations } from '../../context/reducers/operationSlice';

const Categories = () => {
  const { list: categories } = useSelector((state) => state.category);
  const { list: operations, isLoading } = useSelector((state) => state.operation);
  const dispatch = useDispatch();

  const [category, setCategory] = useState(categories.length > 0 ? categories[0].id : 0);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOperations('?category=' + category));
  }, [category, dispatch]);

  const handleCategory = (id = 0) => {
    // console.log(id);
    setCategory(id);
  };
  console.log(category);
  return (
    <div>
      <h1>Categorias</h1>
      <button>Crear Categoria</button>
      <div>
        <h3>Lista de Categorias</h3>
        {categories &&
          categories.map((item) => {
            return (
              <div key={item.id}>
                <li onClick={() => handleCategory(item.id)}>{item.name}</li>
              </div>
            );
          })}
        <div>
          <li onClick={() => handleCategory()}>No Category</li>
        </div>
      </div>
      <hr />
      <div>
        <h3>Lista Operaciones</h3>
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
    </div>
  );
};

export default Categories;
