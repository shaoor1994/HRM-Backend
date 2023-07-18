const { pool } = require('../../db/db');

// Function to add a new developer to the developers table
const addDeveloper = async (ctx) => {
  try {
    const { name, stack } = ctx.request.body;

    // Open the database connection
    await pool.connect();

    // Insert the new developer data into the developers table without specifying the id column
    const query = 'INSERT INTO Developers (name, stack) VALUES (@name, @stack)';
    const result = await pool.request().input('name', name).input('stack', stack).query(query);

    // Close the database connection
    await pool.close();

    // If the insertion is successful, send a success response
    if (result.rowsAffected[0] > 0) {
      ctx.status = 201;
      ctx.body = { message: 'Developer added successfully' };
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Failed to add developer' };
    }
  } catch (err) {
    console.error('Error adding developer:', err);

    // Close the database connection in case of an error
    await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to add developer' };
  }
};

// Function to update an existing developer in the developers table
const updateDeveloper = async (ctx) => {
  try {
    const developerId = ctx.params.id;
    const { name, stack } = ctx.request.body;

    // Open the database connection
    await pool.connect();

    // Update the developer data in the developers table
    const query = 'UPDATE Developers SET name = @name, stack = @stack WHERE id = @id';
    const result = await pool.request().input('id', developerId).input('name', name).input('stack', stack).query(query);

    // Close the database connection
    await pool.close();

    // If the update is successful, send a success response
    if (result.rowsAffected[0] > 0) {
      ctx.status = 200;
      ctx.body = { message: 'Developer updated successfully' };
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Developer not found' };
    }
  } catch (err) {
    console.error('Error updating developer:', err);

    // Close the database connection in case of an error
    await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to update developer' };
  }
};

// Function to delete an existing developer from the developers table
const deleteDeveloper = async (ctx) => {
  try {
    const developerId = ctx.params.id;

    // Open the database connection
    await pool.connect();

    // Delete the developer from the developers table
    const query = 'DELETE FROM Developers WHERE id = @id';
    const result = await pool.request().input('id', developerId).query(query);

    // Close the database connection
    await pool.close();

    // If the deletion is successful, send a success response
    if (result.rowsAffected[0] > 0) {
      ctx.status = 200;
      ctx.body = { message: 'Developer deleted successfully' };
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Developer not found' };
    }
  } catch (err) {
    console.error('Error deleting developer:', err);

    // Close the database connection in case of an error
    await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to delete developer' };
  }
};

// Function to fetch all developers from the developers table
const getAllDevelopers = async (ctx) => {
  try {
    // Open the database connection
    await pool.connect();

    // Fetch all developers from the developers table
    const query = 'SELECT * FROM Developers';
    const result = await pool.request().query(query);

    // Close the database connection
    await pool.close();

    // Return the list of developers
    ctx.body = result.recordset;
  } catch (err) {
    console.error('Error fetching developers:', err);

    // Close the database connection in case of an error
    await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to fetch developers' };
  }
};

module.exports = {
  addDeveloper,
  updateDeveloper,
  deleteDeveloper,
  getAllDevelopers,
};
