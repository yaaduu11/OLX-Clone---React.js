import { Routes,Route} from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import SellProduct from "./components/SellProduct"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/"  element={<Main/>}/>
        <Route path="/details" element={<Details/>}/>
        <Route path="/sell" element={<SellProduct/>}/>
      </Routes>
    </>
  )
}

export default App