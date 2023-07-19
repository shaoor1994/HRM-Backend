const { pool } = require('../../db/db');
// async function getAllTeamLeads(ctx) {
//   try {
//     await pool.connect();
//     const query = 'SELECT * FROM TeamLead';
//     const result = await pool.query(query);
//     ctx.body = result.recordset;
//     await pool.close();
//   } catch (err) {
//     console.error('Error fetching team leads:', err);
//     ctx.status = 500;
//     ctx.body = { message: 'Error fetching team leads' };
//   }
// }
async function getAllTeamLeads(ctx) {
  try {
    await pool.connect();
    const query = 'SELECT id, name FROM TeamLead'; // Select only the ID and name columns
    const result = await pool.query(query);
    ctx.body = result.recordset;
    await pool.close();
  } catch (err) {
    console.error('Error fetching team leads:', err);
    ctx.status = 500;
    ctx.body = { message: 'Error fetching team leads' };
  }
}
const addTeamLead = async (ctx) => {
  try {
    const { name, pak } = ctx.request.body;
    await pool.connect();
    // Insert the new team lead data into the database without specifying the id column
    const query = 'INSERT INTO TeamLead (name, pak) VALUES (@name, @pak)';
    const result = await pool.request().input('name', name).input('pak', pak).query(query);
    await pool.close();
    // If the insertion is successful, send a success response
    if (result.rowsAffected[0] > 0) {
      ctx.status = 201;
      ctx.body = { message: 'Team lead added successfully' };
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Failed to add team lead' };
    }
  } catch (err) {
    console.error('Error adding team lead:', err);
    ctx.status = 500;
    ctx.body = { message: 'Failed to add team lead' };
  }
};
module.exports = {
     addTeamLead,
     getAllTeamLeads
   };