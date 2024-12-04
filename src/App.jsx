import './App.css'
import Contact from './Components/Contact/Contact'
import Home from './Components/Home/Home'
import NavBar from './Components/NavBar/NavBar'
import Projects from './Components/Projects/Project'
import Tools from './Components/Tools/Tools'

function App() {

  return (
    <div className='bg-[#0C0C1D]'>
      <NavBar />
      <Home />
      <Projects />
      <Tools />
      <Contact />
    </div>
  )
}

export default App
