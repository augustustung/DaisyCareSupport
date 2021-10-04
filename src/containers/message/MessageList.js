import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { messagesRequested, newMessageAdded } from '../../store/actions';
import Message from '../../components/message/Message';
import './MessageList.scss';
import FormButton from '../../components/controls/buttons/FormButton';
import AttachmentIcon from '../../components/controls/icons/attachment-icon/AttachmentIcon';
import io from 'socket.io-client'

const isMessageEmpty = (textMessage) => {
    return adjustTextMessage(textMessage).length === 0;
}

const adjustTextMessage = (textMessage) => {
    return textMessage.trim();
};

let socket

const MessageList = ({
    conversationId,
    loadMessages,
    messageDetails,
    onMessageSubmitted,
    adminId,
    userId,
    userRole,
    userName,
    token
}) => {
    const [state, setState] = useState({
        allMessages: [],
        prevMessage: null,
        prevLength: 0,
        textMessage: '',
        file: null
    })

    const {
        allMessages,
        prevMessage,
        prevLength,
        textMessage,
        file
    } = state

    const disableButton = isMessageEmpty(textMessage);

    const _onReloadMessages = async () => {
        await loadMessages({
            conversationId: conversationId,
            token: token,
            role: userRole,
            userId: userId
        })

        if (messageDetails && messageDetails.length > 0) {
            setState(prev => ({
                ...prev,
                textMessage: '',
                file: null,
                allMessages: messageDetails,
                prevLength: messageDetails.length,
                prevMessage: messageDetails[messageDetails.length - 1]._id
            }))
        } else {
            setState(prev => ({
                ...prev,
                prevLength: 0,
                prevMessage: null,
                allMessages: []
            }))
        }
    }


    useEffect(() => {
        _onReloadMessages()
    }, [])

    useEffect(() => {
        socket = io("https://daisycare-support.herokuapp.com")

        socket.emit('join', { userId: userId, userName: userName, roomId: conversationId }, async (e) => {
            e && alert('connect error', e)
            if (
                messageDetails &&
                messageDetails.length > 0 &&
                (
                    messageDetails[messageDetails.length - 1]._id !== prevMessage
                    || messageDetails.length !== prevLength
                )
            ) {
                await _onReloadMessages()
            }
        })

        return () => {
            socket.disconnect()
            socket.off()
        }
    }, [_onReloadMessages])

    useEffect(() => {
        socket.on('receiveMessage', async () => {
            await _onReloadMessages();
        })
    }, [_onReloadMessages])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!isMessageEmpty(textMessage)) {
            await socket.emit('sendMessage',
                { roomId: conversationId, senderId: userId },
                async (senderId) => {
                    await onMessageSubmitted({
                        _id: conversationId,
                        text: textMessage,
                        senderId: userId,
                        userId: userId,
                        createdAt: new Date(),
                        token: token,
                        adminId: adminId._id
                    });

                    if (senderId === userId)
                        await _onReloadMessages()
                })
        }
    };

    const _onChooseFile = async (e) => {
        let attachment = e.target.files[0]
        setState(prev => ({ ...prev, file: attachment }))
        //convert to blob
        const fetchFile = await fetch(file).then(res => res.arrayBuffer());
        console.log(fetchFile);
    }

    const _onChangeTextInput = (e) => {
        const { value, name } = e.target
        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <>
            <div id="chat-message-list">
                {allMessages.length > 0 ? allMessages.map((message, index) => {
                    return <Message
                        key={index}
                        isMyMessage={message.senderId === userId}
                        message={message} />;
                }) : (
                    <></>
                )}
            </div>
            <form id="chat-form" onSubmit={handleFormSubmit}>
                <div title="Add Attachment">
                    <AttachmentIcon handleChooseFile={_onChooseFile} />
                </div>
                <input
                    type="text"
                    placeholder="type a message"
                    value={textMessage}
                    name="textMessage"
                    onChange={_onChangeTextInput} />
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
        token: state.userState.token,
        userName: state.userState.fullName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadMessages: (data) => dispatch(messagesRequested(data)),
        onMessageSubmitted: (data) => dispatch(newMessageAdded(data))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);