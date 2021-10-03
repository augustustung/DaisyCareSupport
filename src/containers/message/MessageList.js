import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { messagesRequested } from '../../store/actions';
import Message from '../../components/message/Message';
import './MessageList.scss';
import FormButton from '../../components/controls/buttons/FormButton';
import AttachmentIcon from '../../components/controls/icons/attachment-icon/AttachmentIcon';

const isMessageEmpty = (textMessage) => {
    return adjustTextMessage(textMessage).length === 0;
}

const adjustTextMessage = (textMessage) => {
    return textMessage.trim();
};

const MessageList = ({
    conversationId,
    loadMessages,
    messageDetails,
    onMessageSubmitted,
    adminId,
    userId,
    userRole,
    token
}) => {
    const [messageItems, setMessageItems] = useState(null);
    const [prevMessage, setPrevMessage] = useState(null)
    const [prevLength, setPrevLength] = useState(0)
    const [textMessage, setTextMessage] = useState('');
    const disableButton = isMessageEmpty(textMessage);
    const [file, setFile] = useState(null)
    
    useEffect(() => {
        _onReloadMessages()
    }, [])

    useEffect(() => {
        if
        (messageDetails &&
            messageDetails.length > 0 &&
            messageDetails[messageDetails.length-1]._id !== prevMessage
            || messageDetails.length !== prevLength
        ) {
            _onReloadMessages()
        }
    }, [messageDetails])

    const _onReloadMessages = async () => {
        await loadMessages({
            conversationId: conversationId,
            token: token,
            role: userRole,
            userId: userId
        });
        if (messageDetails && messageDetails.length > 0) {
            const itemMap = await messageDetails.map((message, index) => {
                return <Message
                    key={index}
                    isMyMessage={message.senderId === userId}
                    message={message} />;
            })
            setPrevMessage(messageDetails[messageDetails.length-1]._id)
            setMessageItems(itemMap)
            setPrevLength(messageDetails.length)
        } else {
            setPrevLength(null)
            setPrevMessage(null)
            setMessageItems(null)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!isMessageEmpty(textMessage)) {
            await onMessageSubmitted({
                _id: conversationId,
                text: textMessage,
                senderId: userId,
                userId: userId,
                createdAt: new Date(),
                token: token,
                adminId:adminId._id
            });
            setTextMessage('');
            setFile(null)
            await _onReloadMessages()
        }
    };

    const _onChooseFile = (e) => {
        let file = e.target.files[0]
        setFile(file)
        //convert to blob
    }

    return (
        <>
            <div id="chat-message-list">
                {messageItems}
            </div>
            <form id="chat-form" onSubmit={handleFormSubmit}>
                <div title="Add Attachment">
                    <AttachmentIcon handleChooseFile={_onChooseFile} />
                </div>
                <input
                    type="text"
                    placeholder="type a message"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)} />
                <FormButton disabled={disableButton}>Send</FormButton>
            </form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        messageDetails: state.messagesState.messageDetails,
        userId: state.userState.userId,
        userRole: state.userState.userRole,
        token: state.userState.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadMessages: (data) => dispatch(messagesRequested(data))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);