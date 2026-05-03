import { useEffect, useState } from "react";
import { getMyFields, getFieldUpdates, createFieldUpdate } from "../api/auth";

export default function AgentDashboard() {
  const [fields, setFields] = useState([]);
  const [notesMap, setNotesMap] = useState({});

  //LOAD
  useEffect(() => {
    const token = localStorage.getItem("access");

    const loadData = async () => {
      const fieldsData = await getMyFields(token);

      if (!Array.isArray(fieldsData)) {
        setFields([]);
        return;
      }

      setFields(fieldsData);

      const notes = {};

      for (const field of fieldsData) {
        const updates = await getFieldUpdates(field.id, token);

        notes[field.id] =
          Array.isArray(updates) && updates.length > 0
            ? updates[0].notes
            : "";
      }

      setNotesMap(notes);
    };

    loadData();
  }, []);

  // 💾 SAVE FIELD UPDATE
  const handleSave = async (field) => {
    const token = localStorage.getItem("access");

    const payload = {
      field: field.id,
      stage: field.current_stage,
      notes: notesMap[field.id] || ""
    };

    const updated = await createFieldUpdate(payload, token);

    if (updated?.id) {
      alert("Update saved");

      // 🔄 refresh fields after save
      const refreshed = await getMyFields(token);
      if (Array.isArray(refreshed)) {
        setFields(refreshed);
      }

      // 🔄 refresh notes for safety
      const updates = await getFieldUpdates(field.id, token);
      if (Array.isArray(updates) && updates.length > 0) {
        setNotesMap((prev) => ({
          ...prev,
          [field.id]: updates[0].notes
        }));
      }
    } else {
      alert(JSON.stringify(updated));
    }
  };

  return (
    <div className="page">
      <h2>My Assigned Fields</h2>
      {fields.length === 0 ? (
        <p>You have no fields assigned yet. You can rest</p>
      ) : (

        fields.map((f) => (
          <div className="card" key={f.id}>
            <h3>{f.name}</h3>

            <p>Crop: {f.crop_type}</p>
            <p>Status: {f.status}</p>

            {/*STAGE CONTROL */}
            <select
              value={f.current_stage}
              onChange={(e) =>
                setFields((prev) =>
                  prev.map((field) =>
                    field.id === f.id
                      ? { ...field, current_stage: e.target.value }
                      : field
                  )
                )
              }
            >
              <option value="PLANTED">Planted</option>
              <option value="GROWING">Growing</option>
              <option value="READY">Ready</option>
              <option value="HARVESTED">Harvested</option>
            </select>

            {/*NOTES */}
            <textarea
              placeholder="Notes..."
              value={notesMap[f.id] || ""}
              onChange={(e) =>
                setNotesMap((prev) => ({
                  ...prev,
                  [f.id]: e.target.value
                }))
              }
            />

            {/*SAVE */}
            <button onClick={() => handleSave(f)}>
              Save Field Updates
            </button>
          </div>
        ))
      )}
    </div>
  );
} 
