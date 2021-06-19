const handler = require('./handler');

const routes = [
  {
    path: '/notes',
    method: 'POST',
    handler: handler.addNoteHandler,
    // options: {
    //   cors: {
    //     origin: ['*'],
    //   },
    // },
  },
  {
    path: '/notes',
    method: 'GET',
    handler: handler.getNotesHandler,
  },
  {
    path: '/notes/{id}',
    method: 'GET',
    handler: handler.getNoteByIdHandler,
  },
  {
    path: '/notes/{id}',
    method: 'PUT',
    handler: handler.changeNoteHandler,
  },
  {
    path: '/notes/{id}',
    method: 'DELETE',
    handler: handler.deleteNoteHandler,
  },
];

module.exports = routes;
