import Mock from 'mockjs';

const getNotes = Mock.mock('http://plutus/api/v1.0/notebook/getNotes', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200,
  },
  'result': {
    'description': '@string',
    'newToken': 'JWT',
    'queryData|12': [{
      'noteID|1-100': 1,
      'date': 1683883619000,
      'title': '@string'
    }]

    // list of notes
  }
});

const addNote = Mock.mock('http://plutus/api/v1.0/notebook/addNote', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200 
  },
  'result': {
    'description': 'string',
    'newToken': 'JWT',
    'noteID|1-20': 1,
    'noteTitle': '@string',
    'noteDate': '@date'    
  }
});

const getNote = Mock.mock('http://plutus/api/v1.0/notebook/getNote', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200
  },
  'result': {
    'description': 'string',
    'newToken': 'JWT',
    'note': {
      'noteID|1-50': 1,
      'title': '@string',
      'rawContent': '<p><em>hhhhhhhhhhkkk</em></p>'
    }
  }
});

const editNote = Mock.mock('http://plutus/api/v1.0/notebook/editNote', 'post', {
  'timestamp': '@date',
  'api': {
    'version': 'v1.0',
    'status': 200
  },
  'result': {
    'description': 'string',
    'newToken': 'JWT'
  }
});

