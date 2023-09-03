import Mock from 'mockjs';

const getBillMock = Mock.mock('http://plutus/api/v1.0/feature/getBills', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status|1': [200, 408, ], 
    // 'status': 407, 
  },
  'result': {
    'description': 'description',
    'newToken': 'JWT',
    'queryData|15':  // list of bill
            [{
              'billID': '@string',
              'time': '@time',
              'cost|1-100': 1,
              'tag': '@string',
              'type|0-9': 1,
              'account|1-5': 1,
              'accountName':'@string',
              'expression': '@string'
            } ]
  },
    
  
});

const editBillMock = Mock.mock('http://plutus/api/v1.0/feature/editBill', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200 
  },
  'result': {
    'description': 'description',
    'newToken': 'JWT',
    'target': {
      'billID': 'billID1234',
      'isDelete': true,
      'newBillConfig': {
        'time': '@time',
        'cost|1-100': 1,
        'tag': 'tag123',
        'expression': '1+1',
        'type|0-9': 1,
      }
    }
  }

});


export {
  getBillMock,
  editBillMock,
};