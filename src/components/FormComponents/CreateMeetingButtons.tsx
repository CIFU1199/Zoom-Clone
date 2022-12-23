import React from 'react'
import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';


const CreateMeetingButtons = ({createMeeting}:{
    createMeeting:()=>void;
}) => {
    const navigate = useNavigate();
  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton color='danger' fill onClick={()=>navigate("/")}>Cancelar</EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton  fill onClick={createMeeting}>Enviar</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default CreateMeetingButtons
