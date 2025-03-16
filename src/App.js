import React, { useState } from "react";
import MapComponent from "./MapComponent"; // Import Map
import Events from "./Events";
import Form from "./form"; // Import the new Form component
import AISuggestionPopup from "./AISuggestionPopup";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAIPopupOpen, setIsAIPopupOpen] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setAiSuggestions(generateAISuggestions);
    setIsAIPopupOpen(true)
  };

  const closeAIPopup = () => {
    setIsAIPopupOpen(false);
  };

  const generateAISuggestions = (formData) => {
    
    // REPLACE WITH ACTUAL API CALL
    const mockSuggestions = [
      "Stay in a safe location and wait for emergency services.",
      "Keep your phone charged and maintain communication.",
      "If you need to evacuate, follow the designated evacuation routes.",
      "Help is expected to arrive within 30-45 minutes based on your location."
    ];
    
    setAiSuggestions(mockSuggestions);
    setIsAIPopupOpen(true);
  };


  const handleFormSubmit = (formData) => {
    // database will Be involved here
    console.log("test:", formData);
    closeForm();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4 overflow-y-auto bg-gray-100">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold mr-20">Disaster Map</h1>
          <button 
            className="shadow-md bg-slate-600 hover:bg-slate-800 text-white py-1 px-3 rounded text-xl font-sans"
            onClick={openForm}
          >
            Request Help
          </button>
        </div>
        <Events />
      </div>

      <div className="w-full md:w-2/3 p-4">
        <div className="w-full h-[40vh] md:h-full rounded-lg shadow-lg overflow-hidden">
          <MapComponent />
        </div>
      </div>

      <Form 
        isOpen={isFormOpen} 
        onClose={closeForm} 
        onSubmit={handleFormSubmit} 
      />
      <AISuggestionPopup
        isOpen={isAIPopupOpen}
        onClose={closeAIPopup}
        suggestions={aiSuggestions}
      />

    </div>
  );
};

export default App;
