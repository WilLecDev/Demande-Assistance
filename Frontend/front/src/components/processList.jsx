import React, {useEffect, useState} from "react";
import ActionModal from "./actionModal.jsx";
import QuestionModal from "./questionModal.jsx";
import "../styles/processList.css";

export default function ProcessList() {
    const [items, setItems] = useState([]);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [filter, setFilter] = useState({ question: true, action: true });
    const [search, setSearch] = useState("");

   const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/process");
      const data = await res.json();
      console.log("Data fetched:", data);

      const transformed = data.map((item) => {
        let type = "";
        let title = "";
        let description = "";

        if (item.is_question) {
          type = "question";
          title = item.question_text || "";
          description = item.question_type || "";
        } else if (item.is_action) {
          type = "action";
          title = item.action_description || "";
          description = item.action_result ? "Succès" : "Échec";
        }

        return {
          ...item,
          type,
          title,
          description
        };
      });

      setItems(transformed);
    } catch (error) {
      console.error("Erreur lors du chargement des éléments :", error);
    }
};


    const addQuestion = async (question) => {
  try {
    const res = await fetch("http://localhost:3000/api/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    
    if (!res.ok) throw new Error("Erreur lors de l'ajout");

    const result = await res.json();

    const newItemQuestion = {
      ...question,
      id: result.id,        
      type: "question",
      title: question.question_text || "",
      description: question.question_type || "",
    };

    setItems((prevItems) => [...prevItems, newItemQuestion]);
    setShowQuestionModal(false);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la question :", error);
  }
};


    const addAction = async (action) => {
        try {
            await fetch("http://localhost:3000/api/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(action),
            });
            const result = await res.json();
            if (!res.ok) throw new Error("Erreur lors de l'ajout");
            fetchItems();

            const newItemAction = {
            ...action,
            id: result.id,        
            type: "action",
            title: question.question_text || "",
            description: question.question_type || "",
            };
            setItems((prevItems) => [...prevItems, newItemAction]);
            setShowActionModal(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'action :", error);
        }
    };


    useEffect(() => {
        fetchItems();
    }, []);

    const filteredItems = items.filter((item) => {
        const matchesTypes =
            (item.type === "question" && filter.question) ||
            (item.type === "action" && filter.action);
        const matchesSearch =
            (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
            (item.description || "").toLowerCase().includes(search.toLowerCase())

        return matchesTypes && matchesSearch;
    });

    return(
        <div className="ridebar">
            <div className="ridebar-flex">
                <h2>Process</h2>
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
                <li key={idx}
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData("application/json", JSON.stringify(item));
                }}
                >
                    <strong>{item.type === "question" ? "?" : "⚙️"}</strong> {item.title || item.description}
                </li>
            ))}
        </ul>
        {showActionModal && <ActionModal onClose={() => setShowActionModal(false)} onAdd={addAction} />}
        {showQuestionModal && <QuestionModal onClose={() => setShowQuestionModal(false)} onAdd={addQuestion} />}
        </div>
        );
};