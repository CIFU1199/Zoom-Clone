import React from 'react'
import { useEffect , useState } from 'react';
import { MeetingType } from '../utils/Types';
import { query, where, getDocs } from 'firebase/firestore';
import { meetingsRef } from '../utils/FireBaseConfig';
import { useAppSelector } from '../app/hooks';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import { EuiBadge, EuiBasicTable, EuiButtonIcon, EuiCopy, EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';
import moment from 'moment';
import { Link } from 'react-router-dom';

const MyMeetings = () => {
    useAuth();
    const [meetings, setMeetings] = useState<any>([]);
    const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
    
    useEffect(() => {
        if(userInfo){
            const getMyMeetings = async () =>{
                const firestoreQuery = query(meetingsRef,where("createdBy","==",userInfo?.uid));
                const fetchedMeetings = await getDocs(firestoreQuery);
                
                if(fetchedMeetings.docs.length){
                    const myMeetings:Array<MeetingType> = []
                    fetchedMeetings.forEach((meeting)=>{
                        myMeetings.push({
                            docId: meeting.id,
                            ...(meeting.data() as MeetingType),
                        });
                        
                    });
                    setMeetings(myMeetings);
                }
            }
            getMyMeetings();
        }
            
    }, [userInfo]);
    

    
    const columns = [
        {
            field:"meetingName",
            name:"Nombre de la Reunion"
        },
        {
            field:"meetingType",
            name:"Nombre de la Reunion"
        },
        {
            field:"meetingDate",
            name:"Fecha de la Reunion"
        },
        {
            field:"",
            name:"Estado",
            render:(meeting:MeetingType) =>{
                if(meeting.status) {
                    if(meeting.meetingDate === moment().format("L")){
                        return <EuiBadge color='success'> <Link style={{color: "black"}} to={`/join/${meeting.meetingId}`}>Unete</Link> </EuiBadge>
                    }else if(moment(meeting.meetingDate).isBefore(moment().format('L'))){
                        return <EuiBadge color='default'>Terminado</EuiBadge>
                    }else{
                        return <EuiBadge color='primary'>Terminado</EuiBadge>
                    }
                }else return <EuiBadge color='danger' > Cancelado</EuiBadge>
            }
        },
        {
            field:"",
            name:"Editar",
            render:(meeting:MeetingType) =>{
                return(
                    <EuiButtonIcon 
                        aria-label="meeting-edit"
                        iconType='indexEdit'
                        color ='danger'
                        display='base'
                        isDisabled={
                            !meeting.status || moment(meeting.meetingDate).isBefore(moment().format('L'))
                        }
                        onClick={() =>{
                            
                        }}
                    />
                )
            }
        },
        {
            field:"meetingId",
            name:"Copiar Link",
            render:(meetingId:string) =>{
                return <EuiCopy textToCopy={`${import.meta.env.VITE_HOST}/join/${meetingId}`}>
                    {(copy:any)=>(
                    <EuiButtonIcon 
                        iconType="copy"
                        onClick={copy}
                        display="base"
                        aria-label="Meeting-copy"
                    />
                    
                    )}
                </EuiCopy>
            }
        }
    ]
  return (
    <div
        style={{
            display: "flex",
            height: "100vh",
            flexDirection:"column",
        }}
    >
        <Header />
        <EuiFlexGroup justifyContent='center'  style={{margin: "1rem"}}>
            <EuiFlexItem>
                <EuiPanel >
                    <EuiBasicTable 
                        items={meetings}
                        columns={columns}
                    />
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
    </div>
  )
}

export default MyMeetings
