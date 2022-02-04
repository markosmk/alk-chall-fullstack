import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories } from '../../context/reducers/categorySlice';

const Categories = () => {
  const { list: categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <h1>Categorias</h1>
      <div>
        {categories &&
          categories.map((item) => {
            return (
              <div key={item.id}>
                <li>{item.name}</li>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
