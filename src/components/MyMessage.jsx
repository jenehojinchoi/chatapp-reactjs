const MyMessage = ({ message }) => {
    if (message?.attachments?.length > 0) {
        return (
            <img 
                src = {message.attachments[0].file}
                alt = "message-attachment"
                className = "message-image"
                style = {{ float: 'right' }}
            />
        )
    }
    return (
        <div className='message' style= {{ 
            float: 'right', 
            marginRight: '18px', 
            color: 'white', 
            backgroundColor: 'rgb(0, 132, 255)',
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
            borderTopRightRadius: '15px'
        }}>
            {message.text}
        </div>
    );
}

export default MyMessage;