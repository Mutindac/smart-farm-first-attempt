import { useState, useContext } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); 

    const data = await login(form);

    // success case
    if (data.access && data.user) {
      loginUser(data);
      navigate("/dashboard");
      return;
    }

    // error 
    if (typeof data === "object") {
      const message = Object.entries(data)
        .map(([field, msgs]) => {
          if (Array.isArray(msgs)) {
            return `${field}: ${msgs.join(", ")}`;
          }
          return `${field}: ${msgs}`;
        })
        .join("\n");

      setError(message || "Login failed");
    } else {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

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
        type="password"
        placeholder="Enter Your Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={handleLogin}>Login</button>

      <p>Don't have an account?</p>

      <button
        onClick={() => navigate("/register")}
        style={{ marginTop: 10, background: "#2a910d" }}
      >
        Go to Register
      </button>
    </div>
  );
}