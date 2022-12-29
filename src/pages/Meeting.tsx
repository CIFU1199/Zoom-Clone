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


const Meeting = () => {
    useAuth();
    const [meetings, setMeetings] = useState<any>([]);
    const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
    
    
    

    useEffect(() => {
        if(userInfo) {
            const getUserMeetings = async () => {
                const firestoreQuery = query(meetingsRef);
                const fetchedMeetings = await getDocs(firestoreQuery);
                if(fetchedMeetings.docs.length){
                    const myMeetings:Array<MeetingType> = [];
                    fetchedMeetings.forEach(meeting => {
                        const data = meeting.data() as MeetingType;
                        if(data.createdBy === userInfo?.uid) myMeetings.push(data);
                        else if (data.meetingType === "anyone-can-join") myMeetings.push(data);
                        else{
                            const index = data.invitedUsers.findIndex(user => user === userInfo.uid)
                            if(index!== -1){
                                myMeetings.push(data);
                            }
                        }
                    });
                    setMeetings(myMeetings);
                }
            };
            getUserMeetings();
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
                        return <EuiBadge color='primary'>Próximos</EuiBadge>
                    }
                }else return <EuiBadge color='danger' > Cancelado</EuiBadge>
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

export default Meeting