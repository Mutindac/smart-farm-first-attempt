import { useEffect, useState } from "react";
import { getAdminFields, createField, getAgents, deleteField } from "../api/auth";


export default function AdminDashboard() {
  const [fields, setFields] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    crop_type: "",
    planting_date: "",
    assigned_agent: ""
  });

  //LOAD DATA
  useEffect(() => {
    const token = localStorage.getItem("access");

    async function loadData() {
      try {
        const fieldsData = await getAdminFields(token);
        const agentsData = await getAgents(token);

        console.log("FIELDS:", fieldsData);
        console.log("AGENTS:", agentsData);

        //SAFE ARRAY CHECK
        setFields(Array.isArray(fieldsData) ? fieldsData : []);
        setAgents(Array.isArray(agentsData) ? agentsData : []);

      } catch (error) {
        console.error("Load error:", error);
        setFields([]);
        setAgents([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // 🌱 CREATE FIELD
  const handleCreate = async () => {
    const token = localStorage.getItem("access");

    try {
      const res = await createField(form, token);

      if (res?.id) {
        setFields((prev) => [...prev, res]);

        // reset form
        setForm({
          name: "",
          crop_type: "",
          planting_date: "",
          assigned_agent: ""
        });
      } else {
        alert(JSON.stringify(res));
      }
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  const handleDelete = async (id) => {
  const token = localStorage.getItem("access");

  if (!window.confirm("Are you sure you want to delete this field?")) return;

  try {
    await deleteField(id, token);

    setFields(prev => prev.filter(f => f.id !== id));

  } catch (error) {
    console.error("Delete error:", error);
  }
};

  // LOADING 
  if (loading) {
    return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  }

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>

      {/* CREATE FORM */}
      <div className="card">
        <h3>Create Field</h3>

        <input
          placeholder="Field name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Crop type"
          value={form.crop_type}
          onChange={(e) =>
            setForm({ ...form, crop_type: e.target.value })
          }
        />

        <input
          type="date"
          value={form.planting_date}
          onChange={(e) =>
            setForm({ ...form, planting_date: e.target.value })
          }
        />

        <select
          value={form.assigned_agent}
          onChange={(e) =>
            setForm({ ...form, assigned_agent: e.target.value })
          }
        >
          <option value="">Select Agent</option>

          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.username}
            </option>
          ))}
        </select>

        <button onClick={handleCreate}>
          Create Field
        </button>
      </div>

      {/* FIELD LIST */}
      {fields.length === 0 ? (
        <p>No fields found</p>
      ) : (
        fields.map((f) => (
          <div className="card" key={f.id}>
            <h4>{f.name}</h4>
            <p>Crop: {f.crop_type}</p>
            <p>Stage: {f.current_stage}</p>
            <p>Assigned Agent: {f.assigned_agent?.username || "Unassigned"}</p>

            <span
              className={`status ${
                f.status === "At Risk"
                  ? "risk"
                  : f.status === "Completed"
                  ? "done"
                  : "active"
              }`}
            >
              {f.status}
            </span>
            <button onClick={() => handleDelete(f.id)} style={{ background: "#c62828", marginLeft: 10 }}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}