import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUser } from '../../context/reducers/userSlice';

const User = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Usuario</h1>
      <pre>{userData && JSON.stringify(userData, null, ' ')}</pre>
    </div>
  );
};

export default User;
