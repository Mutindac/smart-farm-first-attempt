import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "AGENT"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    // Frontend validation
    if (!form.username.trim()) {
      setError("Username is required");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!form.password.trim()) {
      setError("Password is required");
      return;
    }

    if (!form.confirm_password.trim()) {
      setError("Please confirm your password");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const data = await register(form);

      // success 
      if (data.access || data.id || data.user) {
        alert("Registered successfully");
        navigate("/login");
        return;
      }

      //backend validation 
      if (typeof data === "object") {
        const message = Object.entries(data)
          .filter(([key]) => key !== "user") // ignore noisy backend object
          .map(([field, msgs]) => {
            if (Array.isArray(msgs)) {
              return `${field}: ${msgs[0]}`;
            }
            return `${field}: ${msgs}`;
          })
          .join("\n");

        setError(message || "Registration failed");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      {error && (
        <div style={{ color: "red", marginBottom: 10, whiteSpace: "pre-line" }}>
          {error}
        </div>
      )}

      <input
        placeholder="Enter Your Username"
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        placeholder="Enter Your Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Enter Your Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirm_password}
        onChange={(e) =>
          setForm({ ...form, confirm_password: e.target.value })
        }
      />

      <select
        value={form.role}
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="AGENT">Agent</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p>Already have an account?</p>

      <button
        onClick={() => navigate("/login")}
        style={{ marginTop: 10, background: "#2a910d" }}
      >
        Go to Login
      </button>
    </div>
  );
}