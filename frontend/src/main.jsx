import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
// import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </BrowserRouter>

    {/* <ShopContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShopContextProvider> */}
  </StrictMode>,
)
