const { pool } = require('../../db/db');

// Function to add a new project to the projects table
const addProject = async (ctx) => {
  try {
    const { projectname, developername,teamleadname } = ctx.request.body;

    // Open the database connection
    await pool.connect();

    // Insert the new project data into the projects table without specifying the id column
    const query = 'INSERT INTO Projects (projectname, developername,teamleadname) VALUES (@projectname, @developername,@teamleadname)';
    const result = await pool.request().input('projectname', projectname).input('developername', developername).input('teamleadname',teamleadname).query(query);

    // Close the database connection
    // await pool.close();

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
    // await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to add project' };
  }
};

// Function to update an existing project in the projects table
const updateProject = async (ctx) => {
  try {
    const projectId = ctx.params.id;
    const { projectname, developername,teamleadname } = ctx.request.body;

    // Open the database connection
    await pool.connect();

    // Update the project data in the projects table
    const query = 'UPDATE Projects SET projectname = @projectname, developername = @developername,teamleadname = @teamleadname WHERE id = @id';
    const result = await pool.request().input('id', projectId).input('projectname', projectname).input('developername', developername).input('teamleadname', teamleadname).query(query);

    // Close the database connection
    // await pool.close();

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
    // await pool.close();

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
    // await pool.close();

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
    // await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to delete project' };
  }
};

const getProjectById = async (ctx) => {
  try {
    // Get the project ID from the request URL (assuming the ID is part of the URL)
    const projectId = parseInt(ctx.params.id);

    // Open the database connection
    await pool.connect();

    // Fetch the project from the projects table based on its ID
    const query = 'SELECT * FROM Projects WHERE id = @projectId';
    const result = await pool.request().input('projectId', projectId).query(query);

    // Close the database connection
    // await pool.close();

    // If a project is found, return it. Otherwise, return 404 status code.
    if (result.recordset.length > 0) {
      ctx.body = result.recordset[0];
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Project not found' };
    }
  } catch (err) {
    console.error('Error fetching project by ID:', err);

    // Close the database connection in case of an error
    // await pool.close();

    ctx.status = 500;
    ctx.body = { message: 'Failed to fetch project by ID' };
  }
};


// Function to fetch all projects from the projects table
// const getAllProjects = async (ctx) => {
//   try {
//     // Open the database connection
//     await pool.connect();

//     // Fetch all projects from the projects table
//     const query = 'SELECT * FROM Projects';
//     const result = await pool.request().query(query);

//     // Close the database connection
//     await pool.close();

//     // Return the list of projects
//     ctx.body = result.recordset;
//   } catch (err) {
//     console.error('Error fetching projects:', err);

//     // Close the database connection in case of an error
//     await pool.close();

//     ctx.status = 500;
//     ctx.body = { message: 'Failed to fetch projects' };
//   }
// };
// const getAllProjects = async (ctx) => {
//   try {
//     // Get query parameters for pagination (page number and page size)
//     const { page = 1, pageSize = 10 } = ctx.query;
//     const offset = (page - 1) * pageSize;

//     // Open the database connection
//     await pool.connect();

//     // Fetch paginated projects from the projects table
//     const query = 'SELECT * FROM Projects ORDER BY id OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY';
//     const result = await pool.request()
//       .input('offset', offset)
//       .input('pageSize', pageSize)
//       .query(query);

//     // Close the database connection
//     await pool.close();

//     // Return the paginated projects and total count
//     ctx.body = {
//       projects: result.recordset,
//       totalCount: result.recordset.length,
//     };
//   } catch (err) {
//     console.error('Error fetching projects:', err);

//     // Close the database connection in case of an error
//     await pool.close();

//     ctx.status = 500;
//     ctx.body = { message: 'Failed to fetch projects' };
//   }
// };
const getAllProjects = async (ctx) => {
  try {
    await pool.connect();
    const { page = 1, itemsPerPage = 10 } = ctx.request.query;
    // await pool.connect();
    // const query = `
    //   SELECT *
    //   FROM Projects
    //   ORDER BY id
    //   OFFSET ${(page - 1) * itemsPerPage} ROWS
    //   FETCH NEXT ${itemsPerPage} ROWS ONLY
    // `;

    const query = `
    SELECT P.*, TL.name AS teamLeadName
    FROM Projects AS P
    LEFT JOIN TeamLead AS TL ON P.teamleadname = TL.id
    ORDER BY P.id
    OFFSET ${(page - 1) * itemsPerPage} ROWS
    FETCH NEXT ${itemsPerPage} ROWS ONLY
  `;

    const result = await pool.query(query);


    const countQuery = 'SELECT COUNT(*) AS totalProjects FROM Projects';
    const countResult = await pool.query(countQuery);
    const totalPages = Math.ceil(countResult.recordset[0].totalProjects / itemsPerPage);

    ctx.body = { projects: result.recordset, totalPages };
    // await pool.close();
  } catch (err) {
    console.error('Error fetching projects:', err);
    ctx.status = 500;
    ctx.body = { message: 'Error fetching projects' };
  }
};

// const getAllProjects = async (ctx) => {
//   try {
//     await pool.connect();
//     const query = 'SELECT p.*, t.name AS teamLeadName FROM Projects p LEFT JOIN TeamLead t ON p.teamLeadId = t.id';
//     const result = await pool.query(query);
//     ctx.body = result.recordset;
//     await pool.close();
//   } catch (err) {
//     console.error('Error fetching projects:', err);
//     await pool.close();
//     ctx.status = 500;
//     ctx.body = { message: 'Failed to fetch projects' };
//   }
// };

module.exports = {
  addProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById
};
