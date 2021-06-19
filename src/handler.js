/* eslint-disable comma-dangle */
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const data = {
    id,
    title,
    createdAt,
    updatedAt,
    tags,
    body,
  };

  notes.push(data);

  const isSuccess = notes.some((note) => note.id === id);

  if (isSuccess) {
    const response = h
      .response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId: id,
        },
      })
      .code(201);

    // response.header('Access-Control-Allow-Origin', '*');

    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    })
    .code(500);

  return response;
};

const getNotesHandler = (request, h) => {
  const response = h
    .response({
      status: 'success',
      data: {
        notes,
      },
    })
    .code(200);

  console.log(response);

  return response;
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const filterNote = notes.filter((note) => note.id === id);

  if (filterNote.length > 0) {
    return h
      .response({
        status: 'success',
        data: {
          note: filterNote[0],
        },
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);
};

const changeNoteHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;

  const index = notes.findIndex((note) => note.id === id);

  if (notes[index] !== undefined) {
    notes[index].updatedAt = new Date().toISOString();

    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
    };

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      })
      .code(200);
  }

  return h
    .reponse({
      status: 'fail',
      message: 'Gagal memperbarui catatan, Id tidak ditemukan',
    })
    .code(404);
};

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    return h
      .response({
        status: 'success',
        message: 'Catan berhasil dihapus',
      })
      .code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus, Id tidak ditemukan',
  });
};

module.exports = {
  addNoteHandler,
  getNotesHandler,
  getNoteByIdHandler,
  changeNoteHandler,
  deleteNoteHandler,
};
