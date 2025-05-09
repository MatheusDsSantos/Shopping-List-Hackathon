const boasVindas = document.getElementById('boas-vindas')
const userAtual = document.getElementById('mostrar-usuario');
userAtual.addEventListener('click',mostrarUserAtual)

function mostrarUserAtual(){
  let userAtual = sessionStorage.getItem('nomeUsuario');
  alert(`o usuario atual é: ${userAtual}`)
}

//funçao pra perguntar o nome de quem vai usar a lista
function perguntarNome(){
  let nome = sessionStorage.getItem('nomeUsuario');

  if(!nome){
    nome = prompt("qual é o seu nome?")
  }

  if(nome){
    sessionStorage.setItem('nomeUsuario', nome);
  }else{
    nome = 'visitante';
  }
}

// Selecionar os elementos
const inputItem = document.getElementById('item');
const botaoAdicionar = document.getElementById('adicionar');
const lista = document.getElementById('lista');

// Função para carregar itens salvos do sessionStorage
function carregarLista() {
  const itensSalvos = JSON.parse(sessionStorage.getItem('listaCompras')) || [];

  lista.innerHTML = ''; // Limpa antes de desenhar
  itensSalvos.forEach((item, index) => {
    criarItem(item, index);
  });
}

// Função para criar um novo item visualmente na lista
function criarItem(texto, index) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${texto}
    <button onclick="removerItem(${index})">🗑️</button>
  `;
  lista.appendChild(li);
}

// Função para adicionar um item novo
function adicionarItem() {
  const texto = inputItem.value.trim();
  if (texto === '') {
    alert('Digite um item válido!');
    return;
  }

  const itensSalvos = JSON.parse(sessionStorage.getItem('listaCompras')) || [];
  itensSalvos.push(texto);
  sessionStorage.setItem('listaCompras', JSON.stringify(itensSalvos));

  criarItem(texto, itensSalvos.length - 1);
  inputItem.value = '';
}

// Função para remover um item
function removerItem(index) {
  const itensSalvos = JSON.parse(sessionStorage.getItem('listaCompras')) || [];
  itensSalvos.splice(index, 1); // Remove o item pelo índice
  sessionStorage.setItem('listaCompras', JSON.stringify(itensSalvos));
  carregarLista(); // Atualiza a lista na tela
}

// Evento para o botão "Adicionar"
botaoAdicionar.addEventListener('click', adicionarItem);

// Carregar os itens automaticamente ao abrir a página
carregarLista();
perguntarNome();