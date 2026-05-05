const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');

const app = express();
const PORTA = 3000;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'agendamento-secret',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  const erros = req.session.erros || {};
  const dadosFormulario = req.session.dadosFormulario || {};
  delete req.session.erros;
  delete req.session.dadosFormulario;
  res.render('formulario', { erros, dadosFormulario });
});

app.post('/', (req, res) => {
  const {
    nome, sobrenome, cpf, dataNascimento, telefone, cep, endereco,
    clinica, especialidade, observacao, dataAgendamento, horaAgendamento
  } = req.body;

  const erros = {};

  if (!nome?.trim())               erros.nome = 'Campo obrigatório.';
  if (!sobrenome?.trim())          erros.sobrenome = 'Campo obrigatório.';
  if (!cpf?.trim())                erros.cpf = 'Campo obrigatório.';
  if (!dataNascimento?.trim())     erros.dataNascimento = 'Campo obrigatório.';
  if (!telefone?.trim())           erros.telefone = 'Campo obrigatório.';
  if (!cep?.trim())                erros.cep = 'Campo obrigatório.';
  if (!endereco?.trim())           erros.endereco = 'Campo obrigatório.';
  if (!clinica?.trim())            erros.clinica = 'Campo obrigatório.';
  if (!especialidade?.trim())      erros.especialidade = 'Campo obrigatório.';
  if (!dataAgendamento?.trim())    erros.dataAgendamento = 'Campo obrigatório.';
  if (!horaAgendamento?.trim())    erros.horaAgendamento = 'Campo obrigatório.';

  if (!erros.dataAgendamento && !erros.horaAgendamento) {
    const agora = new Date();
    const dataHora = new Date(`${dataAgendamento}T${horaAgendamento}`);
    if (isNaN(dataHora.getTime())) {
      erros.dataAgendamento = 'Data ou hora inválida.';
    } else if (dataHora <= agora) {
      erros.dataAgendamento = 'A data e hora devem ser superiores ao momento atual.';
    }
  }

  if (Object.keys(erros).length > 0) {
    req.session.erros = erros;
    req.session.dadosFormulario = req.body;
    return res.redirect('/');
  }

  const formatarData = (str) => str.split('-').reverse().join('/');

  const cpfFormatado = cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  const cepFormatado = cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');

  req.session.agendamento = {
    nome: nome.trim(),
    sobrenome: sobrenome.trim(),
    cpf: cpfFormatado,
    dataNascimento: formatarData(dataNascimento),
    telefone: telefone.trim(),
    cep: cepFormatado,
    endereco: endereco.trim(),
    clinica: clinica.trim(),
    especialidade: especialidade.trim(),
    observacao: observacao?.trim() || null,
    dataAgendamento: formatarData(dataAgendamento),
    horaAgendamento
  };

  res.redirect('/agendamento');
});

app.get('/agendamento', (req, res) => {
  if (!req.session.agendamento) return res.redirect('/');
  const agendamento = req.session.agendamento;
  delete req.session.agendamento;
  res.render('agendamento', { agendamento });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
