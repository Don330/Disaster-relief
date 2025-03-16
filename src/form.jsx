import React, { useState } from "react";

// time can be obtained right before they clicked on this form
// severity will be calculated via ai or smt idk
// description will be used for ai response

const Form = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    eventType: "hurricane",
    latitude: "",
    longitude: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
        eventType: "hurricane",
        latitude: "",
        longitude: "",
        description: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Request Help</h2>
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
              <option value="medical">hurricane</option>
              <option value="fire">cyclone</option>
              <option value="rescue">earthquake</option>
              <option value="supplies">wildFire</option>
              <option value="other">other</option>
            </select>
          </div>
        
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">latitude</label>
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
            <label className="block text-gray-700 mb-1">longitude</label>
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
