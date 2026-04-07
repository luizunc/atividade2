const express = require('express');
const app = express();
const port = 8080;

let estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;
    const novoProduto = {
        id: id,
        nome: nome,
        qtd: parseInt(qtd)
    };
    estoque.push(novoProduto);
    res.send(`Produto ${nome} adicionado com sucesso!`);
});

app.get('/listar', (req, res) => {
    if (estoque.length === 0) {
        return res.send('Estoque vazio.');
    }
    res.json(estoque);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    estoque = estoque.filter(p => p.id !== id);
    res.send(`Produto com ID ${id} removido do estoque.`);
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;
    const produto = estoque.find(p => p.id === id);
    if (produto) {
        produto.qtd = parseInt(qtd);
        res.send(`Quantidade do produto com ID ${id} alterada para ${qtd}.`);
    } else {
        res.status(404).send('Produto não encontrado.');
    }
});

app.listen(port, () => {
    console.log(`Aplicativo de estoque ouvindo em http://localhost:${port}`);
});
