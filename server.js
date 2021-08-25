require('dotenv').config();
const db = require('./db');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

//this gets all the polling units
app.get('/api/v1/pu', async (req, res) => {
  try {
    const pu = await db.query('SELECT * FROM polling_unit');
    res.status(200).json({
      status: 'success',
      data: { pollingUnits: pu },
    });
  } catch (err) {
    console.log(err);
  }
});

//this gets individual polling unit
app.get('/api/v1/pu/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM polling_unit WHERE polling_unit_id = $1',
      [req.params.id]
    );
    res.status(200).json({
      status: 'success',
      data: { individualPu: result },
    });
  } catch (err) {
    console.log(err);
  }

  // console.log(req.params);
});

//this gets the sum total of all results of all polling unit
// app.get('/api/v1/sumPu', (req, res) => {
//   res.json({
//     status: 'success',
//     data: { total: 250 },
//   });
// });

//this stores the result of all parties for a new polling unit

// app.post('/api/v1/result', async (req, res) => {
//   try {
//     console.log(req.body);
//     const results = await db.query(
//       'INSERT INTO announced_pu_results (result_id, polling_unit_uniqueid, party_abbreviation, party_score, entered_by_user, date_entered, user_ip_address) VALUES ($1,$2,$3,$4,$5,$6,$7)',
//       [
//         req.params.id,
//         req.body.state,
//         req.body.party_abbreviation,
//         req.body.party_score,
//         req.body.entered_by_user,
//         req.body.date_entered,
//         req.body.user_ip_address,
//       ]
//     );
//     console.log(results);
//     res.status(200).json({
//       status: 'success',
//       data: { pollingUnits: results },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
