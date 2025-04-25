import React, { useState } from "react";
import "../css/AddUser.css";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    birthdate: "",
  });

  // Mensagens de sucesso e erro
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Navegação entre as páginas
  const navigate = useNavigate();

  // Atualiza os campos do formuário
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDAÇÃO - Nome do usuário
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nameRegex.test(formData.name)) {
      setErrorMessage("O nome deve conter apenas letras e espaços.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // VALIDAÇÃO - Telefone
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage("O telefone deve conter exatamente 11 números (Sem letras).");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // VALIDAÇÃO - Ano de nascimento
    const year = parseInt(formData.birthdate?.split("-")[0], 10);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      setErrorMessage("Ano de nascimento inválido. Deve estar entre 1900 e o ano atual.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // Envia os dados para o backend (POST)
    fetch("http://localhost:8800", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          // Mesangem de validação para o usuário
          throw new Error("Erro ao cadastrar usuário.");
        }
        return res.json();
      })
      .then(() => {
        // Mesangem de validação para o usuário
        setSuccessMessage("Usuário cadastrado com sucesso!");
        setErrorMessage("");
        setTimeout(() => setSuccessMessage(""), 3000);

        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          birthdate: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Erro ao cadastrar. Tente novamente.");
        setSuccessMessage("");
        setTimeout(() => setErrorMessage(""), 3000);
      });
  };

  return (
    <div className="add-form-container">
      <div className="add-header">
        <img src="/img/carta.png" alt="Ícone" className="carta-icon" />
        <span className="titulo-cadastro">CADASTRO</span>
      </div>

      {successMessage && ( <div className="success-message">{successMessage}</div>)}
      {errorMessage && (<div className="error-message">{errorMessage}</div>)}

      <form onSubmit={handleSubmit} className="add-form">
        <label>Nome</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
        <label>Telefone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required/>
        <label>Gênero</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
          <option value="Prefiro não dizer">Prefiro não dizer</option>
        </select>
        <label>Data de Nascimento</label>
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required/>

        <button type="submit" className="carta-button">
          <img src="/img/carta1.png" alt="Enviar" />
        </button>
      </form>

      {/* REACTDOM - Botão de navegação */ }
      <button onClick={() => navigate("/lista-usuarios")} className="edit-button">
        Edição de Usuários
      </button>
    </div>
  );
};

export default AddUser;
