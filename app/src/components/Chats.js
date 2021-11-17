import React from 'react'
import {useHistory} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
function Chats() {

    const history = useHistory();
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/')
    }
    return (
        <div className='chats-page'>
            <div className ='logo-tab'>
                ChatApp
            </div>
            <div onClick ={handleLogout} className='logout-tab'>
                Logout
            </div>
            <ChatEngine 
                height = 'calc(100vh-66px)'
                projectId='77e687cf-f7b4-418c-a8e6-95df4c4e9af6'
                userName = '.'
                userSecret = '.'
            />    
        </div>
    )
}

export default Chats
