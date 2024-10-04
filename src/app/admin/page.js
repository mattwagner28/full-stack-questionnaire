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
    <div className="w-4/5 py-8 px-4">
      <h1 className="text-4xl font-bold text-cyan-600 text-center mb-4">ADMIN PANEL</h1>
      
      <h2 className="text-2xl font-bold text-cyan-600 mb-4">Users</h2>
      {Object.keys(groupedUserData).map((username) => (
        <div key={username} className="bg-white shadow-md rounded-lg mb-4 p-4">
          <h2 
            onClick={() => toggleUserVisibility(username)} 
            className="text-lg font-semibold text-cyan-700 cursor-pointer p-1 rounded transition"
          >
            {username}
          </h2>

          {visibleUser === username && (
            <div className="pl-6 mt-4">
              <h2 className="text-md font-bold text-cyan-600 mb-4">Questionnaires Completed</h2>
              {Object.keys(groupedUserData[username]).map((questionnaireName) => (
                <div key={questionnaireName} className="bg-gray-50 border-l-4 border-cyan-400 rounded-lg p-2 mb-4">
                  <h3 
                    onClick={() => toggleQuestionnaireVisibility(questionnaireName)} 
                    className="text-md font-medium text-cyan-600 cursor-pointer p-2 rounded transition"
                  >
                    {questionnaireName}
                  </h3>

                  {visibleQuestionnaire === questionnaireName && (
                    <div className="mt-2 pl-4">
                      {groupedUserData[username][questionnaireName].map((qna, index) => (
                        <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow">
                          <p className="text-gray-800"><strong>Question:</strong> {qna.question}</p>
                          <p className="text-gray-600"><strong>Answer:</strong> {Array.isArray(qna.answer) ? qna.answer.join(', ') : qna.answer}</p>
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
