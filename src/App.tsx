import AuthLayout from './layouts/AuthLayout';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { initMercadoPago } from '@mercadopago/sdk-react';

function App() {
  console.log(import.meta.env.VITE_MP_PUBLIC_KEY);
  initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY || '', {
    locale: 'es-MX'
  });

  return (
    <AuthLayout>
      <RouterProvider router={router}/>
    </AuthLayout >
  );
}

export default App;
