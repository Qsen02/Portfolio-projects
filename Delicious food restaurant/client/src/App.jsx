import { Route, Routes } from "react-router-dom"

import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import UserContext from "./context/UserContext"
import Login from "./components/login/login"
import Register from "./components/register/Register"
import Logout from "./components/logout/Lougout"
import Catalog from "./components/catalog/Catalog"
import CreateForm from "./components/createForm/CreateForm"
import Details from "./components/details/Details"
import Cart from "./components/cart/Cart"
import Status404 from "./components/catalog/status404/Status404"

function App() {

    return (
        <UserContext>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/create" element={<CreateForm />} />
                    <Route path="/catalog/:dishId/*" element={<Details />}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="*" element={<Status404/>}/>
                </Routes>
            </main>
            <Footer />
        </UserContext>
    )
}

export default App
