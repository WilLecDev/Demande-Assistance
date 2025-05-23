import React from "react";
import { useDrop } from "react-dnd";
import "../styles/canvasProcedure.css";

export default function CanvasProcedure({ procedure = { steps: [] }, setProcedure}) {
  const [, dropRef] = useDrop({
    accept: ["question", "action"],
    drop: (item) => {
        const newSteps = [...procedure.steps, item];
        setProcedure({ ...procedure, steps: newSteps });
     },
  });

  return (
    <div ref={dropRef}>
        
        <h3>Construire la procédure : </h3>
        {procedure.steps.length === 0 ? (
            <p>Déposez ici vos questions et actions</p>
        ) : (
          <ul>
            {procedure.steps.map((step, index) => (
              <li key={index}>
                <strong>{step.type === "question" ? '?' : "⚙️"}</strong>{""}
                {step.title || step.description}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
  
};