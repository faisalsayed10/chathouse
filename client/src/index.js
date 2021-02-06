import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { UserProvider } from './context/context';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
