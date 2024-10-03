//Getting questions for each questionnaire

SELECT question_id, questionnaire_id, priority, name, question
FROM questionnaire_junction
INNER JOIN questionnaire_questionnaires ON questionnaire_junction.questionnaire_id = questionnaire_questionnaires.id
INNER JOIN questionnaire_questions ON questionnaire_junction.question_id = questionnaire_questions.id
WHERE name = 'Semaglutide';

//Gets previously saved intake forms to render back to forms

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

//Gets user data for admin panel

      SELECT question_id, user_id, question, username, answer, name, questionnaire_id, MAX(created_at) AS latest_created_at
      FROM questionnaire_answers
      INNER JOIN users
      ON questionnaire_answers.user_id = users.id
      INNER JOIN questionnaire_questions
      ON questionnaire_answers.question_id = questionnaire_questions.id
      INNER JOIN questionnaire_questionnaires
      ON questionnaire_answers.questionnaire_id = questionnaire_questionnaires.id
      GROUP BY username, user_id, question_id, answer, question, questionnaire_id, name
      ORDER BY user_id;

            