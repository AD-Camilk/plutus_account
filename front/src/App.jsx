import 'antd/dist/reset.css';
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { MyLayout, LoginPage } from './page';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path="/main" element={<MyLayout></MyLayout>}></Route>
        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
