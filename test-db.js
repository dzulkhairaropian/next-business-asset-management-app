const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection("mysql://root:@127.0.0.1:3306/db_business_asset_management_app");
  try {
    const [assets] = await connection.query('SELECT * FROM assets LIMIT 5');
    console.log('ASSETS SAMPLE:', JSON.stringify(assets, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2));

    const [products] = await connection.query('SELECT * FROM products LIMIT 5');
    console.log('PRODUCTS SAMPLE:', JSON.stringify(products, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2));

    const [statuses] = await connection.query('SELECT * FROM statuses LIMIT 5');
    console.log('STATUSES SAMPLE:', JSON.stringify(statuses, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2));

    const [departments] = await connection.query('SELECT * FROM departments LIMIT 5');
    console.log('DEPARTMENTS SAMPLE:', JSON.stringify(departments, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2));

    const [users] = await connection.query('SELECT * FROM users LIMIT 5');
    console.log('USERS SAMPLE:', JSON.stringify(users, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2));

  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

main();
