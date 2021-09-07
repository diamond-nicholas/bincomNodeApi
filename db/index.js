const { Pool } = require('pg');

let pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.CONSTR,
    ssl: {
      rejectUnauthorized: false,
    }
  })

}else {

  pool = new Pool({
    user: 'diamond',
    host: 'localhost',
    database: 'bincom',
    password: 'newpassword',
    port: 5432,
  });
}
module.exports = {
  query: (text, params) => pool.query(text, params),
};

// var pg = require('pg');
// //or native libpq bindings
// //var pg = require('pg').native

// var conString =
//   'postgres://ybhagwwk:xcTkmmGenqjUJgUSxJsVsvrlgxzHg55D@otto.db.elephantsql.com/ybhagwwk'; //Can be found in the Details page
// var client = new pg.Client(conString);
// client.connect(function (err) {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function (err, result) {
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });
