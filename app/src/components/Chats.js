import React, {useState, useRef, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import axios from 'axios';
import {useAuth} from '../contexts/AuthContext'

function Chats() {

    const history = useHistory();
    const {user} = useAuth();
    const [loading,setLoading] = useState(true);
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/')
    }

    // get user image
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob(); // Transfer Image in binary form

        return new File([data], 'userPhoto.jpeg', {type: 'image/jpeg'});
    }
    useEffect(()=>{
        // if user not present then back to login page
        if(!user) {
            history.push('/');
            return;
        }
        // if present
        // api call to fetch user data 
        axios.get('https://api.chatengine.io/users/me', {
            headers:{
                "project-id":"77e687cf-f7b4-418c-a8e6-95df4c4e9af6",
                'user-name': user.email,
                'user-secret': user.uid,
            }
        })// if user already present
        .then(()=>{
            setLoading(false);
        }) // if not then create new
        .catch(()=>{
            // set new form
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar', avatar, avatar.name);
                    // post the final form
                    axios.post('https://api.chatengine.io/users', 
                    formdata, 
                    {headers: {"private-key": '92234dbb-5418-458f-8c43-efcb32b1faed'}})
                    .then(()=>setLoading(false))  // on successful creation
                    .catch((err)=>console.log(err)) // error
                })
        })
    },[user,history])

    if(!user || loading) return 'Loading...';
    return (
        <div className='chats-page'>
            <div className = 'nav-bar'>
            <div className ='logo-tab'>
                ChatApp
            </div>
            <div onClick ={handleLogout} className='logout-tab'>
                Logout
            </div>
            </div>
            <ChatEngine 
                height = 'calc(100vh-66px)'
                projectID='77e687cf-f7b4-418c-a8e6-95df4c4e9af6'
                userName = {user.email}
                userSecret = {user.uid}
            />    
        </div>
    )
}

export default Chats
