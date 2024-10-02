'use server';

import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  
  export async function getQuestionnaires() {
    const query = 'SELECT * FROM questionnaire_questionnaires'; 
    const { rows } = await pool.query(query);
    return rows;
  }

  export async function getQuestions(name) {
    const query = `
    SELECT question_id, questionnaire_id, priority, name, question 
    FROM questionnaire_junction 
    INNER JOIN questionnaire_questionnaires ON questionnaire_junction.questionnaire_id = questionnaire_questionnaires.id 
    INNER JOIN questionnaire_questions ON questionnaire_junction.question_id = questionnaire_questions.id 
    WHERE name = $1
    ORDER BY priority ASC;
    `;
    const { rows } = await pool.query(query, [name]);
    return rows;
  }

  export async function createOrUpdateUser(formData) {
    const { username, password } = formData;
  
    try {
      // Checks if username already exists in database
      const checkUserQuery = `
        SELECT * FROM users WHERE username = $1;
      `;
      const { rows } = await pool.query(checkUserQuery, [username]);
  
      if (rows.length > 0) {
        // If the username exists, update the password
        const updatePasswordQuery = `
          UPDATE users
          SET password = $2
          WHERE username = $1;
        `;
        await pool.query(updatePasswordQuery, [username, password]);
        return { message: 'Password updated successfully' };
      } else {
        // If the username does not exist, it creates a new user
        const createUserQuery = `
          INSERT INTO users (username, password)
          VALUES ($1, $2);
        `;
        await pool.query(createUserQuery, [username, password]);
        return { message: 'User created successfully' };
      }
  
    } catch (error) {
      console.error('Error creating or updating user:', error);
      return { message: 'Error creating or updating user. Please try again.' };
    }
  }
  