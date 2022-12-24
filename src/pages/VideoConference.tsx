import React from 'react'
import Header from '../components/Header';
import { EuiFlexGroup, EuiForm, EuiSpacer, EuiFormRow, EuiSwitch } from '@elastic/eui';
import MeetingNameField from '../components/FormComponents/MeetingNameField';
import {useState} from 'react';
import MeetingUsersFiled from '../components/FormComponents/MeetingUsersFiled';
import useAuth from '../hooks/useAuth';
import useFetchUsers from '../hooks/useFetchUsers';
import moment from 'moment';
import MeetingDateField from '../components/FormComponents/MeetingDateField';
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons';
import CreateMeeting from './CreateMeeting';
import { FieldErrorType, UserType } from '../utils/Types';
import { addDoc } from 'firebase/firestore';
import { meetingsRef } from '../utils/FireBaseConfig';
import { generateMeetingID } from '../utils/generateMeetingId';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
import MeetingMaximumUserField from '../components/FormComponents/MeetingMaximumUserField';



const VideoConference = () => {
    useAuth();
    const navigate = useNavigate();
    const [users] = useFetchUsers();
    const [createToast] = useToast();

    const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
    const [meetingName, setMeetingName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment());
    const [size, setSize] = useState(1);
    const [anyoneCanJoin, setAnyoneCanJoin] = useState(false)
    const [showErrors, setShowErrors] = useState<{
        meetingName:FieldErrorType;
        meetingUser:FieldErrorType;
    }>({
        meetingName:{
            show:false,
            message:[],
        },
        meetingUser:{
            show:false,
            message:[],
        },
    })


    const onUserChange = (selectedOptions:any) =>{
        setSelectedUsers(selectedOptions);
    }

    const validateForm = () =>{
        let errors = false;
        const clonedShowErrors = {...showErrors}
        if(!meetingName.length){
            clonedShowErrors.meetingName.show = true;
            clonedShowErrors.meetingName.message = ["Ingrese el nombre de la reunión"]
            errors = true;
        }else{
            clonedShowErrors.meetingName.show=false;
            clonedShowErrors.meetingName.message = [];
        }if(!selectedUsers.length){
            clonedShowErrors.meetingUser.show = true;
            clonedShowErrors.meetingUser.message = ["Selecciona el usuario"];
        }else{
            clonedShowErrors.meetingUser.show=false;
            clonedShowErrors.meetingUser.message = [];
        }
        setShowErrors(clonedShowErrors);
        return errors;
    }

    const createMeeting = async () =>{
        if(!validateForm()){
            const meetingId = generateMeetingID();
            await addDoc(meetingsRef,{
                createdBy:uid,
                meetingId,
                meetingName,
                meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
                invitedUsers: anyoneCanJoin ? [] : selectedUsers.map((user:UserType)=> user.uid),
                meetingDate:startDate.format("L"),
                maxUsers: anyoneCanJoin ? 100 : size,
                status:true,
            });
            createToast({
                title:anyoneCanJoin ?  "Cualquiera puede unirse a la reunión creada con éxito":"Video conferencia creada con exito",
                type:"success",

            })
            navigate("/");
        }
    }
  return (

    <div style={{
        display:"flex",
        height: "100vh",
        flexDirection:"column", 
      }}>
        <Header/>
        <EuiFlexGroup justifyContent='center' alignItems='center'>
            <EuiForm>
              <EuiFormRow display='columnCompressedSwitch' label='Cualquiera puede unirse'>
                <EuiSwitch 
                  showLabel={false}
                  label="Cualquiera puede unirse"
                  checked={anyoneCanJoin}
                  onChange={e=>setAnyoneCanJoin(e.target.checked)}
                  compressed
                />
              </EuiFormRow>
                <MeetingNameField 
                    label="Nombre de la Reunion"
                    placeholder="Nombre de la Reunion"
                    value={meetingName}
                    setMeetingName={setMeetingName}
                    isInvalid={showErrors.meetingName.show}
                    error={showErrors.meetingName.message}
                />
                {
                  anyoneCanJoin ?( 
                    <MeetingMaximumUserField 
                      value={size}
                      setValue={setSize}
                      />
                    ) : (
                    <MeetingUsersFiled 
                      label="Invitar Usuarios" 
                      options={users} 
                      onChange={onUserChange} 
                      selectedOptions={selectedUsers} 
                      singleSelection={false}
                      isClearable={false}
                      placeholder="Seleccionar usuario"
                      isInvalid={showErrors.meetingUser.show}
                      error={showErrors.meetingUser.message}
                    />)
                }
                <MeetingDateField
                    selected={startDate}
                    setStartDate={setStartDate}
                />
                <EuiSpacer/>
                <CreateMeetingButtons createMeeting={createMeeting}/>
            </EuiForm> 
        </EuiFlexGroup>
    </div>
  )
}

export default VideoConference

