import Umzug from 'umzug';
import path from 'path';

const cnsol = console;
const __dirname = path.resolve(path.dirname(''));

const getMigration = db =>
  new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: db.sequelize,
      tableName: 'w_migration'
    },
    logging: cnsol.log,
    migrations: {
      params: [db.sequelize.getQueryInterface(), db],
      // The path to the migrations directory.
      path: path.join(__dirname, 'node_modules/sysmed-database/src/migrations'),
      // The pattern that determines whether or not a file is a migration.
      pattern: /^\d+[\w-]+\.cjs$/
    }
  });
export default getMigration;
