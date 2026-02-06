import { useState, useEffect } from "react";
import API from "./api";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ---------- AUTH ----------
  const register = async () => {
    try {
      await API.post("/auth/register", { email, password });
      alert("Registered successfully. Now login.");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setTasks([]);
  };

  // ---------- TASKS ----------
  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!title.trim()) return;
    await API.post("/tasks", { title });
    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  useEffect(() => {
    if (loggedIn) loadTasks();
  }, [loggedIn]);

  // ---------- LOGIN / REGISTER UI ----------
  if (!loggedIn) {
    return (
      <div style={container}>
        <div style={card}>
          <h2 style={{ marginBottom: "6px" }}>Welcome Back</h2>
          <p style={subtitle}>Login or create an account</p>

          <input
            style={input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={buttonPrimary} onClick={login}>
            Login
          </button>

          <button style={buttonSecondary} onClick={register}>
            Register
          </button>
        </div>
      </div>
    );
  }

  // ---------- DASHBOARD UI ----------
  return (
    <div style={container}>
      <div style={card}>
        <h2>Task Dashboard</h2>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>

        <input
          style={input}
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button style={buttonPrimary} onClick={createTask}>
          Add Task
        </button>

        <ul style={list}>
          {tasks.map((t) => (
            <li key={t._id} style={listItem}>
              {t.title}
              <button
                style={deleteBtn}
                onClick={() => deleteTask(t._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const container = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f4f6f8",
  fontFamily: "Inter, Arial, sans-serif"
};

const card = {
  width: "360px",
  padding: "28px",
  borderRadius: "10px",
  background: "#ffffff",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  textAlign: "center"
};

const subtitle = {
  fontSize: "13px",
  color: "#667085",
  marginBottom: "16px"
};

const input = {
  width: "100%",
  padding: "10px 12px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #d0d5dd",
  fontSize: "14px"
};

const buttonPrimary = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer"
};

const buttonSecondary = {
  width: "100%",
  padding: "10px",
  marginTop: "8px",
  borderRadius: "6px",
  border: "1px solid #2563eb",
  background: "#fff",
  color: "#2563eb",
  fontSize: "14px",
  cursor: "pointer"
};

const logoutBtn = {
  marginBottom: "12px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const list = {
  listStyle: "none",
  padding: 0,
  marginTop: "15px"
};

const listItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px 0",
  borderBottom: "1px solid #eee"
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "4px 8px",
  borderRadius: "4px",
  cursor: "pointer"
};
