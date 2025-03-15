import React, { useState } from "react";
import MapComponent from "./MapComponent"; // Import Map
import Events from "./Events";
import Form from "./form"; // Import the new Form component

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // database will ne involved here
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
    </div>
  );
};

export default App;
