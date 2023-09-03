import {React,  useState } from 'react';
import './NotePage.css';
import NoteMainPage from './NoteMainPage';
import NoteEditorPage from './NoteEditorPage';
import { PropTypes } from 'prop-types';

const NotePage = ({email, userID}) => {

  const [contentKey, setContentKey] = useState('1');
  const [note, setNote]  = useState();

  const changeNotePage = (note) => {
    if(note != null){
      setNote(note);
    }
    if(contentKey == '1') {setContentKey('2');}
    else {setContentKey('1');}
  };

  const renderContent = () => {
    switch (contentKey) {
    case '1':
      return <NoteMainPage 
        changeNotePage={changeNotePage}
        email={email}
        userID={userID}
      >
      </NoteMainPage>;
    case '2':
      return <NoteEditorPage 
        changeNotePage={changeNotePage} 
        email={email}
        userID={userID}
        note={note}
      >
      </NoteEditorPage>;
    default:
      return null;
    }
  };


  return (
        
    <>
      <>{renderContent()}</>
    </>
  );
};

NotePage.propTypes = {
  email: PropTypes.string.isRequired,
  userID: PropTypes.string,
};

export default NotePage;