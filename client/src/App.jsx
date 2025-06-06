import { Box } from "@chakra-ui/react"
import { Route, Routes, useLocation } from "react-router-dom"
import SigninPage from "./pages/SigninPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import AddPage from "./pages/AddPage"
import SearchPage from "./pages/SearchPage"
import Navbar from "./component/Navbar"
import ProtectiveRoute from "./ProtectiveRoute"

function App() {
  const location = useLocation()
  const hideNavBar = location.pathname === '/' || location.pathname === '/signup'

  return (
    <Box minH={"100vh"} bg="gray.900" color="white">
      {!hideNavBar && <Navbar />}
      <Routes>
        <Route path="/" element={<SigninPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/homepage" element={<ProtectiveRoute><HomePage/></ProtectiveRoute>}/>
        <Route path="/add" element={<ProtectiveRoute><AddPage/></ProtectiveRoute>}/>
        <Route path="/search" element={<ProtectiveRoute><SearchPage/></ProtectiveRoute>}/>
      </Routes>
    </Box>
  )
}

export default App;
