import { ExportOutlined, AccountBookOutlined, UserOutlined, PieChartOutlined, 
  EditOutlined, BookOutlined, FormOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState, lazy, Suspense, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { http } from '../../utils';
import './index.css';
import '../../../mock/main';

const { Header, Content, Footer, Sider } = Layout;

const BillPage = lazy(() => import('../ledger/BillPage'));
const LedgerPage = lazy(() => import('../ledger/LedgerPage'));
const AccountPage = lazy(() => import('../profile/ProfilePage'));
const ReportPage = lazy(() => import('../report/ReportPage'));
const NotePage = lazy(() => import('../note/NotePage'));

const MyLayout = () => {

  const location = useLocation();
  const {state} = location;
  const navigate = useNavigate();
  const [userID, setUserID] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();

  const [selectedKey, setSelectedKey] = useState('1');

  useEffect(() => {
    const alreadyLogin = localStorage.getItem('alreadyLogin');
    if (alreadyLogin) {
      getUserProfile();
    } else {
      navigate(
        '/login'
      );
    }
    
  }, []);

  const getUserProfile = () => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
    };
    http.post('user/getUserProfile', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          const user = res.data.result.user;
          setUserID(user.userID);
          setEmail(user.email);
          setName(user.name);
        } 
      });
  };
  
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const handleSignout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('alreadyLogin');
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (selectedKey) {
    case '1':
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <BillPage email={email} userID={userID}></BillPage>
        </Suspense>
      );
      
    case '2':
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <LedgerPage email={email} userID={userID}></LedgerPage>
        </Suspense>

      );
    case '3': 
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <ReportPage email={email} userID={userID}></ReportPage>
        </Suspense>

      );
       
    case '4':
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <NotePage email={email} userID={userID}></NotePage>
        </Suspense>
      );
      
    case '5':return (
      <Suspense fallback={<div>Loading...</div>}>
        <AccountPage email={email} name={name} userID={userID}></AccountPage>
      </Suspense>
    );
       
    default:
      return null;
    }
  };
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 40,
          bottom: 0,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick}
          items={[
            {
              key: '0',
              icon: React.createElement(AccountBookOutlined),
              label: 'Management',
              children: [
                {
                  key: '1',
                  icon: React.createElement(FormOutlined),
                  label: 'Bills',
                },
                {
                  key: '2',
                  icon: React.createElement(BookOutlined),
                  label: 'Accounts',
                }
              ],
            },
            {
              key: '3',
              icon: React.createElement(PieChartOutlined),
              label: 'Report',
            },
            {
              key: '4',
              icon: React.createElement(EditOutlined),
              label: 'Note',
            },
            {
              key: '5',
              icon: React.createElement(UserOutlined),
              label: 'Profile',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            height: '40px',
          }}
        >
          <div className='brandName'>Plutus</div>
          <div className='signOut'>
            <a className='signOutLink' onClick={handleSignout}><ExportOutlined /> Logout </a>
          </div>
          
        </Header>
        <Content
          style={{
            margin: '24px 16px 0 200px',
          }}
        >
          <div
            style={{
              padding: 40,
              minHeight: 500,
              background: colorBgContainer,
            }}
          >
            {renderContent()}
            
          </div>
          
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            
          }}
        >
          
          <div className='footer-div'>Plutus © 2023</div>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MyLayout;