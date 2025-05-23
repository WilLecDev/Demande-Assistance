import React, { useState } from "react";
//import CreateProcedureModal from "../components/CreateProcedureModal";
import ProcessList from "../components/processList.jsx";
import ProcedureCanvas from "../components/canvasProcedure.jsx";
import "../styles/procedurePage.css";

export default function ProcedurePage() {
  const [showModal, setShowModal] = useState(false);
  const [procedure, setProcedure] = useState(null);

  const handleCreateProcedure = (newProc) => {
    setProcedure(newProc);
    setShowModal(false);
  };

  return (
    <div className="procedure-page">
      <ProcessList />
      <div className="procedure-content">
        {!procedure ? (
          <div>
            <button onClick={() => setShowModal(true)}>Créer une procédure</button>
          </div>
        ) : (
          <div>
            <h2>{procedure.title}</h2>
            <p><em>Créée le {procedure.date}</em></p>
            <ProcedureCanvas procedure={procedure} setProcedure={setProcedure} />
          </div>
        )}
      </div>
      {showModal && (
        <CreateProcedureModal
          onSave={handleCreateProcedure}
         onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};


