const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');


router.get("/", async (req, res) => {
    res.send("Teste GET com sucesso");
});

router.post("/cliente", async (req, res) => {
    try {

        const { nome_tutor, cpf, telefone, sexo, email, senha, pet1, pet2, idade } = req.body;

        // Crie um novo registro de usuário
        const newUser = await Cliente.create({
            nome_tutor,
            cpf,
            telefone,
            sexo,
            email,
            senha,
            pet1,
            pet2,
            idade
        });

        res.status(201).json(newUser); // Retorne o novo usuário criado
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

module.exports = router;
