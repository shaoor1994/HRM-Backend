const sql = require('mssql');

const pool = require('../db/db.js');
const getAllTeamLeads = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.query('SELECT * FROM teamlead');
    return result.recordset;
  } catch (error) {
    console.error('Failed to fetch team leads:', error);
    throw error;
  }
};

const getTeamLeadById = async (id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.query(`SELECT * FROM teamlead WHERE id = ${id}`);
    return result.recordset[0];
  } catch (error) {
    console.error(`Failed to fetch team lead with id ${id}:`, error);
    throw error;
  }
};

const addTeamLead = async (teamLeadData) => {
  try {
    const pool = await sql.connect(config);
    const { name, pakno } = teamLeadData;
    const result = await pool.query(`INSERT INTO teamlead (name, pakno) VALUES ('${name}', '${pakno}')`);
    return result;
  } catch (error) {
    console.error('Failed to insert team lead:', error);
    throw error;
  }
};

const updateTeamLead = async (id, updatedData) => {
  try {
    const pool = await sql.connect(config);
    const { name, pakno } = updatedData;
    const result = await pool.query(`UPDATE teamlead SET name = '${name}', pakno = '${pakno}' WHERE id = ${id}`);
    return result;
  } catch (error) {
    console.error(`Failed to update team lead with id ${id}:`, error);
    throw error;
  }
};

const deleteTeamLead = async (id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.query(`DELETE FROM teamlead WHERE id = ${id}`);
    return result;
  } catch (error) {
    console.error(`Failed to delete team lead with id ${id}:`, error);
    throw error;
  }
};

module.exports = {
  getAllTeamLeads,
  getTeamLeadById,
  addTeamLead,
  updateTeamLead,
  deleteTeamLead,
};
