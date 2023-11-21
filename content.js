function copyArea() {
  var tabela = document.querySelector('.dadosPrincipais');

  if (tabela) {
    var linhas = tabela.querySelectorAll('tr');
    var dadosCopiados = '';

    for (var i = 1; i < linhas.length; i++) {
      var celulas = linhas[i].querySelectorAll('td');
      var colunaCodigo = celulas[0] ? celulas[0].innerText.trim() : '';
      var colunaCodImport = celulas[1] ? celulas[1].innerText.trim() : '';
      var colunaNome = celulas[2] ? celulas[2].innerText.trim() : '';
      var colunaTelefone = celulas[3] ? celulas[3].innerText.trim() : '';

      dadosCopiados += `${colunaCodigo}\t${colunaCodImport}\t${colunaNome}\t${colunaTelefone}\n`;
    }

    var tempInput = document.createElement('textarea');
    document.body.appendChild(tempInput);
    tempInput.value = dadosCopiados;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    console.log('ok');

    return true;
  } else {
    alert('Tabela não encontrada na página.');
    console.log('erro');

    return false;
  }
}

let extensionDisabled = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updateButtonVisibility') {
    extensionDisabled = request.state;
    updateFloatingButtonVisibility(extensionDisabled);
  }
});

function updateFloatingButtonVisibility(extensionDisabled) {
  const button = document.getElementById('buttonId');

  if (button) {
    if (extensionDisabled) {
      button.style.display = 'none';
    } else {
      button.style.display = 'block';
    }
  }
}

const button = document.createElement('button');
button.innerHTML = 'Copy';
button.style.position = 'fixed';
const savedX = localStorage.getItem('buttonX');
const savedY = localStorage.getItem('buttonY');
button.style.left = savedX ? savedX + 'px' : '50%';
button.style.top = savedY ? savedY + 'px' : '33%';
button.style.padding = '5px';
button.style.borderRadius = '5px';
button.style.backgroundColor = '#0078d4';
button.style.color = '#fff';
button.style.cursor = 'pointer';
document.body.appendChild(button);

button.addEventListener('click', function () {
  button.style.backgroundColor = copyArea() ? '#00FF00' : '#FF0000';
});

let isDragging = false;
let offset = { x: 0, y: 0 };

button.addEventListener('mousedown', function (e) {
  isDragging = true;
  offset = { x: e.clientX - button.getBoundingClientRect().left, y: e.clientY - button.getBoundingClientRect().top };
});

document.addEventListener('mousemove', function (e) {
  if (isDragging) {
    button.style.left = e.clientX - offset.x + 'px';
    button.style.top = e.clientY - offset.y + 'px';
  }
});

document.addEventListener('mouseup', function () {
  localStorage.setItem('buttonX', button.getBoundingClientRect().left);
  localStorage.setItem('buttonY', button.getBoundingClientRect().top);
  isDragging = false;
});

button.addEventListener('click', function () {
  button.style.backgroundColor = copyArea() ? '#00FF00' : '#FF0000';
});
