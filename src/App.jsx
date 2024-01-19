import './App.css'
import { Toaster } from 'react-hot-toast';
import Overlays from './components/overlays/Overlays'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';



function App({ children }) {


  let theme = createTheme({
    palette: {
      primary: {
        main: '#0052cc',
        brand: '#27306c'
      },
      secondary: {
        main: '#edf2ff',
        brand: '#c29542'
      },
    },
  });

  return (
    <div id='app'>
      <ScopedCssBaseline>
        <ThemeProvider theme={theme}>
          <Overlays />
          {children}
          <Toaster />
        </ThemeProvider>

      </ScopedCssBaseline>
    </div >
  )
}

export default App
