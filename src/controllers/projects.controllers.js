const { pool } = require('../../db/db');

// Function to add a new project to the projects table
const addProject = async (ctx) => {
  try {
    const { projectname, developername } = ctx.request.body;

    // Open the database connection
    await pool.connect();

    // Insert the new project data into the projects table without specifying the id column
    const query = 'INSERT INTO Projects (projectname, developername) VALUES (@projectname, @developername)';
    const result = await pool.request().input('projectname', projectname).input('developername', developername).query(query);

    // Close the database connection
    await pool.close();

    // If the insertion is successful, send a success response
    if (result.rowsAffected[0] > 0) {
      ctx.status = 201;
      ctx.body = { message: 'Project added successfully' };
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Failed to add project' };
    }
  } catch (err) {
    console.error('Error adding project:', err);

    // Close the database connection in case of an error
    await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to add project' };
  }
};

// Function to update an existing project in the projects table
const updateProject = async (ctx) => {
  try {
    const projectId = ctx.params.id;
    const { projectname, developername } = ctx.request.body;

    // Open the database connection
    await pool.connect();

    // Update the project data in the projects table
    const query = 'UPDATE Projects SET projectname = @projectname, developername = @developername WHERE id = @id';
    const result = await pool.request().input('id', projectId).input('projectname', projectname).input('developername', developername).query(query);

    // Close the database connection
    await pool.close();

    // If the update is successful, send a success response
    if (result.rowsAffected[0] > 0) {
      ctx.status = 200;
      ctx.body = { message: 'Project updated successfully' };
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Project not found' };
    }
  } catch (err) {
    console.error('Error updating project:', err);

    // Close the database connection in case of an error
    await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to update project' };
  }
};

// Function to delete an existing project from the projects table
const deleteProject = async (ctx) => {
  try {
    const projectId = ctx.params.id;

    // Open the database connection
    await pool.connect();

    // Delete the project from the projects table
    const query = 'DELETE FROM Projects WHERE id = @id';
    const result = await pool.request().input('id', projectId).query(query);

    // Close the database connection
    await pool.close();

    // If the deletion is successful, send a success response
    if (result.rowsAffected[0] > 0) {
      ctx.status = 200;
      ctx.body = { message: 'Project deleted successfully' };
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Project not found' };
    }
  } catch (err) {
    console.error('Error deleting project:', err);

    // Close the database connection in case of an error
    await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to delete project' };
  }
};

// Function to fetch all projects from the projects table
const getAllProjects = async (ctx) => {
  try {
    // Open the database connection
    await pool.connect();

    // Fetch all projects from the projects table
    const query = 'SELECT * FROM Projects';
    const result = await pool.request().query(query);

    // Close the database connection
    await pool.close();

    // Return the list of projects
    ctx.body = result.recordset;
  } catch (err) {
    console.error('Error fetching projects:', err);

    // Close the database connection in case of an error
    await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to fetch projects' };
  }
};

module.exports = {
  addProject,
  updateProject,
  deleteProject,
  getAllProjects,
};