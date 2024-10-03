'use server';

import { Pool } from 'pg';

const pool = new Pool({
connectionString: process.env.EXTERNAL_DB_URL,
ssl: { rejectUnauthorized: false }
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

  export async function getPreviousSubmission(username) {

    //will check to see user's previously saved answers, by newest verson of answer
    try {
      const checkForSubmissionsQuery = `
        SELECT 
            qa.question_id,
            qa.user_id,
            u.username,
            qa.answer,
            qa.created_at
        FROM 
            questionnaire_answers qa
        INNER JOIN 
            users u ON qa.user_id = u.id
        WHERE 
            qa.created_at = (
                SELECT MAX(created_at)
                FROM questionnaire_answers
                WHERE question_id = qa.question_id
                AND user_id = qa.user_id
            )
        AND 
            u.username = $1
        ORDER BY 
            qa.created_at DESC;

      `
      const { rows } = await pool.query(checkForSubmissionsQuery, [username])
      if (rows.length > 0) {
        return rows
      } else {
        null
      }
    } catch (error) {

    }
  }



  //This is just a temporary non-authenticating login function for simplificaiton of testing the app
  export async function createOrUpdateUser(formData) {
    const { username, password } = formData;
    try {
      // check if user already exists
      const checkUserQuery = `
        SELECT * FROM users WHERE username = $1;
      `;
      const { rows } = await pool.query(checkUserQuery, [username]);
  
      if (rows.length > 0) {
        // if user exists, update the password just so they can login easily
        const updatePasswordQuery = `
          UPDATE users
          SET password = $2
          WHERE username = $1;
        `;
        await pool.query(updatePasswordQuery, [username, password]);
        return { message: 'Password updated successfully' };
      } else {
        // if user does not exist, create a new user
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


  
export async function saveIntakeForm(formData) {
    const { username, questionnaire_id, answers } = formData;

    try {
        // get user ID for saving to the database
        const userQuery = `
            SELECT id FROM users WHERE username = $1;
        `;
        const { rows: userRows } = await pool.query(userQuery, [username]);

        if (userRows.length === 0) {
            return { message: 'User not found' };
        }

        const userId = userRows[0].id;

        // loop through each answer
        for (let answerObj of answers) {
            const { question_id, answer } = answerObj;

            // check if answer has been submitted
            const checkQuery = `
                SELECT * FROM questionnaire_answers 
                WHERE user_id = $1 
                AND questionnaire_id = $2 
                AND question_id = $3;
            `;
            const { rows: existingAnswerRows } = await pool.query(checkQuery, [userId, questionnaire_id, question_id]);

            if (existingAnswerRows.length > 0) {
                // ff answer has been submitted, update the answer and the timestamp
                const updateQuery = `
                    UPDATE questionnaire_answers 
                    SET answer = $1, created_at = CURRENT_TIMESTAMP
                    WHERE user_id = $2 
                    AND questionnaire_id = $3 
                    AND question_id = $4;
                `;
                await pool.query(updateQuery, [JSON.stringify(answer), userId, questionnaire_id, question_id]);
            } else {
                // if answer has not been submitted, save a new answer
                const insertQuery = `
                    INSERT INTO questionnaire_answers (user_id, questionnaire_id, question_id, answer) 
                    VALUES ($1, $2, $3, $4);
                `;
                await pool.query(insertQuery, [
                    userId,
                    questionnaire_id,
                    question_id,
                    JSON.stringify(answer) 
                ]);
            }
        }

        return { message: 'Answers saved successfully' };
    } catch (error) {
        console.error('Error saving intake form:', error);
        return { message: 'Error saving intake form. Please try again.' };
    }
}
