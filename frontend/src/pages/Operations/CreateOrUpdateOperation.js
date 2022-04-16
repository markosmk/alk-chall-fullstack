import { useParams } from 'react-router-dom';

import HeaderPage from 'components/HeaderPage';
import FormOperation from 'components/forms/FormOperation';

const CreateOrUpdateOperation = () => {
  const params = useParams();
  return (
    <>
      <HeaderPage
        title={params.id ? 'Editando Operacion' : 'Creando Nueva Operacion'}
        description="Si necesitas una nueva categoria puedes crearla desde 'Categorias'"
        linkUrl={-1}
        linkText="Volver"
      />

      <div className="mt-4 rounded-lg bg-white p-4">
        <FormOperation />
      </div>
    </>
  );
};

export default CreateOrUpdateOperation;
