import toast from 'react-hot-toast';

export const toastDark = (text) => {
  toast.dismiss();
  toast.success(text, {
    className: 'rounded-md bg-gray-900 text-gray-200 py-2 px-4',
    position: 'bottom-center',
  });
};

export const toastSuccess = (text) => {
  toast.dismiss();
  toast.success(text, {
    className: 'rounded-md bg-green-100 text-green-800 py-2 px-4',
    position: 'bottom-center',
  });
};

export const toastError = (text) => {
  toast.dismiss();
  toast.error(text, {
    className: 'rounded-md bg-red-100 text-red-800 py-2 px-4',
    position: 'bottom-center',
  });
};

export const toastLoading = (text = '...Guardando Cambios') => {
  toast.dismiss();
  toast.loading(text, {
    className: 'rounded-md bg-white text-gray-800 py-2 px-4',
    position: 'bottom-center',
  });
};

export const toastPromise = (promesa) => {
  toast.dismiss();
  toast.promise(
    promesa,
    {
      loading: 'Guardando...',
      success: (data) => data.data?.message,
      error: (err) => `Ups: ${err.response.data.message}`,
    },
    {
      style: {
        minWidth: '275px',
      },
      loading: {
        className: 'rounded-md bg-white py-2 px-4',
      },
      success: {
        className: 'rounded-md bg-green-100 text-green-800 py-2 px-4',
      },
      error: {
        className: 'rounded-md bg-red-100 text-red-800 py-2 px-4',
      },
      position: 'bottom-center',
    }
  );
};
