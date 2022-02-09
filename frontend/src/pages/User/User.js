import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUser } from '../../context/reducers/userSlice';
import Spinner from '../../components/Spinner';
import FormUser from './FormUser';
import FormPassword from './FormPassword';

const User = () => {
  const { userData, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoUser());
  }, [dispatch]);

  return (
    <>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white rounded-lg mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Mi Cuenta
        </h1>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <pre>{userData && JSON.stringify(userData, null, ' ')}</pre>

          <div className="space-y-6">
            <FormUser user={userData} />
            <FormPassword />
          </div>
        </>
      )}
    </>
  );
};

export default User;
