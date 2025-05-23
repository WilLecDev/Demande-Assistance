import React, { useState } from "react";
import "./styles/actionModal.css";

export default function ActionModal({ onClose, onSave }) {
    const [description, setDescription] = useState("");
    const [withQuestion, setWithQuestion] = useState(false);
    const [followup_question_text, setFollowupQuestionText] = useState("Est-ce que votre problème est résolu ?");
    const [followup_question_type, setFollowupQuestionType] = useState("yesno");

    const handleSave = async () => {
        const newAction = {
            is_question: false,
            question_text: null,
            question_type: null,
            is_action: true,
            action_description: description,
            action_result: null,
            has_followup_question: withQuestion,
            followup_question_text: withQuestion ? followup_question_text : null,
            followup_question_type: withQuestion ? followup_question_type : null,
            position: 0,
            procedures_id: 1,
};
    try {
        const response = await fetch('http://localhost:3000/api/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAction),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'enregistrement de l\'action');
        }
        const savedAction = await response.json();
        console.log("Action enregistrée :", savedAction);
        if (onSave) {
            onSave(newAction);
        }
    } catch (error) {
        console.error("Erreur :", error);
        alert("Erreur lors de l'enregistrement de l'action !");
    }
    }

    return (
        <div className="modalAction">
            <h2>Ajouter une action</h2>
            <textarea
                placeholder="Description de l'action"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={withQuestion}
                        onChange={() => setWithQuestion(!withQuestion)}
                    />
                    Avec une question
                </label>

                {withQuestion && (
                    <>
                        <input
                            placeholder="Question"
                            value={followup_question_text}
                            onChange={(e) => setFollowupQuestionText(e.target.value)}
                        />

                        <select
                            value={followup_question_type}
                            onChange={(e) => setFollowupQuestionType(e.target.value)}
                        >
                            <option value="yesno"> Oui / Non</option>
                        </select>
                    </>
                )}

                <button onClick={handleSave}>Enregistrer</button>
                <button onClick={onClose}>Annuler</button>

            </div>

        </div>
    )
};