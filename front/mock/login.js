import Mock from 'mockjs';


export default Mock.mock('http://plutus/api/v1.0/user/login', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200,
  },
  'result': {
    'description': 'description',
    'userConfig': {
      'email': '@email',
      'name': 'LArc',
      'userID': 'kkkkkkkkkkkkkkkkkk'
    },
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  }
});
