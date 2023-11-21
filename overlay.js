document.addEventListener('DOMContentLoaded', function () {
    var overlayButton = document.getElementById('overlayButton');
  
    // Adiciona um ouvinte de clique ao botão
    overlayButton.addEventListener('click', function () {
      // Envie uma mensagem para o script de conteúdo quando o botão for clicado
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'copyArea' });
      });
    });
  
    // Adiciona funcionalidade de arrastar ao botão
    var isDragging = false;
    var offsetX, offsetY;
  
    overlayButton.addEventListener('mousedown', function (event) {
      isDragging = true;
      offsetX = event.clientX - overlayButton.getBoundingClientRect().left;
      offsetY = event.clientY - overlayButton.getBoundingClientRect().top;
    });
  
    document.addEventListener('mousemove', function (event) {
      if (isDragging) {
        overlayButton.style.left = event.clientX - offsetX + 'px';
        overlayButton.style.top = event.clientY - offsetY + 'px';
      }
    });
  
    document.addEventListener('mouseup', function () {
      isDragging = false;
    });
  });
  