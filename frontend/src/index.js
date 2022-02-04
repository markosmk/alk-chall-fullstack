import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './context/store';
import './axiosConfig';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
