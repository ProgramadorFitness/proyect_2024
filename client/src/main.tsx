import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Clients from './views/Clients.tsx'
import ProtectedRoute from './views/ProtectedRoute.tsx'
import { AuthProvider } from './controllers/auth/AuthProvider.tsx'
import Loans from './views/Loans.tsx'
import Collectors from './views/Users.tsx'
import Dashboard from './views/Dashboard.tsx'
import Wallets from './views/Wallets.tsx'
import Login from './views/Login.tsx'
import Payments from './views/Payments.tsx'
import Collections from './views/Collections.tsx'
import { ADMIN } from './models/roles.ts'
import PdfView from './views/PdfView.tsx'

const typeUser = localStorage.getItem('typeUser');
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
        element: <Wallets type={typeUser}/>
      },
      { 
        path: '/client',
        element: <Clients type={typeUser}/>
      },
      { 
        path: '/loan', 
        element: <Loans type={typeUser}/> 
      },
      {
        path: "/collector",
        element: <Collectors type={typeUser}/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/payment",
        element: <Payments type={typeUser}/>
      },
      {
        path: "/collection",
        element: <Collections type={typeUser}/>
      },
      {
        path: "/pdf",
        element: <PdfView />
      }
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <AuthProvider >
    <RouterProvider router={router} />
  </AuthProvider>
</React.StrictMode>,
)
