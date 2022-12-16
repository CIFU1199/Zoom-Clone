import React from 'react';
import { EuiProvider, 
         EuiFlexGroup, 
         EuiFlexItem,
         EuiImage,
         EuiSpacer, 
         EuiText, 
         EuiTextColor,
         EuiButton,
         EuiPanel
        } from '@elastic/eui';
import "@elastic/eui/dist/eui_theme_light.css";
import animation from "../assets/animation.gif";
import logo from "../assets/logo.png";



const Login = () => {
  return (
    <EuiProvider colorMode="dark">
        <EuiFlexGroup alignItems='center' justifyContent='center' style={{width:"100vw", height:"100vh" }}>
            <EuiFlexItem grow={false}>
                <EuiPanel paddingSize='xl'>
                    <EuiFlexGroup justifyContent='center' alignItems='center'>
                        <EuiFlexItem>
                            <EuiImage src={animation} alt='logo'/>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiImage  src={logo} alt='logo' size="230px" />
                            <EuiSpacer size='xs' />
                            
                            <EuiText textAlign='center' grow={false}>
                                <h3>
                                    <EuiTextColor>Una Plataforma para</EuiTextColor>
                                    <EuiTextColor color={"#05bcff"}> Conectar Gente</EuiTextColor>
                                </h3>
                            </EuiText>
                            <EuiSpacer size='l' />
                            <EuiButton fill>
                                Iniciar Sesión con Google
                            </EuiButton>

                        </EuiFlexItem>    
                    </EuiFlexGroup>
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiProvider>
  )
}

export default Login