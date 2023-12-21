import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Clients from './routes/Clients.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import Loans from './routes/Loans.tsx'
import Collectors from './routes/Collectors.tsx'
import Dashboard from './routes/Dashboard.tsx'
import Wallets from './routes/Wallets.tsx'
import Login from './routes/Login.tsx'
import Payments from './routes/Payments.tsx'
import Collections from './routes/Collections.tsx'


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
        path: "/collector",
        element: <Collectors />,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/payment",
        element: <Payments/>
      },
      {
        path: "/collection",
        element: <Collections/>
      }
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
