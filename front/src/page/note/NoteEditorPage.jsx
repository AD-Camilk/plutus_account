import { ReactQuillEditor } from '../../components';
import { Button, Form, Input, message } from 'antd';
import {DoubleRightOutlined } from '@ant-design/icons';
import {React, useRef, useState} from 'react';
import { PropTypes } from 'prop-types';
import { http } from '../../utils';
import moment from 'moment';



const NoteEditorPage = ({changeNotePage, note, email, userID}) => {

  const[rawContent, setRawContent] = useState();

  const onChangeRawContent = (content) => {
    setRawContent(content);
  };

  const onFinish = (values) => {
    const date = new Date();
    const timestamp = Date.parse(date);
    const time = moment(date).format('YYYY-MM-DD');
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'user': {
          'email': email,
          'userID': userID,
        },
        'target': {
          'noteID': note.noteID,
          'isDelete': false,    // if true, "newNoteConfig" should be null
          'newNoteConfig': {
            'title': values.title,
            'content': rawContent,
            'date': time,
          }
        }
      }
    };
    http.post('notebook/editNote', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          message.success('Save successfully');
        }
      });

  };


  return (
    <>
      <div className="backButtonDiv">
        <Button 
          className="backButton" 
          type="link" 
          icon={<DoubleRightOutlined />} 
          onClick={changeNotePage}
        >
          返回
        </Button>
      </div>
            
      <div className="noteEditorBar">
        <Form
          initialValues={{
            'title': note.title,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input the tite!',
                validateTrigger:'onChange',
              },
            ]}
            style={{
              width: '350px'
            }}
          >
            <Input placeholder="Title" />
                    
          </Form.Item>
          <Form.Item 
            name='content'
          >
            <ReactQuillEditor 
              defaultContent={note.rawContent} 
              onChangeRawContent={onChangeRawContent}
            >
            </ReactQuillEditor>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 22,
              span: 16,
            }}
          >
            <Button type="primary" htmlType='submit'>保存</Button>
          </Form.Item>
          
        </Form>
      </div>
            
        
    </>
  );
};

NoteEditorPage.propTypes = {
  changeNotePage: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

export default NoteEditorPage;