import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-gray-900 text-white ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 focus:outline-none"
      >
        {isOpen ? "❌" : "☰"}
      </button>

      <nav className="mt-5">
        <ul>
          <li className="p-3 hover:bg-gray-700 cursor-pointer">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer">
            <Link to="/overview">Overview</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const api_url=""

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const topUsers = data.slice(0, 5); // Get only the first 5 users

       
        topUsers.forEach((user) => {
          fetch(
`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
)
            .then((res) => res.json())
            .then((posts) => {
         
              user.postCount = posts.length;
              user.followers = Math.floor(Math.random() * 5000) + 1000;

             
              setUsers((prevUsers) => [...prevUsers, user]);
            });
        });
      });
  }, []);

  return (
    <div className="p-5 flex-1">
      <h1 className="text-2xl font-bold mb-4">📊 Social Media Analytics</h1>

      {/* 🔥 Top Users Section */}
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">🔥 Top Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg mb-2">
              <img
                src={
`https://i.pravatar.cc/50?img=${user.id}`}
 // Profile image
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-300">{user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">📩 Posts: <span className="font-semibold">{user.postCount}</span></p>
                <p className="text-sm">👥 Followers: <span className="font-semibold">{user.followers}</span></p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
