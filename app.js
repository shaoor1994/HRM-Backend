const Koa = require('koa');
const Router = require('koa-router');
const pool = require('./db/db'); // Import your database connection pool module
// Other imports and dependencies
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const teamleadController = require('./src/controllers/teamlead.controllers');
const projectsController = require('./src/controllers/projects.controllers');
const developerController = require('./src/controllers/developers.controllers');
const { connectDB } = require('./db/db');
app.use(bodyParser());
// Routes for team leads
app.use(async (ctx, next) => {
  if (ctx.method === 'GET' && ctx.path === '/api/teamleads') {
    await teamleadController.getAllTeamLeads(ctx);
  } else if (ctx.method === 'POST' && ctx.path === '/api/teamleads') {
    await teamleadController.addTeamLead(ctx);
  } else {
    await next(); // Continue to the next middleware if the route is not found
  }
});

// Routes for projects
app.use(async (ctx, next) => {
  if (ctx.method === 'GET' && ctx.path === '/api/projects') {
    await projectsController.getAllProjects(ctx);
  } else if (ctx.method === 'POST' && ctx.path === '/api/projects') {
    await projectsController.addProject(ctx);
  } else if (ctx.method === 'PUT' && ctx.path.startsWith('/api/projects/')) {
    await projectsController.updateProject(ctx);
  } else if (ctx.method === 'DELETE' && ctx.path.startsWith('/api/projects/')) {
    await projectsController.deleteProject(ctx);
  } else {
    await next(); // Continue to the next middleware if the route is not found
  }
});

// Routes for developers
app.use(async (ctx, next) => {
  if (ctx.method === 'GET' && ctx.path === '/api/developers') {
    await developerController.getAllDevelopers(ctx);
  } else if (ctx.method === 'POST' && ctx.path === '/api/developers') {
    await developerController.addDeveloper(ctx);
  } else if (ctx.method === 'PUT' && ctx.path.startsWith('/api/developers/')) {
    await developerController.updateDeveloper(ctx);
  } else if (ctx.method === 'DELETE' && ctx.path.startsWith('/api/developers/')) {
    await developerController.deleteDeveloper(ctx);
  } else {
    await next(); // Continue to the next middleware if the route is not found
  }
});
app.use(router.routes());
app.use(router.routes()).use(router.allowedMethods());
// Start the server
const PORT = 5000; // Choose an appropriate port number
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
