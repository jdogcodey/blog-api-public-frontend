import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import SignupPage from './routes/SignupPage.jsx';
import homepageLoader from './loaders/homepageLoader.jsx';
import Homepage from './routes/Homepage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import Profile from './routes/Profile.jsx';
import { UserProvider } from './contexts/userContext.jsx';
import profileLoader from './loaders/profileLoader.jsx';



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />} errorElement={<ErrorPage />} loader={profileLoader}>
    <Route index element={<Homepage />} loader={homepageLoader} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/profile' element={<Profile />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router= {router} />
    </UserProvider>
  </StrictMode>,
)
