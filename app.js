const Koa = require('koa');
const Router = require('koa-router');
const pool = require('./db/db'); // Import your database connection pool module
// Other imports and dependencies
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

// Add your routes here
router.get('/api/teamleads', async (ctx) => {
  // Implement the logic to fetch team leads from the database
  const teamLeads = await fetchTeamLeadsFromDatabase();
  ctx.body = teamLeads; // Send the team leads as the response body
});

const {
  getAllTeamLeads,
  getTeamLeadById,
  addTeamLead,
  updateTeamLead,
  deleteTeamLead,
} = require('./teamLeadController');

router.get('/teamleads', async (ctx) => {
  try {
    const teamLeads = await getAllTeamLeads();
    ctx.body = teamLeads;
  } catch (error) {
    console.error('Failed to fetch team leads:', error);
    ctx.status = 500;
    ctx.body = 'Failed to fetch team leads.';
  }
});


// router.post('/api/teamleads', async (ctx) => {
//   // Implement the logic to create a new team lead in the database
//   const newTeamLead = ctx.request.body; // Assuming the request body contains the data for the new team lead
//   await createTeamLeadInDatabase(newTeamLead);
//   ctx.status = 201; // Set the HTTP status code to 201 (Created)
//   ctx.body = 'Team lead created'; // Send a success message as the response body
// });

router.post('/teamlead', async (ctx) => {
  const { name, pakno } = ctx.request.body;

  const query = `INSERT INTO teamlead (name, pakno) VALUES ('${name}', '${pakno}')`;

  try {
    const pool = await sql.connect(config);
    const result = await pool.query(query);

    ctx.body = 'Data inserted successfully.';
  } catch (error) {
    console.error('Failed to insert data:', error);
    ctx.status = 500;
    ctx.body = 'Failed to insert data.';
  }
});


router.get('/teamleads', async (ctx) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.query('SELECT * FROM teamlead');

    ctx.body = result.recordset;
  } catch (error) {
    console.error('Failed to fetch team lead data:', error);
    ctx.status = 500;
    ctx.body = 'Failed to fetch team lead data.';
  }
});


router.put('/teamleads/:id', async (ctx) => {
  const teamLeadId = ctx.params.id;
  const { name, pakno } = ctx.request.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.query(`UPDATE teamlead SET name = '${name}', pakno = '${pakno}' WHERE id = ${teamLeadId}`);

    ctx.body = 'Team lead data updated successfully.';
  } catch (error) {
    console.error('Failed to update team lead data:', error);
    ctx.status = 500;
    ctx.body = 'Failed to update team lead data.';
  }
});


router.delete('/teamleads/:id', async (ctx) => {
  const teamLeadId = ctx.params.id;

  try {
    const pool = await sql.connect(config);
    const result = await pool.query(`DELETE FROM teamlead WHERE id = ${teamLeadId}`);

    ctx.body = 'Team lead data deleted successfully.';
  } catch (error) {
    console.error('Failed to delete team lead data:', error);
    ctx.status = 500;
    ctx.body = 'Failed to delete team lead data.';
  }
});


// Add more routes for HRProjects and Developers

// Apply the router middleware
app.use(router.routes());
app.use(router.routes()).use(router.allowedMethods());
// Start the server
const PORT = 3000; // Choose an appropriate port number
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
