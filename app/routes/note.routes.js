const auth = require('../middlewares/authenticated.middleware');

module.exports = (app) => {
  const  notes = require('../controllers/note.controller');

  app.post('/notes', notes.create);

  app.get('/notes', auth, notes.findAll);

  app.get('/notes/:noteId', notes.findOne);

  app.put('/notes/:noteId', notes.update);

  app.delete('/notes/:noteId', notes.delete);

};
