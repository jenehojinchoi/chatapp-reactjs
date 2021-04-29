import React from 'react';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { config } from '../config';

const chat_id = '17770';

const SignUpForm = ({history}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authObject = {
            'PRIVATE-KEY' : config.PrivateKey
        }

        const adminObject = {
            'Project-ID': config.ProjectID, 
            'User-Name': 'jene',
            'User-Secret': '4950'
        }

        const newUserObject = { 
            'username': username,
            'secret': password
        };

        try {
            window.localStorage.clear();
            
            await axios.post('https://api.chatengine.io/users/', newUserObject, { headers: authObject })
                .then(res => {
                    console.log(res);
                    console.log(res.data);

                    // if (res.status === 201) {
                    //     setUsername(username);
                    //     setPassword(password);
                    // }
                });
        
            console.log(username);
            console.log(password);

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            const newMemberObject = {
                'username': username
            }

            await axios.post(`https://api.chatengine.io/chats/${chat_id}/people/`, newMemberObject, { headers: adminObject })
                .then(res => {
                    console.log(res);
                    console.log(res.data);

                    if (res.status === 201) {
                        setIsSignedUp(true);
                        console.log(isSignedUp===true);
                        console.log('Successfully logined');
                        history.push('/');
                    }
                });
                
        } catch (error) {
            setError('Sign up failed!');
            window.alert('Sign up failed!');
            console.log(error);
        }
    }

    return (
        (isSignedUp===true && localStorage.getItem('username') && localStorage.getItem('password'))
        ? (<Redirect to = {{pathname: '/', state: { username: username, password: password }}} />)
        : (<div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Chat with people you like</h1>
                <form onSubmit={ handleSubmit }>
                    <input 
                        type='text' 
                        value={username} 
                        onChange={(e)=> 
                            setUsername(e.target.value)
                        }
                        className='input'
                        placeholder='Username'
                        required
                    />
                    <input 
                        type='password' 
                        value={password} 
                        onChange={(e)=> 
                            setPassword(e.target.value)
                        }
                        className='input'
                        placeholder='Password'
                        required
                    />
                    <div align='center'>
                        <button type='submit' className='startBtn'>
                            <span>Sign Up and Start</span>
                        </button>
                    </div>
                    <div align='center'>
                        <button className='alreadyAccountBtn'>
                            <span>Already have an account? </span><Link to='/login'>Sign In here</Link>
                        </button>
                    </div>
                    <div align='center'>
                        <h2 className='error'>{error}</h2>
                    </div>
                </form>
            </div>
        </div>)
    ) 
}

export default SignUpForm;