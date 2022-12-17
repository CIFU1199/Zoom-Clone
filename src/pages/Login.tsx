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
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, userRef } from '../utils/FireBaseConfig';
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../app/slices/AuthSlice';




const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    onAuthStateChanged(firebaseAuth, (currentUser) =>{
        if(currentUser) navigate("/")
    })

    const login = async () =>{
        const provider = new GoogleAuthProvider();
        const {user:{displayName, email ,uid}} = await signInWithPopup(firebaseAuth,provider);
        if(email){
            const firestoreQuery = query(userRef,where("uid","==", uid));
            const fetchedUsers = await getDocs(firestoreQuery);
            if(fetchedUsers.docs.length === 0){
                await addDoc(userRef,{
                    uid, 
                    name:displayName,  
                    email})
            }
        }
        dispatch(setUser({uid, name : displayName , email}))
        navigate("/")
    } 

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
                            <EuiButton fill onClick={login}>
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