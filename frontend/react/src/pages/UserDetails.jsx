import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/UserDetails.css";

const UserDetails = () => {
  // Obtem id via URL
  const { id } = useParams();
  // Navegação entre as páginas
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // Mensagem de erro
  const [error, setError] = useState("");

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  // Busca dos usuário
  useEffect(() => {
    fetch(`http://localhost:8800/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar dados.");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setError("Não foi possível carregar os dados do usuário.");
      });
  }, [id]);

  // Exibição da mensagem de erro
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Exibe essa mensagem enquanto os dados não carregam
  if (!user) {
    return <div className="loading">Carregando dados do usuário...</div>;
  }

  return (
    <div className="user-details-container">
      <div className="user-details-card">
        <div className="user-details-header">Detalhes do Usuário</div>

        <div className="user-details-body">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Telefone:</strong> {user.phone}</p>
          <p><strong>Gênero:</strong> {user.gender}</p>
          <p><strong>Nascimento:</strong> {formatDate(user.birthdate)}</p>
        </div>

        <button
          className="back-button-details"
          onClick={() => navigate("/lista-usuarios")}
        >
          Voltar para Lista
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
