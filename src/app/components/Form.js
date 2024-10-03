'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from './UserContext';
import { saveIntakeForm, getPreviousSubmission } from '../utils/db';

export default function Form({ data }) {
    const questionnaire_id = data[0]?.questionnaire_id;
    const questionIDs = data.map((item) => item.question_id);
    const { usernameContext } = useUser();

    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleChange = (event, question_id, type) => {
        const { value, checked } = event.target;

        setAnswers((prev) => {
            let updatedAnswers = [...prev];
            const existingAnswerIndex = updatedAnswers.findIndex(
                (answerObj) => answerObj.question_id === question_id
            );

            if (type === 'checkbox') {
                const answersArray = existingAnswerIndex !== -1
                    ? updatedAnswers[existingAnswerIndex].answer || []
                    : [];

                const updatedAnswer = checked
                    ? [...answersArray, value]
                    : answersArray.filter((answer) => answer !== value);

                if (existingAnswerIndex !== -1) {
                    updatedAnswers[existingAnswerIndex] = { question_id, answer: updatedAnswer };
                } else {
                    updatedAnswers.push({ question_id, answer: updatedAnswer });
                }
            } else {
                const updatedAnswer = value;
                if (existingAnswerIndex !== -1) {
                    updatedAnswers[existingAnswerIndex] = { question_id, answer: updatedAnswer };
                } else {
                    updatedAnswers.push({ question_id, answer: updatedAnswer });
                }
            }

            return updatedAnswers;
        });
    };

    useEffect(() => {
        const getSavedAnswers = async () => {
            const previousAnswers = await getPreviousSubmission(usernameContext);
            if (previousAnswers) {
                // filters previous answers so only those matching questionIDs from questionnaire are set
                const filteredAnswers = previousAnswers.filter((answer) =>
                    questionIDs.includes(answer.question_id)
                );
                setAnswers(filteredAnswers);
            }
        };

        getSavedAnswers();
    }, [questionnaire_id, usernameContext]);

    const handleSubmit = (event) => {
        event.preventDefault();

        setError(null);

        // validate that no answers are empty or only whitespace
        const hasEmptyAnswers = questionIDs.some((questionId) => {
            const answerObj = answers.find((a) => a.question_id === questionId);
            const answer = answerObj ? answerObj.answer : null;

            if (Array.isArray(answer)) {
                return answer.length === 0;
            }
            return !answer || answer.trim() === '';
        });

        if (hasEmptyAnswers) {
            setError('Please fill out all fields. Answers cannot be empty.');
            return;
        }

        const finalSubmission = {
            username: usernameContext,
            questionnaire_id,
            answers,
        };

        // console.log('Form submitted:', finalSubmission);

        saveIntakeForm(finalSubmission);
        router.push('/questionnaires');
    };

    return (
        <form className='mb-20' onSubmit={handleSubmit}>
            {error && <p className='text-red-500'>{error}</p>}
            {data.map((item) => (
                <div key={item.question_id} className='mb-10'>
                    <p>{item.question.question}</p>
                    <div>
                        {item.question.type === 'mcq' ? (
                            item.question.options.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type={item.question.question.includes('Select all that apply') ? 'checkbox' : 'radio'}
                                        id={`option-${index}-${item.question_id}`}
                                        name={`question-${item.question_id}`}
                                        value={option}
                                        checked={Array.isArray(answers.find((a) => a.question_id === item.question_id)?.answer)
                                            ? answers.find((a) => a.question_id === item.question_id)?.answer.includes(option)
                                            : answers.find((a) => a.question_id === item.question_id)?.answer === option}
                                        onChange={(e) => handleChange(e, item.question_id, item.question.question.includes('Select all that apply') ? 'checkbox' : 'radio')}
                                    />
                                    <label htmlFor={`option-${index}-${item.question_id}`}>{option}</label>
                                </div>
                            ))
                        ) : (
                            <input
                                type='text'
                                name={`question-${item.question_id}`}
                                placeholder='Your answer here'
                                value={answers.find((a) => a.question_id === item.question_id)?.answer || ''}
                                onChange={(e) => handleChange(e, item.question_id, 'text')}
                            />
                        )}
                    </div>
                </div>
            ))}
            <button type='submit'>Submit</button>
        </form>
    );
}
