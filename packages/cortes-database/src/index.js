import database from './database.js';
import migration from './migration.js';
import cote from 'cote';

const run = async () => {
  const responder = new cote.Responder({ name: 'cortes database responder' });

  responder.on('query', (req, cb) =>
};

run();
