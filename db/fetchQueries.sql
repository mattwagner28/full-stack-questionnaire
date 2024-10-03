//Getting questions for each questionnaire

SELECT question_id, questionnaire_id, priority, name, question
FROM questionnaire_junction
INNER JOIN questionnaire_questionnaires ON questionnaire_junction.questionnaire_id = questionnaire_questionnaires.id
INNER JOIN questionnaire_questions ON questionnaire_junction.question_id = questionnaire_questions.id
WHERE name = 'Semaglutide';

//Gets previously saved intake forms

SELECT user_id, questionnaire_id, answers, username 
FROM questionnaire_submissions
INNER JOIN users
ON questionnaire_submissions.user_id = users.id
WHERE username = $1;
