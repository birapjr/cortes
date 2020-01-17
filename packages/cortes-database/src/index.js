import database from './database.js';
import migration from './migration.js';
import cote from 'cote';

// TODO: this should be out of source code sometime
const dbConnectionString = {
  username: 'postgres',
  password: 'password',
  engine: 'postgres',
  host: 'localhost',
  port: 5416,  // custom port, but it should be the one running the db engine
  dbname: 'postgres'
};
const db = database(dbConnectionString);

const runMigrations = async () => {
  // migrate the database on startup
  // only not executed migrations are executed here
  const migrationTask = migration(db);
  await migrationTask.up();
};

const run = async () => {
  await runMigrations();

  const responder = new cote.Responder({ name: 'cortes database responder' });
  responder.on('query', (req, cb) => {
    const msg = 'db message received';
    console.log(req);
    cb(null, msg);
  });

  console.log('Cortes database service running.');
};

run();
