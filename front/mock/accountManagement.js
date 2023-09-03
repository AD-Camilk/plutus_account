import Mock from 'mockjs';


const changeName = Mock.mock('http://plutus/api/v1.0/user/changeName', 'post', {
    
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200
  },
  'result': {
    'description': 'description',
    'newConfig': {
      'newName': '@name',
    }
  }
    
});

const changePwd = Mock.mock('http://plutus/api/v1.0/user/changePassword', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200
  },
  'result': {
    'description': 'string',
    'user': {
      'email': 'string',
      'userID': 'string',
      'userName': 'string'
    }
  }
});