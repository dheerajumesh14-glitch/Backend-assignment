import { useState, useEffect } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));

  // 🔐 LOGIN
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.token) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  // 📦 FETCH TASKS
  const fetchTasks = async (authToken) => {
    const res = await fetch("http://localhost:5000/api/v1/tasks", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  // ➕ CREATE TASK
  const createTask = async () => {
    if (!title) {
      alert("Title is required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    await res.json();

    setTitle("");
    setDescription("");

    fetchTasks(token);
  };

  // ⏱ TIME AGO FUNCTION
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "min", seconds: 60 },
    ];

    for (let i of intervals) {
      const count = Math.floor(seconds / i.seconds);
      if (count > 0) {
        return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  // 🔁 LOAD TASKS
  useEffect(() => {
    if (token) {
      fetchTasks(token);
    }
  }, [token]);

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setTasks([]);
  };

  return (
    <div style={styles.container}>
      {!token ? (
        <div style={styles.card}>
          <h1>Login</h1>

          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <div style={{ marginBottom: "20px" }}>
  <h1 style={{ margin: "0 0 15px 0" }}>Task Manager</h1>

  <button style={styles.logout} onClick={logout}>
    Logout
  </button>
</div>

          <input
            style={styles.input}
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button style={styles.button} onClick={createTask}>
            Add Task
          </button>

          <hr />

          {tasks.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            tasks.map((task, index) => (
              <div key={task.id} style={styles.task}>
                <div>
                  <strong>
                    {index + 1}. {task.title}
                  </strong>
                  <div style={styles.time}>
                    {timeAgo(task.createdAt)}
                  </div>
                </div>
                <span>{task.status}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
  },
  card: {
    background: "#1e293b",
    padding: "40px",
    borderRadius: "6px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    color: "white",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  logout: {
  background: "#44efad",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "4px",
  cursor: "pointer",
},
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#334155",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "4px",
  },
  time: {
    fontSize: "12px",
    color: "#cbd5f5",
  },
};

export default App;