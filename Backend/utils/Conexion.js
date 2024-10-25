const { Pool } = require('pg');
const config = require('./Config');

//Patron singleton con una sola instancia de la base de datos
class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = new Pool({
        host: config.BD_HOST,
        user: config.BD_USER,
        port: config.BD_PORT,
        password: config.BD_PASSWORD,
        database: config.BD_NAME,
        ssl: false,
      });
      Database.instance = this;
    }

    return Database.instance;
  }

  query(text, params) {
    return this.pool.query(text, params);
  }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance;