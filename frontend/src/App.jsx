import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CollectionPage from "./pages/CollectionPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import PlaceOrderPage from "./pages/PlaceOrderPage"
import OrderPage from "./pages/OderPage"
import NavBar from "./components/NavBar"
import FooterSection from "./components/FooterSection"
import SearchField from "./components/SearchField"
import { useEffect } from "react"
import { useShopStore } from "./store/ShopStore.js"
import StoreInitializer from "./components/StoreInitializer"
import VerifyPage from "./pages/VerifyPage"


function App() {

  const { getProductData } = useShopStore()

  useEffect(() => {
    getProductData()
  }, [])

  return (
    <>
      <StoreInitializer />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
        <NavBar />
        <SearchField />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/place-order" element={<PlaceOrderPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/verify" element={<VerifyPage />} />
        </Routes>
        <FooterSection />
      </div>
    </>
  )
}

export default App
