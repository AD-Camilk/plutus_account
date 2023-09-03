import { useState, React, useEffect } from 'react';
import { message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { NoteFormModal, NoteTable } from '../../components';
import { PropTypes } from 'prop-types';
import { http } from '../../utils';
import '../../../mock/note.js';
import './NotePage.css';
import moment from 'moment';


const NoteMainPage = ({ changeNotePage, email, userID }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteList, setNoteList] = useState();

  useEffect(() => {
    getNotes();
  }, []);

  const convertTime = (noteData) => {
    const re = noteData.map((note) => {
      note.date = moment(note.date).format('YYYY-MM-DD');
      return note;
    });
    return re;
  };

  const getNotes = () => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'user': {
          'email': email,
          'userID': userID
        },
      }
    };
    
    http.post('notebook/getNotes', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          let noteData = res.data.result.queryData;
          noteData = convertTime(noteData);
          setNoteList(noteData);
       
        }
          
      });
  };


  const handleAddNote = () => {
    setIsModalOpen(true);
  };

  const handleOk = (values) => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'user': {
          'email': email,
          'userID': userID
        },
        'note': {
          'title': values.title,
          'rawContent': ''
        }
      }
    };
    http.post('notebook/addNote', params)
      .then((res)=>{
    
        if(res.data.api.status == 200){
          getNotes();
        }
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
    
  const handleViewNote = (record) => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'noteID': record.noteID
      }
    };
    http.post('notebook/getNote', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          const note = res.data.result.note;
          changeNotePage(note);
        }
      });
    
  };
 
  const handleDeleteNote = (record) => {
  
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'user': {
          'email': email,
          'userID': userID,
        },
        'target': {
          'noteID': record.noteID,
          'isDelete': true,    // if true, "newNoteConfig" should be null
          'newNoteConfig': null
        }
      }
    };
    http.post('notebook/editNote', params)
      .then((res)=>{
       
        if(res.data.api.status == 200){
          getNotes();
          message.success('Delete successfully');
        }
      });
  };

  return (
    <>
      <div className="topBar">
        <Button 
          className="addNoteButton" 
          onClick={handleAddNote} 
          icon={<PlusOutlined />}
        >
        </Button>
      </div>
            
      <NoteTable
        noteList={noteList}
        handleDeleteNote={handleDeleteNote}
        handleViewNote={handleViewNote}
      >
      </NoteTable>
      <NoteFormModal
        isModalOpen={isModalOpen} 
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
      </NoteFormModal>
    </>
  );

};

NoteMainPage.propTypes = {
  changeNotePage: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

export default NoteMainPage;