
import { React, useState } from 'react';
import { Typography, Divider, Input, Button, message} from 'antd';
import { UsernameEditModal, PasswordEditModal } from '../../components';
import { http } from '../../utils';
import './ProfilePage.css';
import { PropTypes } from 'prop-types';
import '../../../mock/accountManagement.js';

const { Title } = Typography;

const AccountPage = ({email, name, userID}) => {
  const [isPwdEditModalOpen, setIsPwdEditModalOpen] = useState(false);
  const [isUsnmEditModalOpen, setIsUsnmEditModalOpen] = useState(false);
  const [username, setUsername] = useState(name);

  const handleEditUsnm = () => {
    setIsUsnmEditModalOpen(true);
  };

  const handleEditPwd = () => {
    setIsPwdEditModalOpen(true);
  };

  const handleUsnmOk = (values) => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'user': {
          'email': email,
          'userID': userID,
        },
        'newConfig': {
          'newName': values.username
        }
      }
    };
    setIsUsnmEditModalOpen(false);
    http.post('user/changeName', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          const config = res.data.result.newConfig;
          message.success('edit successfully');
          setUsername(values.username);
        }
        
      });
    
  };

  const handlePwdOk = (values) => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'user': {
          'email': email,
          'userID': userID,
          'oldPassword': values.oldPassword
        },
        'newConfig': {
          'newPassword': values.newPassword
        }   
      }
    };

    http.post('user/changePassword', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          const config = res.data.result.newConfig;
          setIsPwdEditModalOpen(false);
          message.success('edit successfully');
        }else if(res.data.api.status == 401) {
          message.error('the password is wrong');
        }
        
      });

   
  };
    //TODO
  const handleCancel = () => {
    setIsPwdEditModalOpen(false);
    setIsUsnmEditModalOpen(false);
  };


  return (

    <>
      <div className="title">
        <Title level={3}>Your Profile</Title>
      </div>
      <div className='divider'>
        <Divider></Divider>
      </div>
            
      <div className="information">
        <Title level={5}>Email</Title>
        <Input className='input' disabled value={email}></Input>
               
        <Title level={5}>Username</Title>
        <Input className='input' disabled value={username}></Input>
        <Button className='edit' onClick={handleEditUsnm}>Edit</Button>

        <Title level={5}>Password</Title>
        <Input className='input' disabled value={'******'}></Input>
        <Button className='edit' onClick={handleEditPwd}>Edit</Button>
      </div>

      <UsernameEditModal
        username={username}
        isModalOpen={isUsnmEditModalOpen} 
        handleOk={handleUsnmOk}
        handleCancel={handleCancel}
      >
      </UsernameEditModal>

      <PasswordEditModal
        isModalOpen={isPwdEditModalOpen} 
        handleOk={handlePwdOk}
        handleCancel={handleCancel}
      >
      </PasswordEditModal>
    </>

  );
};

AccountPage.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.func.isRequired,
  userID: PropTypes.func.isRequired,
};

export default AccountPage;