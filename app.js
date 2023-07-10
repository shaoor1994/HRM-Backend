const Koa = require('koa');
const Router = require('koa-router');
const poool = require('./db/db'); // Import your database connection pool module
// Other imports and dependencies

const app = new Koa();
const router = new Router();

// Add your routes here
router.get('/api/teamleads', async (ctx) => {
  // Implement the logic to fetch team leads from the database
  const teamLeads = await fetchTeamLeadsFromDatabase();
  ctx.body = teamLeads; // Send the team leads as the response body
});

router.post('/api/teamleads', async (ctx) => {
  // Implement the logic to create a new team lead in the database
  const newTeamLead = ctx.request.body; // Assuming the request body contains the data for the new team lead
  await createTeamLeadInDatabase(newTeamLead);
  ctx.status = 201; // Set the HTTP status code to 201 (Created)
  ctx.body = 'Team lead created'; // Send a success message as the response body
});


const checkDatabaseConnection = async () => {
  try {
    const connection = await poool.getConnection();
    console.log('Connected to the database!');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

checkDatabaseConnection();


// Add more routes for HRProjects and Developers

// Apply the router middleware
app.use(router.routes());

// Start the server
const PORT = 3000; // Choose an appropriate port number
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
