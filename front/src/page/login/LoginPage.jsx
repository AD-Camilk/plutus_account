
import { Card, message } from 'antd';
import { React, useState, lazy } from 'react';
import { LoginForm, RegisterForm } from '../../components';
import './login.css';
import { http } from '../../utils';
import '../../../mock/login.js';
import { useNavigate } from 'react-router-dom';


//Card
const tabListNoTitle = [
  {
    key: 'login',
    tab: 'Login',
  },
  {
    key: 'register',
    tab: 'Register',
  },
];

const LoginPage = () => {

  const [activeTabKey2, setActiveTabKey2] = useState('login');
  
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };


  const navigate = useNavigate();

  const onFinishLogin = (values) => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'userParam': {
        'email': values.email,
        'password': values.password,
        'name': values.username,
      }
    };
    http.post('user/login', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          const config = res.data.result.userConfig;
          const jwt = res.data.result.token;
          localStorage.setItem('jwt', jwt);
          localStorage.setItem('alreadyLogin', true);
          navigate(
            '/main', {
              state: {
                userId: config.userID, 
                email: config.email, 
                name: config.name,
              }
            }
          );
          
        }else if(res.data.api.status == 401){
          message.error('Your account or password is wrong');
        }
        
      });
    
  };

  const onFinishRegister = (values) => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'userParam': {
        'email': values.email,
        'password': values.password,
      }
    };
    http.post('user/register', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          const jwt = res.data.result.token;
          localStorage.setItem('jwt', jwt);
          localStorage.setItem('alreadyLogin', true);
          navigate({
            pathname: '/main',
            state: {
              'userId': res.userId, 
              'email': res.email, 
              'name': res.name,
            }
          });
        }else {
          alert('error');
        }
      });
  };

  const contentListNoTitle = {
    login: <LoginForm onFinish={onFinishLogin}></LoginForm>,
    register: <RegisterForm onFinish={onFinishRegister}></RegisterForm>
  };

  return (
    <>
      
      <br />
      <br />
      <div className='appNameDiv'>
        <div className='appName'>Plutus</div>
      </div>
      <div className='formCardDiv'>
        <Card className='formCard'
          style={{
            width: 400,
          }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey2}
          onTabChange={onTab2Change}
        >
          {contentListNoTitle[activeTabKey2]}
        </Card>
      </div>
      
    </>
  );
};


export default LoginPage;