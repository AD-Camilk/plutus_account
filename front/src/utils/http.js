import { message, notification } from 'antd';
import axios from 'axios';

const http = axios.create({
  // url for real backend
  // baseURL: 'http://127.0.0.1:9090/api/v1.0/',
  // url for mock.js
  baseURL: 'http://plutus/api/v1.0/', 
  timeout: 5000
});
// interceptor
http.interceptors.request.use((config)=> {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers.Authorization = `${jwt}`;
  }
  return config;
}, (error)=> {
  return Promise.reject(error);
});

const maxRetryCount = 5;


// interceptor
http.interceptors.response.use((response)=> {
  //401 === Identity verification failed
  //407 === need login again
  //408 === Need to re-request, try up to 5 times
  if(response.data.api.status == 407){
    notification.open({
      message: 'Your login time has expired',
      description:
        'You will be redirected to the login page, please log in again',
      type: 'warning'
    });
    localStorage.removeItem('jwt');
    setTimeout(function() {
      window.location.href = '/login';
    }, 5000);

  }else if(response.data.api.status == 408){
    const config = response.config;
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount < maxRetryCount) {
      config.__retryCount++;
      return http.request(config);
    } else {
      message.error('Your action failed');
    }
    
  }else {
    return response;
  } 
}, (error)=> {
  // message.error('real error');
  return Promise.reject(error);
});

export { http };