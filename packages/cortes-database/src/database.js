import path from 'path';
import Sequelize from 'sequelize';
import fs from 'fs';

import ajv from 'ajv';
import pg from 'pg';
import pgHstore from 'pg-hstore';

const __dirname = path.resolve(path.dirname(''));

const init = dbConnectionString => {
  // connection string uri
  const { username, password, host, port, dbname } = dbConnectionString;
  const dbConnectionStringUri = `postgresql://${username}:${password}@${host}:${port}/${dbname}`;

  const logLevel = 'Error';

  const db = {};
  const cnsol = console;
  const sequelize = new Sequelize(dbConnectionStringUri, {
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    },
    // To see inner SQL queries of Sequelize
    logging: logLevel === 'Debug' ? cnsol.log : false
  });
  db.sequelize = sequelize; // instance object

  fs.readdirSync(path.join(__dirname, 'src/models'))
    .filter(file => file.indexOf('.') !== 0)
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, 'src/models', file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    const model = db[modelName];
    // classMethods
    if (model.options.classMethods) {
      Object.keys(model.options.classMethods).forEach(methodName => {
        model[methodName] = model.options.classMethods[methodName];
        delete model.options.classMethods[methodName];
      });
    }
    // instanceMethods
    if (model.options.instanceMethods) {
      Object.keys(model.options.instanceMethods).forEach(methodName => {
        model.prototype[methodName] = model.options.instanceMethods[methodName];
        delete model.options.instanceMethods[methodName];
      });
    }
    // create relations
    if ('associate' in model) {
      model.associate(db);
    }
  });

  db.Sequelize = Sequelize; // Constructor functionx
  return db;
};

export default init;
