import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    await logout(token, refresh);

    logoutUser(); 

    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h3 style={{ margin: 0 }}>🌾 SmartFarm Dashboard</h3>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>
              {user.username} ({user.role})
            </span>

            <button onClick={handleLogout} style={styles.btn}>
              Logout
            </button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#1f2937",
    color: "white",
    alignItems: "center"
  },
  btn: {
    width:"auto",
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "6px"
  }
};