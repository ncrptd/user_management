import './App.css'
import { Toaster } from 'react-hot-toast';
import Overlays from './components/overlays/Overlays'

function App({ children }) {
  return (
    <div id='app'>
      <Overlays />
      {children}
      <Toaster />
    </div>
  )
}

export default App
