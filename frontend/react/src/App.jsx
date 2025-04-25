import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./css/App.css";
import AddUser from "./pages/AddUser";
import AddUserList from "./pages/AddUserList";
import EditUserForm from "./components/EditUserForm";
import UserDetails from "./pages/UserDetails";

function App() {
  // Controla o usuário em edição
  const [editUser, setEditUser] = useState(null);
  // Controla o refresh da lista apos a edição
  const [refresh, setRefresh] = useState(false);

  // Define o usuário que vai ser editado
  const handleUserEdit = (user) => {
    setEditUser(user);
  };

  const closeEditForm = () => {
    setEditUser(null);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route path="/cadastro" element={<AddUser onToggleEdit={() => {}} />} />
        <Route
          path="/lista-usuarios"
          element={
            <AddUserList refresh={refresh} onEdit={handleUserEdit} />
          }
        />
        <Route path="/detalhes-usuarios/:id" element={<UserDetails />} />
      </Routes>

      {editUser && (
        <EditUserForm
          user={editUser}
          onClose={closeEditForm}
          onUserUpdated={() => setRefresh(!refresh)}
        />
      )}
      <footer className="footer">
        <p> Beatriz Caldas</p>
      </footer>
    </>
  );
}

export default App;
