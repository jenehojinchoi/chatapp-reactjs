import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { config } from '../config';

const LoginForm = ({history}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const authObject = { 
            'Project-ID': config.ProjectID, 
            'User-Name': username,
            'User-Secret': password
        };

        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject })
                .then(res => {
                    if (res.status === 201) {
                        console.log('Successfully logined');
                        localStorage.setItem('username', username);
                        localStorage.setItem('password', password);
                        history.push('/');
                    }
                })
            console.log('Successfully logined');
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            history.push('/');
            
        } catch (error) {
            setError('Oops! Incorrect crendentials!');
        }
    }

    return (
        <div className='wrapper'>
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
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <div align='center'>
                        <button className='noAccountBtn'>
                            <span>Don't have an account? </span><Link to='/signup'>Sign up here</Link>
                        </button>
                    </div>
                    <div align='center'>
                        <h2 className='error'>{error}</h2>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;