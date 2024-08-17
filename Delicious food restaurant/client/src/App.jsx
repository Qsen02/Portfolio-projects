import { Route, Routes } from "react-router-dom"

import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import UserContext from "./context/UserContext"
import Login from "./components/login/login"
import Register from "./components/register/Register"
import Logout from "./components/logout/Lougout"

function App() {

    return (
        <UserContext>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </main>
            <Footer />
        </UserContext>
    )
}

export default App
