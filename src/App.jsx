import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Previous from './pages/Previous'
import Important from './pages/Important'
import Navbar from './components/Navbar'
function App() {


  return (
    <>
      <Navbar></Navbar>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/previous' element={<previous />} />
        <Route path='/important' element={<Important />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
