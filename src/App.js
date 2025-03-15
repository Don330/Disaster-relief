import React from "react";
import MapComponent from "./MapComponent"; // Import Map
import Events from "./Events";

const App = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4 overflow-y-auto bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Disaster Map</h1>
      <Events />
      </div>

      <div className="w-full md:w-2/3 p-4">
        <div className="w-full h-[40vh] md:h-full rounded-lg shadow-lg overflow-hidden">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
