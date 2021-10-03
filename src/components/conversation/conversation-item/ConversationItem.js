import React from 'react';
import classNames from 'classnames';

import './ConversationItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { imageAdmin, imageUser } from '../../../images';
import moment from 'moment';
import { messagesRequested } from '../../../store/actions';


const ConversationItem = ({ conversation, isActive, onConversationItemSelected }) => {
    const className = classNames('conversation', {
        'active': isActive
    });

    const { userRole, token, userId } = useSelector(state => state.userState)
    const dispatch = useDispatch()

    const onChangeSelectedConversation = async () => {
        await onConversationItemSelected({
            conversationId: conversation._id,
            token: token,
            role: userRole,
            userId: userId
        })
        await dispatch(messagesRequested({
            conversationId: conversation._id,
            token: token,
            role: userRole,
            userId: userId
        }))
    }

    return (
        <div className={className} onClick={onChangeSelectedConversation}>
            <img src={userRole==="R2" ? imageAdmin : imageUser } alt="imageAlt" />
            <div className="title-text">{conversation.userId.fullName || conversation.adminId.fullName}</div>
            <div className="created-date">{moment(conversation.createdAt).startOf('hour').fromNow()}</div>
            <div className="conversation-message">
                {conversation.latestMessageText ? conversation.latestMessageText : "Chat now"}
            </div>
        </div>
    );
}

export default ConversationItem;
