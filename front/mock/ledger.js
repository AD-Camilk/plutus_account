import Mock from 'mockjs';

const get = Mock.mock('http://plutus/api/v1.0/feature/getAccounts', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200
  },
  'result': {
    'description': 'description',
    'newToken': 'JWT',
    'queryData|15': [{
      'accountID|1-5': 1,
      'name': '@string',
      'priority|1-5': 1,
      'type|1-5': 1
    }] 
  }
});
    
const add = Mock.mock('http://plutus/api/v1.0/feature/addAccount', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200 
  },
  'result': {
    'description': 'description',
    'newToken': 'JWT',
    'email': '@email',
    'accountID|1-20': 1,
    'accountConfig': {
      'name': '@string',
      'priority': 0,
      'type|1-3': 1,
    }
  }
});

const edit = Mock.mock('http://plutus/api/v1.0/feature/editAccount', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200 
  },
  'result': {
    'description': '@string',
    'newToken': 'JWT',
    'target': {
      'accountID': '@string',
      'isDelete': false,
      'newAccountConfig': {
        'name': '@string',
        'priority': 0,
        'type|1-3': 1
      }
    }
  }
});


