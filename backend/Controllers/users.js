import { db } from "../db.js";

/* GET 
   Rota usada em: AddUserList (lista os dados)
 */
export const getUsers = (req, res) => {
  // rolagem inifita
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;

  const q = "SELECT * FROM users LIMIT ? OFFSET ?";

  db.query(q, [limit, offset], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

/* GET USER BY ID
   Rota usada em: UserDetails (detalhamento)
*/
export const getUserById = (req, res) => {
  const q = "SELECT * FROM users WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(200).json(data[0]); // importante: data[0], pois o resultado vem em array
  });
};

/* POST
   Rota usada em: AddUser (cadastro)
*/
export const addUser = (req, res) => {
  const { name, email, phone, gender, birthdate } = req.body;

  // Validação
  if (!name || !email || !phone || !gender || !birthdate) {
    return res.status(400).json("Todos os campos são obrigatórios.");
  }

  const q = "INSERT INTO users (`name`, `email`, `phone`, `gender`, `birthdate`) VALUES (?)";
  const values = [name, email, phone, gender, birthdate];

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Usuário criado com sucesso");
  });
};

/* DELETE
   Rota usada em: AddUserList (botão excluir)
*/
export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE id = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Usuário deletado com sucesso");
  });
};

/* PUT
   Rota usada em: EditUserForm (modal de edição)
*/
export const updateUser = (req, res) => {
  const { name, email, phone, gender, birthdate } = req.body;

  // Validação
  if (!name || !email || !phone || !gender || !birthdate) {
    return res.status(400).json("Todos os campos são obrigatórios.");
  }

  const q = "UPDATE users SET `name` = ?, `email` = ?, `phone` = ?, `gender` = ?, `birthdate` = ? WHERE id = ?";
  const values = [name, email, phone, gender, birthdate];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Usuário atualizado com sucesso");
  });
};
