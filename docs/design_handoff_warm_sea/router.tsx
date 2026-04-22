import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@components/layout/Layout'
import Home from '@pages/Home'
import Listings from '@pages/Listings'
import ListingDetail from '@pages/ListingDetail'
import Roommate from '@pages/Roommate'
import Community from '@pages/Community'
import Profile from '@pages/Profile'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Manage from '@pages/Manage'
import Kitchen from '@pages/Kitchen'
import NotFound from '@pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'listings', element: <Listings /> },
      { path: 'listings/:id', element: <ListingDetail /> },
      { path: 'roommate', element: <Roommate /> },
      { path: 'community', element: <Community /> },
      { path: 'profile', element: <Profile /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'manage', element: <Manage /> },
      { path: 'kitchen', element: <Kitchen /> },
      { path: 'kitchen/merchant', element: <Kitchen /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
