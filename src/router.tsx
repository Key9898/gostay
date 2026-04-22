import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@components/layout/Layout'
import ProtectedRoute from '@components/auth/ProtectedRoute'
import ErrorBoundary from '@components/common/ErrorBoundary'

const Home = lazy(() => import('@pages/Home'))
const Listings = lazy(() => import('@pages/Listings'))
const ListingDetail = lazy(() => import('@pages/ListingDetail'))
const Roommate = lazy(() => import('@pages/Roommate'))
const Community = lazy(() => import('@pages/Community'))
const Profile = lazy(() => import('@pages/Profile'))
const Login = lazy(() => import('@pages/Login'))
const Register = lazy(() => import('@pages/Register'))
const Manage = lazy(() => import('@pages/Manage'))
const Kitchen = lazy(() => import('@pages/Kitchen'))
const NotFound = lazy(() => import('@pages/NotFound'))
const ListingForm = lazy(() => import('@pages/ListingForm'))
const PostForm = lazy(() => import('@pages/PostForm'))
const RoommateForm = lazy(() => import('@pages/RoommateForm'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  )
}

function withSuspense(node: React.ReactNode) {
  return <Suspense fallback={<PageFallback />}>{node}</Suspense>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: withSuspense(<NotFound />),
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: 'listings', element: withSuspense(<Listings />) },
      {
        path: 'listings/create',
        element: withSuspense(
          <ProtectedRoute>
            <ListingForm />
          </ProtectedRoute>
        ),
      },
      {
        path: 'listings/:id/edit',
        element: withSuspense(
          <ProtectedRoute>
            <ListingForm />
          </ProtectedRoute>
        ),
      },
      { path: 'listings/:id', element: withSuspense(<ListingDetail />) },
      { path: 'roommate', element: withSuspense(<Roommate />) },
      {
        path: 'roommate/create',
        element: withSuspense(
          <ProtectedRoute>
            <RoommateForm />
          </ProtectedRoute>
        ),
      },
      { path: 'community', element: withSuspense(<Community />) },
      {
        path: 'community/create',
        element: withSuspense(
          <ProtectedRoute>
            <PostForm />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: withSuspense(
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: 'login', element: withSuspense(<Login />) },
      { path: 'register', element: withSuspense(<Register />) },
      {
        path: 'manage',
        element: withSuspense(
          <ProtectedRoute>
            <Manage />
          </ProtectedRoute>
        ),
      },
      { path: 'kitchen', element: withSuspense(<Kitchen />) },
      { path: 'kitchen/merchant', element: withSuspense(<Kitchen />) },
    ],
  },
])

export default function AppRouter() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}
