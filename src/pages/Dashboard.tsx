import React from 'react'
import { useAppSelector } from '../app/hooks';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import dashboard1 from "../assets/dashboard1.png"
import dashboard2 from "../assets/dashboard2.png"
import dashboard3 from "../assets/dashboard3.png"

import Header from '../components/Header';


const Dashboard = () => {
  
  useAuth();
  const navigate = useNavigate()
  return (
    <>
      <div style={{
        display:"flex",
        height: "100vh",
        flexDirection:"column", 
      }}>
        <Header />
        <EuiFlexGroup 
          justifyContent='center' 
          alignItems='center' 
          style={{
            margin:"5vh 10vh"
          }}
        >
          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size="5rem" alt='icon' src={dashboard1} />}
              title={`Crear Reunión`}
              description="Crear nueva reunión e invita gente"
              onClick={() => navigate('/create')}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size="100%" alt='icon' src={dashboard2} />}
              title={`Mis Reuniones`}
              description="Ver Reuniones Creadas"
              onClick={() => navigate('/mymeetings')}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size="5rem" alt='icon' src={dashboard3} />}
              title={`Reuniones`}
              description="Ver las reuniones a las que está invitado"
              onClick={() => navigate('/meetings')}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  )
}

export default Dashboard