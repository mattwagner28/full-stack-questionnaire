// Create new user

INSERT INTO users (username, password) 
VALUES ($1, $2);

// Update password

UPDATE users
SET password = $2
WHERE username = $1;

// Save intake form
INSERT INTO questionnaire_submissions (user_id, questionnaire_id, answers)
VALUES ($1, $2, $3);