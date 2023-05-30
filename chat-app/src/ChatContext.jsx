import { createContext,useEffect, useContext, useReducer } from 'react';
import { useFirestore, useUser } from 'reactfire';
import { db } from './firebase';

export const ChatContext = createContext();
const initialState = {
  chatId: 'null',
  user: {},
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      const { currentUser } = action.payload;
      const { uid, displayName } = currentUser;

      return {
        ...state,
        user: {
          uid: uid,
          displayName: displayName,
        },
        chatId:
          currentUser.uid > state.user.uid
            ? currentUser.uid + state.user.uid
            : state.user.uid + currentUser.uid,
      };

    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  const { data: currentUser } = useUser();
  const firestore = useFirestore();
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: 'CHANGE_USER', payload: { currentUser } });
    }
  }, [currentUser]);

  return (
    <ChatContext.Provider value={{ data: state, dispatch, firestore }}>
      {children}
    </ChatContext.Provider>
  );
};