
import { ParentComponent } from 'solid-js'
import './App.css'
import Sidebar from './components/sidebar'

const App: ParentComponent = (props) => {

  return (
    <>
      <div class='grid min-h-screen grid-cols-5 w-screen bg-[#373220] gap-8 pt-12 pb-2 pr-4'>
        <Sidebar />
        {props.children}
      </div>
    </>
  )
}

export default App
