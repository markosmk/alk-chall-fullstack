const FormUser = ({ user }) => {
  return (
    <form>
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6 lg:pb-8 rounded-md sm:overflow-hidden">
        <div>
          <h3 className="text-xl leading-6 font-medium text-black">
            Informacion Personal
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Esta información se mostrará públicamente, así que tenga cuidado con lo que
            comparte.
          </p>
        </div>

        <div className="col-span-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            className="mt-1 transition block w-full px-3 py-2 border-2 border-gray-200 rounded-md bg-gray-100 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:ring-black focus:border-black focus:bg-white sm:text-sm"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electronico
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={user.email}
            className="mt-1 transition block w-full px-3 py-2 border-2 border-gray-200 rounded-md bg-gray-100 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:ring-black focus:border-black focus:bg-white sm:text-sm"
          />
        </div>
      </div>

      <div className="px-4 py-3 text-right sm:px-6">
        <button
          type="submit"
          className="bg-black border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default FormUser;
