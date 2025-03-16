import { type } from "@testing-library/user-event/dist/type";
import { addDoc, collection, GeoPoint, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import React, { useState } from "react";

// time can be obtained right before they clicked on this form
// severity will be calculated via ai or smt idk
// description will be used for ai response

const Form = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    eventType: "Hurricane",
    latitude: "",
    longitude: "",
    severity: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const lat = parseFloat(formData.latitude.trim());
      const lng = parseFloat(formData.longitude.trim());

      if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        alert("Invalid latitude or longitude. Latitude must be between -90 and 90, and longitude between -180 and 180.");
        return;
      }

      const selectedTime = new Date(formData.time);
      const firestoreTimestamp = Timestamp.fromDate(selectedTime);

      await addDoc(collection(db, "disasters"), {
        type: formData.eventType,
        location: new GeoPoint(lat, lng), //Store as Geopoint
        severity: parseFloat(formData.severity),
        time: firestoreTimestamp,
        description: formData.description,
      });

      alert("Disaster added successfully!");
      window.location.reload();
      setFormData({type: "", latitude: "", longitude: "", severity: "", time: "", description: ""});
    }catch(error) {
      console.error("Error adding document: ", error);
      alert("Failed to add disaster.");
    }
  
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Report Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 mb-1">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
              required
            >
              <option value="Hurricane">Hurricane</option>
              <option value="Cyclone">Cyclone</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Wildfire">Wild Fire</option>
              <option value="Other">Other</option>
            </select>
          </div>
        
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Severity</label>
            <input
              type="number"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Time</label>
            <input
              type="datetime-local"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
              rows="4"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-800 text-white py-2 px-4 rounded"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
