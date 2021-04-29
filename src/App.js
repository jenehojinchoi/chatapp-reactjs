import { ChatEngine } from 'react-chat-engine';

import LoginForm from './routes/LoginForm.jsx';
import ChatFeed from './components/ChatFeed.jsx';
import SignUpForm from './routes/SignUpForm.jsx';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import { config } from './config';

const App = () => {
    return (
        <Router>
            <Route exact path='/signup' component={SignUpForm} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/'>
                <ChatEngine 
                    height='100vh'
                    projectID= {config.ProjectID} 
                    userName={localStorage.getItem('username')}
                    userSecret={localStorage.getItem('password')}
                    renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                />
            </Route>
        </Router>
    )
}

export default App;