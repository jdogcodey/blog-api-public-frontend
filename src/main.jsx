import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Loginpage from './routes/SignupPage.jsx';
import Homepage, { loader as homepageLoader } from './routes/Homepage.jsx';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
    <Route index element={<Homepage />} loader={homepageLoader} />
    <Route path="/signup" element={<Loginpage />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {router} />
  </StrictMode>,
)
