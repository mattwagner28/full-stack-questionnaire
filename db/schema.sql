	CREATE TABLE questionnaire_questionnaires (
	  id SERIAL PRIMARY KEY,
	  name varchar(50) NOT NULL UNIQUE,
	  );
	INSERT INTO questionnaire_questionnaires (name) 
	VALUES 
	  ('semaglutide'),
	  ('nad-injection'),
	  ('metformin');

	  //
      
	  CREATE TABLE questionnaire_questions (
	    id SERIAL PRIMARY KEY,
	    question JSONB NOT NULL
	  );
	  INSERT INTO questionnaire_questions (question) 
	  VALUES 
	    ('{
	      "type": "mcq",
	      "options": [
	      "Improve blood pressure",
	      "Reduce risk of future cardiac events",
	      "Support lifestyle changes",
	      "Longevity benefits"
	      ],
	      "question": "Why are you interested in this product? Select all that apply."
	    }'),
	    ('{
	      "type": "input",
	      "question": "Tell us anything else you’d like your provider to know when prescribing your medication."
	    }'),
	    ('{
	      "type": "input",
	      "question": "What is your current weight?"
	    }'),
	    ('{
	      "type": "mcq",
	      "options": [
	      "Keto or low carb",
	      "Plant-based",
	      "Macro or calorie counting",
	      "Weight Watchers",
	      "Noom",
	      "Calibrate",
	      "Found",
	      "Alpha",
	      "Push Health"
	      ],
	      "question": "Which of the following have you tried in the past? Select all that apply."
	    }'),
	    ('{
	      "type": "mcq",
	      "options": [
	      "Losing 1-15 pounds",
	      "Losing 16-50 pounds",
	      "Losing 51+ pounds",
	      "Not sure, I just need to lose weight"
	      ],
	      "question": "What’s your weight loss goal?"
	    }'),
	    ('{
	      "type": "input",
	      "question": "Please list any new medications you are taking."
	    }');

	  //

	  CREATE TABLE questionnaire_junction (
	    id SERIAL PRIMARY KEY,
	    question_id INT REFERENCES questionnaire_questions (id),
	    questionnaire_id INT REFERENCES questionnaire_questionnaires (id),
	    priority INT NOT NULL
	  );

	  INSERT INTO questionnaire_junction (question_id, questionnaire_id, priority)
	  VALUES
	    (1, 1, 0),
	    (2, 1, 10),
	    (4, 1, 20),
	    (1, 2, 0),
	    (2, 2, 10),
	    (3, 2, 20),
	    (1, 3, 0),
	    (5, 3, 10),
	    (6, 3, 20);

	  //

	  CREATE TABLE users (
	    id SERIAL PRIMARY KEY,
	    username varchar(50),
	    password varchar(100)
	  );

	  //
	  
CREATE TABLE questionnaire_answers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    question_id INT REFERENCES questionnaire_questions(id),
    questionnaire_id INT REFERENCES questionnaire_questionnaires(id),
    answer JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
