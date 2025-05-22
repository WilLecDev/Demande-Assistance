import React, {useEffect, useState} from "react";
import { fetchItems, addQuestion, addAction } from "../api/api.js";
import ActionModal from "./actionModal.jsx";
import QuestionModal from "./questionModal.jsx";

export default function ProcessList() {
    const [items, setItems] = useState([]);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [filter, setFilter] = useState({ question: true, action: true });
    const [search, setSearch] = useState("");

    const loadData = async () => {
        const res = await fetchItems();
        setItems(res.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAddAction = async (action) => {
        await addAction(action);
        setShowActionModal(false);
        loadData();
    };

    const handleAddQuestion = async (question) => {
        await addQuestion(question);
        setShowQuestionModal(false);
        loadData();
    };

    const filteredItems = items.filter((item) => {
        const matchesTypes =
            (item.type === "question" && filter.question) ||
            (item.type === "action" && filter.action);
        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
        return matchesTypes && matchesSearch;
    });

    return(
        <div className="ridebar">
            <div className="ridebar-flex">
                <h2>Elements</h2>
                <div className="button">
                    <button onClick={() => setShowActionModal(true)}>Ajouter une Action</button>
                    <button onClick={() => setShowQuestionModal(true)}>Ajouter une Question</button>
                </div>
            </div>
            <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="filtre">
                <label>
                    <input
                        type="checkbox"
                        checked={filter.question}
                        onChange={() => setFilter((prev) => ({ ...prev, question: !prev.question }))}
                    />
                    Questions
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filter.action}
                        onChange={() => setFilter((prev) => ({ ...prev, action: !prev.action }))}
                    />
                    Actions
                </label>
        </div>
        <ul>
            {filteredItems.map((item, idx) => (
                <li key={idx}>
                    <strong>{item.type === "question" ? "?" : "⚙️"}</strong> {item.title || item.description}
                </li>
            ))}
        </ul>
        {showActionModal && <ActionModal onClose={() => setShowActionModal(false)} onAdd={handleAddAction} />}
        {showQuestionModal && <QuestionModal onClose={() => setShowQuestionModal(false)} onAdd={handleAddQuestion} />}
        </div>
        );
};