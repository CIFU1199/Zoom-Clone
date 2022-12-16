import { EuiProvider } from '@elastic/eui';
import "@elastic/eui/dist/eui_theme_light.css";
import {Route, Routes} from 'react-router-dom'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


const App = () => {
  


  return (
    <EuiProvider >
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
        
      </Routes>
    </EuiProvider>
  )
}

export default App
