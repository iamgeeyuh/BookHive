import "./FacultyEquipmentInventory.css";
import { MdOutlineInventory } from "react-icons/md";
import { useState, useEffect } from "react";

const FacultyEquipmentInventory = () => {
  const [equipment, setEquipment] = useState([]);

  const fetchEquipment = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/equipment`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEquipment(data);
      } else {
        throw new Error("Failed to fetch equipment");
      }
    } catch (err) {
      console.error("Error fetching equipment:", err);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div className="faculty-equipment-inventory-container">
      <div className="faculty-equipment-header">
        <MdOutlineInventory />
        <p>Current Inventory</p>
      </div>
      <div className="faculty-equipment-left-contents-container">
        <table className="faculty-equipment-inventory-table-container">
          <thead>
            <tr>
              <th>Equipment ID</th>
              <th>Equipment Name</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {equipment.length > 0 ? (
              equipment.map((item) => (
                <tr key={item._id}>
                  <td title={item._id}>{item._id}</td>
                  <td title={item.type}>{item.type}</td>
                  <td title={item.available ? "Yes" : "No"}>
                    {item.available ? "Yes" : "No"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No equipment found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyEquipmentInventory;
