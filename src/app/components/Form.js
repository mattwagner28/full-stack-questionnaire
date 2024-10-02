'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from './UserContext';

export default function Form({ data }) {
    // `questionnaire_id` is the same for all quetions in the set depending on what questionnaire was selected
    const questionnaire_id = data[0]?.questionnaire_id;
    const { usernameContext } = useUser();

    const [formData, setFormData] = useState({
        username: usernameContext,
        questionnaire_id: questionnaire_id,
        answers: []
    });

    const router = useRouter();

    const handleChange = (event, question_id, type) => {
        const { value, checked } = event.target;

        setFormData((prev) => {
            const updatedAnswers = prev.answers.map((q) => {
                if (q.question_id === question_id) {
                    if (type === 'checkbox') {
                        const answers = q.answer || [];
                        return {
                            ...q,
                            answer: checked 
                                ? [...answers, value] 
                                : answers.filter((answer) => answer !== value)
                        };
                    } else {
                        return { ...q, answer: value };
                    }
                }
                return q;
            });

            if (!updatedAnswers.some(q => q.question_id === question_id)) {
                updatedAnswers.push({ question_id, answer: type === 'checkbox' ? [value] : value });
            }

            return {
                ...prev,
                answers: updatedAnswers
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
        router.push('/questionnaires');
    };

    useEffect(() => {
        console.log('Updated formData:', formData);
    }, [formData]);

    return (
        <form style={{ marginBottom: '20px' }} onSubmit={handleSubmit}>
            {data.map((item) => (
                <div key={item.question_id} style={{ marginBottom: '20px' }}>
                    <p>{item.question.question}</p>
                    <div>
                        {item.question.type === 'mcq' ? (
                            item.question.options.map((option, index) => (
                                <div key={index}>
                                    <input 
                                        type={item.question.question.includes("Select all that apply") ? 'checkbox' : 'radio'}
                                        id={`option-${index}-${item.question_id}`} 
                                        name={`question-${item.question_id}`} 
                                        value={option}
                                        onChange={(e) => handleChange(e, item.question_id, item.question.question.includes("Select all that apply") ? 'checkbox' : 'radio')}
                                    />
                                    <label htmlFor={`option-${index}-${item.question_id}`}>{option}</label>
                                </div>
                            ))
                        ) : (
                            <input 
                                type="text" 
                                name={`question-${item.question_id}`} 
                                placeholder="Your answer here"
                                onChange={(e) => handleChange(e, item.question_id, 'text')}
                            />
                        )}
                    </div>
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    )
}
