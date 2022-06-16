const Knex = require('knex').default;
 
module.exports = class Contenedor {
  constructor(options,tabla) {
    this.knex = Knex({
      client: 'mysql2',
      connection: options
    });
    this.tabla = tabla;
    
  }
 
 async save(obj) {
    try {
        await this.knex(this.tabla).insert([
            {title: obj.title, price: obj.price, thumbnail: obj.thumbnail}]);
      obj.id = await this.knex(this.tabla).max("id");
      
      return obj.id;
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



