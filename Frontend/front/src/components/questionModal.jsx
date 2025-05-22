import React, { useState } from "react";

export default function QuestionModal({ onClose, onSave }) {
    const [questionType, setQuestionType] = useState("yesno");
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState(["", ""]);

    const handleAddOption = () => setOptions([...options, ""]);
    const handleChangeOption = (index, value) => {
        const updated = [...options];
        updated[index] = value;
        setOptions(updated);
    };

    const handleSave = async () => {
        const newQuestion = {
            is_question: true,
            question_text: questionText,
            question_type: questionType,
            is_action: false,
            action_description: null,
            action_result: null,
            has_followup_question: false,
            followup_question_text: null,
            followup_question_type: null,
            position: 0,
            procedures_id: 1,
            options: questionType === "qcu" ? options.filter((opt) => opt) : null,
        };

        try {
            const response = await fetch('http://localhost:3000/api/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuestion),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'enregistrement de la question');
            }
            const savedQuestion = await response.json();
            console.log("Question enregistrée :", savedQuestion);
            if (onSave) {
                onSave(newQuestion);
            }
            
    } catch (error) {
            console.error("Erreur :", error);
            alert("Erreur lors de l'enregistrement de la question !");
    }
    };

    return (
        <div className="modal">
            <h2>Ajouter une question</h2>
            <input
                placeholder="Question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
            />

            <div>
                <label>
                    <input
                        type="radio"
                        checked={questionType === "yesno"}
                        onChange={() => setQuestionType("yesno")} 
                    />
                    Question Oui/Non
                </label>
                <label>
                    <input
                        type="radio"
                        checked={questionType === "qcu"}
                        onChange={() => setQuestionType("qcu")} 
                    />
                    Question à Choix Unique
                </label>
            </div>
            {questionType === "qcu" &&
                options.map((opt, index) => (
                    <input
                        key={index}
                        placeholder={`Option ${index + 1}`}
                        value={opt}
                        onChange={(e) => handleChangeOption(index, e.target.value)}
                    />
                ))}
                {questionType === "qcu" && <button onClick={handleAddOption}>+ Ajouter une option</button>}
                <button onClick={handleSave}>Enregistrer</button>
                <button onClick={onClose}>Annuler</button>
        </div>
    );

    

};