import AuthLayout from './layouts/AuthLayout';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  return (
    <AuthLayout>
      <RouterProvider router={router}/>
    </AuthLayout >
  );
}

export default App;
