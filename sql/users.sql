CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  gender VARCHAR(20),
  birthdate DATE
);

INSERT INTO users (name, email, phone, gender, birthdate) VALUES
('Beatriz Caldas', 'bia@email.com', '41994563212', 'Feminino', '2001-08-15'),
('Lucas Gasperin', 'lucas@email.com', '41991234567', 'Masculino', '1998-03-22'),
('Mariana Souza', 'mariana@email.com', '41993334444', 'Feminino', '1995-12-10'),
('João Pedro', 'joao@email.com', '41995556666', 'Masculino', '2000-06-05'),
('Ana Clara', 'ana@email.com', '41997778888', 'Feminino', '1999-09-09'),
('Carlos Henrique', 'carlos@email.com', '41990001111', 'Masculino', '1987-11-30'),
('Lívia Martins', 'livia@email.com', '41998887777', 'Feminino', '2002-04-18'),
('Eduardo Lima', 'edu@email.com', '41992223333', 'Masculino', '1993-02-25'),
('Fernanda Torres', 'fer@email.com', '41996665555', 'Feminino', '2001-10-02'),
('Bruno Oliveira', 'bruno@email.com', '41994443322', 'Masculino', '1997-07-14');
