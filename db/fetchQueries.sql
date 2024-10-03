//Getting questions for each questionnaire

SELECT question_id, questionnaire_id, priority, name, question
FROM questionnaire_junction
INNER JOIN questionnaire_questionnaires ON questionnaire_junction.questionnaire_id = questionnaire_questionnaires.id
INNER JOIN questionnaire_questions ON questionnaire_junction.question_id = questionnaire_questions.id
WHERE name = 'Semaglutide';

//Gets previously saved intake forms

SELECT question_id, user_id, question, username, answer, MAX(created_at) AS latest_created_at
FROM questionnaire_answers
INNER JOIN users
ON questionnaire_answers.user_id = users.id
INNER JOIN questionnaire_questions
ON questionnaire_answers.question_id = questionnaire_questions.id
WHERE user_id = 13
GROUP BY username, user_id, question_id, answer, question
ORDER BY latest_created_at DESC;