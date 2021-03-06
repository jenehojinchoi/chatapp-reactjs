import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;
    const chat = chats && chats[activeChat];

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div 
                key={`read_${index}`}
                className='read-receipt'
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        )) 
    }

    const renderMessages = () => {
        console.log('hello renderMessages');
        try {
            const keys = Object.keys(messages);
            return keys.map((key, index) => {
            
                const message = messages[key];
                console.log(message);
                const lastMessageKey = index === 0 ? null : keys[index-1];

                let isMyMessage = false;
                if ( message.sender !== null ) {
                    isMyMessage = userName === message.sender.username;
                } else {
                    message.sender = {
                        'avatar': null,
                        'custom_json': {},
                        'first_name': 'Jene Hojin',
                        'is_online': true,
                        'last_name': 'Choi',
                        'username' : 'jene',
                    }
                }

                return (
                    <div key={`msg_${index}`} histyle={{ width: '100%' }}>
                        <div className="message-block">
                            {
                                isMyMessage
                                ? <MyMessage message={message}/>
                                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>
                            }
                        </div>
                        <div className="read-receipts" style={{ 
                            marginRight : isMyMessage ? '18px' : '0px',
                            marginLeft : isMyMessage ?  '0px' : '68px'
                        }}>
                            {renderReadReceipts(message, isMyMessage)}
                        </div>
                    </div>
                    )
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    renderMessages();

    const writeChatSubtitle = (person, index) => {
        const numOfPeople = chat.people.length;
        let subtitle = '';
        index===numOfPeople-1  ?  subtitle += `${person.person.username}` : subtitle+=`${person.person.username}, `
        return subtitle;
    } 

    if (!chat) return 'Loading...';

    return (
        <div className='chat-feed'>
            <div className='chat-title-container'>
                <div className='chat-title'>
                    {chat.title}
                </div>
                <div className='chat-subtitle'> 
                    {chat.people.map((person, index) => writeChatSubtitle(person,index))}
                </div>
            </div>
            {renderMessages()}
            <div style= {{ height: '100px' }} />
            <div className='message-form-container'>
                <MessageForm { ... props} chatId={activeChat}/>
            </div>
        </div>
    )
}

export default ChatFeed;