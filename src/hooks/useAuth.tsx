import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/FireBaseConfig';
import { setUser } from '../app/slices/AuthSlice';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) =>{
        console.log(currentUser);
        if(!currentUser) navigate("/login")
        else{
            dispatch(setUser({
                uid:currentUser.uid,
                email: currentUser.email,
                name: currentUser.displayName,
            }))
        }
    });
    return () =>unsubscribe();
  },[dispatch, navigate])
}

export default useAuth;