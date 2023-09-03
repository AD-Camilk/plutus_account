import Mock from 'mockjs';

const getUserProfile = Mock.mock('http://plutus/api/v1.0/user/getUserProfile', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200
  },
  'result': {
    'description': '@string',
    'user': {
      'email': '@email',
      'userID': 'user00001',
      'name': 'test111'
    }
  }
});