import { Link } from 'react-router-dom';

const HeaderPage = ({
  title,
  description,
  linkUrl,
  linkText,
  modal,
  noBorder = false,
  children,
}) => {
  return (
    <>
      <div
        className={`mx-auto max-w-7xl ${
          noBorder ? 'rounded-t-lg' : 'rounded-lg'
        } bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {title}
          </h1>
          {modal && (
            <button
              className="inline-flex justify-center rounded-md border-2 border-black bg-white px-3 py-1 text-sm font-medium text-black transition-colors hover:border-gray-300 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={modal}
            >
              {linkText}
            </button>
          )}
          {linkUrl && (
            <Link
              to={linkUrl}
              className="inline-flex justify-center rounded-md border-2 border-black bg-white px-3 py-1 text-sm font-medium text-black transition-colors hover:border-gray-300 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              // onClick={() => navigate('../operations/new')}
            >
              {linkText}
            </Link>
          )}
        </div>
        <p className="mt-4 max-w-xl text-sm text-gray-500">{description}</p>
        {children}
      </div>
    </>
  );
};

export default HeaderPage;
