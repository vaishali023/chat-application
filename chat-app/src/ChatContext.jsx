import { createContext, useContext, useReducer } from 'react';
import { useFirestore, useUser } from 'reactfire';
import { db } from './firebase';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { data: currentUser } = useUser();
    const firestore = useFirestore();
  
    const INITIAL_STATE = {
      chatId: 'null',
      user: {},
    };


    const chatReducer = (state, action) => {
      switch (action.type) {
        case 'CHANGE_USER':
          return {
            ...state,
            user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
                
          };
  
        default:
          return state;
      }
    
    
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data: state, dispatch, firestore }}>
        {children}
      </ChatContext.Provider>
    );
};
