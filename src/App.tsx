import { EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui';
import {Route, Routes} from 'react-router-dom'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAppDispatch, useAppSelector } from './app/hooks';
import  { useState, useEffect } from 'react';
import ThemeSelector from './components/ThemeSelector';


const App = () => {

  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((zoom)=> zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialTheme, setIsInitialTheme] = useState(true);

  useEffect(()=>{
    const theme = localStorage.getItem("zoom-theme");
    if(theme){
      setTheme(theme as EuiThemeColorMode)
    }else{
      localStorage.setItem("zoom-theme","light");
    }
  },[]);

  useEffect(()=>{
    if(isInitialTheme) setIsInitialTheme(false);
    else{
      window.location.reload();
    }
  },[isDarkTheme])

  
  const overrides = {
    colors:{
      LIGHT:{primary: "#0b5cff"},
      DARK:{primary: "#0b5cff"},
    }
  }

  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  )
}

export default App
