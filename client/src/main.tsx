import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Clients from './routes/Clients.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import Loans from './routes/Loans.tsx'
import Users from './routes/Users.tsx'
import Dashboard from './routes/Dashboard.tsx'
import Wallets from './routes/Wallets.tsx'
import Login from './routes/Login.tsx'


const router = createBrowserRouter([

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [

      { 
        path: '/wallet',
        element: <Wallets/>
      },
      { 
        path: '/client',
        element: <Clients/>
      },
      { 
        path: '/loan', 
        element: <Loans/> 
      },
      {
        path: "/users",
        element: <Users />,
        },
        {
          path: "/dashboard",
          element: <Dashboard/>,
          },
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
</React.StrictMode>,
)
