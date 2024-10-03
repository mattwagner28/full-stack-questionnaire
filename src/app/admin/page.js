'use client';
import { useState, useEffect } from 'react';
import { getUserData } from "../utils/db";

export default function AdminPanel() {
  const [userData, setUserData] = useState([]);
  const [visibleUser, setVisibleUser] = useState(null);  
  const [visibleQuestionnaire, setVisibleQuestionnaire] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchData();
  }, []);

  const groupDataByUserAndQuestionnaire = (data) => {
    const groupedData = {};

    data.forEach(entry => {
      const { username, name, question, answer } = entry;

      if (!groupedData[username]) {
        groupedData[username] = {};
      }

      if (!groupedData[username][name]) {
        groupedData[username][name] = [];
      }

      groupedData[username][name].push({ question: question.question, answer });
    });

    return groupedData;
  };

  const groupedUserData = groupDataByUserAndQuestionnaire(userData);

  const toggleUserVisibility = (username) => {
    setVisibleUser(visibleUser === username ? null : username);
    setVisibleQuestionnaire(null);  
  };

  const toggleQuestionnaireVisibility = (questionnaireName) => {
    setVisibleQuestionnaire(visibleQuestionnaire === questionnaireName ? null : questionnaireName);
  };

  return (
    <div>
      <h1 className='font-bold'>ADMIN PANEL</h1>
      {Object.keys(groupedUserData).map((username) => (
        <div key={username} className="user-section">
          <h2 
            onClick={() => toggleUserVisibility(username)} 
            className='cursor-pointer hover:bg-cyan-200'
          >
            User: {username}
          </h2>

          {visibleUser === username && (
            <div className='mb-2'>
              {Object.keys(groupedUserData[username]).map((questionnaireName) => (
                <div key={questionnaireName} className="questionnaire-section">
                  <h3 
                    onClick={() => toggleQuestionnaireVisibility(questionnaireName)} 
                    className='cursor-pointe hover:bg-cyan-200'
                  >
                    Questionnaire: {questionnaireName}
                  </h3>

                  {visibleQuestionnaire === questionnaireName && (
                    <div className='mb-2'>
                      {groupedUserData[username][questionnaireName].map((qna, index) => (
                        <div key={index} className="question-answer-section">
                          <p><strong>Question:</strong> {qna.question}</p>
                          <p><strong>Answer:</strong> {Array.isArray(qna.answer) ? qna.answer.join(', ') : qna.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
