import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { logout } from '../context/reducers/authSlice';

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import AvatarLetter from './AvatarLetter';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  { name: 'Panel', href: '/', current: true },
  { name: 'Operaciones', href: '/operations', current: false },
  { name: 'Categorias', href: '/categories', current: false },
];

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-4 z-50 flex-shrink-0 flex h-16 bg-white rounded-lg">
      {/* Menu */}
      <div className="flex-1 px-4 flex justify-between lg:max-w-6xl lg:mx-auto">
        <div className="flex-1 flex items-center gap-1">
          {navigation.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.href}
              className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-gray-600 hover:bg-gray-100"
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none lg:p-2 lg:rounded-md lg:hover:bg-gray-100 group">
                <AvatarLetter size="32" name={user?.name} />
                <span className="hidden ml-3 text-black text-sm font-medium lg:block lg:group-hover:text-gray-600">
                  <span className="sr-only">Open user menu for </span>
                  {user?.name}
                </span>
                <ChevronDownIcon
                  className="hidden flex-shrink-0 ml-1 h-5 w-5 text-black lg:block lg:group-hover:text-gray-600"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/user"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Opciones
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#s"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                      onClick={() => dispatch(logout())}
                    >
                      Salir
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
