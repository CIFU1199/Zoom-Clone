import React from 'react'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';
import meeting1 from "../assets/meeting1.png"
import meeting2 from "../assets/meeting2.png"

const CreateMeeting = () => {
  useAuth();
  const navigate = useNavigate();
  return (
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
      }}>
        <EuiFlexItem>
          <EuiCard 
                icon={<EuiImage size="100%" alt='icon' src={meeting1} />}
                title={`Crear Reunión 1 a 1`}
                description="Crear una reunión personal de una sola persona."
                onClick={() => navigate('/create1on1')}
                paddingSize="xl"
              />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiCard 
                icon={<EuiImage size="100%" alt='icon' src={meeting2} />}
                title={`Crear Video Conferencia`}
                description="Invitar a varias personas a la reunión."
                onClick={() => navigate('/videoconference')}
                paddingSize="xl"
              />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default CreateMeeting