const Knex = require('knex').default;

module.exports = class MensajesSqlite {
    constructor(options,tabla) {
      this.knex = Knex(options);
      this.tabla = tabla;
    }
  
    async save(obj) {
      try {

        console.log(`insertando mensaje: ${obj}`);
        await this.knex(this.tabla).insert([
            {author: obj.author, text: obj.text, date: obj.date}]);
        } catch (error) {
        throw error;
      }
    }
  
   async getAll() {
      try {
      
        const array = await this.knex.from(this.tabla).select("*");
        return array;
      } catch (error) {
        throw error;
      }
    }
  
  };
  
  
  