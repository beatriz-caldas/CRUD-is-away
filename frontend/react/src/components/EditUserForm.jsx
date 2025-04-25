import React, { useState, useEffect } from "react";
import "../css/EditUserForm.css";

const EditUserForm = ({ user, onClose, onUserUpdated }) => {
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    birthdate: "",
  });

  // Mensagens de erro e sucesso 
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Converte a data do banco (ISO) para o formato yyyy-mm-dd
    const birthdate = user.birthdate ? new Date(user.birthdate).toISOString().split("T")[0] : "";
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      gender: user.gender || "",
      birthdate: birthdate,
    });
  }, [user]);

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDÇÃO - Ano de nascimento
    const year = parseInt(formData.birthdate?.split("-")[0], 10);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      setErrorMessage("Ano de nascimento inválido. Deve estar entre 1900 e o ano atual.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // VALIDAÇÃO - Telefone 
    if (!/^\d{11}$/.test(formData.phone)) {
      setErrorMessage("Telefone deve conter exatamente 11 números (Sem letras).");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // VALIDAÇÃO - Nome do usuário
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(formData.name)) {
      setErrorMessage("Nome deve conter apenas letras.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // Envia os dados para o backend (PUT)
    fetch(`http://localhost:8800/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao editar.");
      return res.json();
    })
    .then(() => {
      // Mensagem de validação para o usuário
      setSuccessMessage("Usuário editado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
      onUserUpdated();
      onClose();
    })
    .catch(() => {
      // Mensagem de validação para o usuário
      setErrorMessage("Erro ao editar usuário.");
      setTimeout(() => setErrorMessage(""), 3000);
    });
  };

  return (
    <div className="edit-modal-overlay">
      <form className="edit-form-card" onSubmit={handleSubmit}>
        <div className="edit-form-header">
          <span>Editar Usuário</span>
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="edit-form-inner">
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
            <option value="Prefiro não dizer">Prefiro não dizer</option>
          </select>
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
        </div>

        <div className="edit-buttons">
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
