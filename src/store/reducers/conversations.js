const initialState = {
    conversations: [],
    selectedConversation: {}
};

initialState.selectedConversation = initialState.conversations[1];

const conversationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CONVERSATIONS_LOADED':
            return {
                ...state,
                conversations: action.payload.conversations ? action.payload.conversations : [],
                selectedConversation: action.payload.selectedConversation
            };
        case 'SELECTED_CONVERSATION_CHANGED':
            let newselectedConversation =
                state.conversations.find(
                    conversation => conversation._id === action.conversationId
                );

            return {
                ...state,
                selectedConversation: newselectedConversation
            };

        case 'DELETE_CONVERSATION': {
            if (state.selectedConversation) {
                const newState = { ...state };

                let selectedConversationIndex =
                    newState.conversations.findIndex(c => c._id === newState.selectedConversation._id);
                newState.conversations.splice(selectedConversationIndex, 1);

                if (newState.conversations.length > 0) {
                    if (selectedConversationIndex > 0) {
                        --selectedConversationIndex;
                    }

                    newState.selectedConversation = newState.conversations[selectedConversationIndex];
                } else {
                    newState.selectedConversation = null;
                }

                return newState;
            }

            return state;
        }
        default:
            return state;
    }
}

export default conversationsReducer;