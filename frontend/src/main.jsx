import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './contexts/Auth.context.jsx';
import About, { History, Location, Services } from './pages/about/About.jsx';
import Login from './pages/auth/Login.jsx';
import Logout from './pages/auth/Logout.jsx';
import Register from './pages/auth/Register.jsx';
import Home from './pages/Home.jsx';
import AddOrEditInstrument from './pages/instruments/AddOrEditInstrument.jsx';
import InstrumentDetail from './pages/instruments/InstrumentDetail.jsx';
import InstrumentsList from './pages/instruments/InstrumentsList.jsx';
import Layout from './pages/Layout.jsx';
import NotesList from './pages/notes/NotesList.jsx';
import NotFound from './pages/NotFound.jsx';
import Tuner from './pages/tuner/Tuner.jsx';
import TuningsList from './pages/tunings/TuningsList.jsx';

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Navigate replace to='/home'/>,
      },

      {
        path: '/home',
        element: <Home/>,
      },

      {
        path: '/instruments',
        element: <PrivateRoute/>,
        children: [

          {
            index: true,
            element: <InstrumentsList/>,
          },
          {
            path: ':id',
            element: <InstrumentDetail />,
          },

          {
            path: 'add',
            element: <AddOrEditInstrument/>,
          },

          {
            path : 'edit/:id',
            element: <AddOrEditInstrument/>,
          },
        ],
      },

      {
        path: 'tunings',
        element: <PrivateRoute/>,
        children: [
          {
            index : true,
            element: <TuningsList/>,
          },
        ],
      },

      {
        path: 'notes',
        element: <PrivateRoute/>,
        children: [
          {
            index: true,
            element: <NotesList/>,
          },
        ],
          
      },

      {
        path: 'about',
        element: <About/>,
        children: [
          {
            path: 'services',
            element: <Services/>,
          },
          {
            path: 'history',
            element: <History/>,
          },
          {
            path: 'location',
            element: <Location/>,
          },
        ],
      },
      {
        path: 'services',
        element: <Navigate to='/about/services' replace />,
      },
      {
        path: 'history',
        element: <Navigate to='/about/history' replace />,
      },
      {
        path: 'location',
        element: <Navigate to='/about/location' replace />,
      },
      {
        path: 'tuner',
        element: <Tuner/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/logout',
        element: <Logout/>,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: '*',
        element: <NotFound/>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router = {router}/>
    </AuthProvider>
  </StrictMode>,
);
