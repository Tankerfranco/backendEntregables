const { emitKeypressEvents } = require('readline');

const Knex = require('knex').default;

const options = {
    filename: './mydb.sqlite',

}

/* const options = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'coderhouse'
} */

const knex = Knex({
    client: 'sqlite3',
    connection: options
});

const ejecutar = async () => {
    await knex.schema.dropTableIfExists('productos');
    await knex.schema.createTable('productos', table => {
        table.increments('id').primary().notNullable();
        table.string('nombre', 15).notNullable();
        table.string('codigo', 10).notNullable();
        table.float('precio');
        table.integer('stocks');
    });
    await knex('productos').insert([
        { nombre: 'Laptop', codigo: 'LAPT001', precio: 1000, stocks: 10 },
        { nombre: 'Mouse', codigo: 'MOUSE001', precio: 50, stocks: 20 },
        { nombre: 'Teclado', codigo: 'TECL001', precio: 100, stocks: 30 }
    ]);
    const rows = await knex.from('productos').select('*');
    console.log(rows);
    await knex('productos').where({'id':3}).del();
    await knex('productos').where({'id': 2}).update({'stocks': 0});
    console.log(await knex('productos').select('*'));
}

ejecutar();