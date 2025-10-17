'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';

// ✅ Load config.cjs with require
const configFile = require('../config/config.cjs');
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// ✅ Import all models as file:// URLs
for (const file of readdirSync(__dirname).filter(
  file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
)) {
  const module = await import(pathToFileURL(join(__dirname, file)));
  const model = module.default(sequelize, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
