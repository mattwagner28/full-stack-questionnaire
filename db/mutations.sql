// Create new user

INSERT INTO users (username, password) 
VALUES ($1, $2);

// Update password

UPDATE users
SET password = $2
WHERE username = $1;


// if user exists, update the password just so they can login easily

UPDATE users
SET password = $2

// if answer has been submitted, update the questionnaire and the timestamp

UPDATE questionnaire_answers 
SET answer = $1, created_at = CURRENT_TIMESTAMP
WHERE user_id = $2 
AND questionnaire_id = $3 
AND question_id = $4;

// if answer has not been submitted, save a new answer
INSERT INTO questionnaire_answers (user_id, questionnaire_id, question_id, answer) 
VALUES ($1, $2, $3, $4);