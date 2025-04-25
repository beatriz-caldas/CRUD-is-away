import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EditUserForm from "../components/EditUserForm";
import "../css/AddUserList.css";

const AddUserList = () => {
  // Estados principais do componente
  // Lista de usuários
  const [data, setData] = useState([]);
  // Usuário selecionando para editar
  const [editUser, setEditUser] = useState(null);
  // Página atual para rolagem infinita
  const [page, setPage] = useState(1);
  // Controle de mais dados
  const [hasMore, setHasMore] = useState(true);
  // Navegação entre as páginas
  const navigate = useNavigate();
  // Referência para o observador do último item
  const observer = useRef();

  // Função para buscar os dados do backend
  const fetchData = useCallback(() => {
    fetch(`http://localhost:8800?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((newData) => {
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          // Acumula os dados paginados
          setData((prev) => [...prev, ...newData]);
        }
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, [page]);

  useEffect(() => {
    if (hasMore) fetchData();
  }, [fetchData, hasMore]);

  // Observador do último elemento para a rolagem infinita
  const lastUserRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  // Função para deletar um usuário
  const handleDelete = (id) => {
    fetch(`http://localhost:8800/${id}`, { method: "DELETE" })
      .then(() => {
        setData((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Erro ao deletar:", err));
  };

  // Ativa o formulário de edição
  const handleEdit = (user) => {
    setEditUser(user);
  };

  return (
    <>
      <div className="user-header"><span>Lista dos Usuários</span></div>
      <button className="back-button-lista" onClick={() => navigate("/cadastro")}>
        Voltar para Página de cadastro
      </button>
      <ul className="list">
        {data.map((item, index) => (
          <li
            key={item.id}
            className="user-card"
            ref={index === data.length - 1 ? lastUserRef : null}
          >
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p>{item.gender}</p>
            <p>
              {new Date(item.birthdate).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
            </p>

            <button
              className="details-button"
              onClick={() => navigate(`/detalhes-usuarios/${item.id}`)}
            >
              Mais detalhes
            </button>
            <div className="user-buttons">
              <button className="edit-button-card" onClick={() => handleEdit(item)}>
                Editar
              </button>
              <button className="delete-button" onClick={() => handleDelete(item.id)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editUser && (
        <EditUserForm
          user={editUser}
          onClose={() => setEditUser(null)}
          onUserUpdated={() => {
            setData([]);           
            setPage(1);          
            setHasMore(true);      
            fetch(`http://localhost:8800?page=1&limit=5`)  
              .then(res => res.json())
              .then(newData => {
                setData(newData);
              })
              .catch(err => console.error("Erro ao buscar dados:", err));
          }}
          
        />
      )}
    </>
  );
};

export default AddUserList;
