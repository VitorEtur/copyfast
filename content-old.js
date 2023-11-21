chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'copyArea') {
      // Especificar as coordenadas desejadas
      var startX = 417;
      var startY = 499;
      var endX = 809;
      var endY = 498;
  
      // Obter os elementos nas coordenadas especificadas
      var startElement = document.elementFromPoint(startX, startY);
      var endElement = document.elementFromPoint(endX, endY);
  
      // Verificar se os elementos foram encontrados
      if (startElement && endElement) {
        // Criar um intervalo de seleção com base nos elementos encontrados
        var range = document.createRange();
        range.setStartBefore(startElement);
        range.setEndAfter(endElement);
  
        // Selecionar o texto na área especificada
        var textoCopiado = range.toString();
  
        // Criar um elemento de área de transferência temporário e copiar o texto para ele
        var tempInput = document.createElement('textarea');
        document.body.appendChild(tempInput);
        tempInput.value = textoCopiado;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
  
        // Você pode adicionar lógica adicional conforme necessário
  
        alert('Área copiada para a área de transferência!');
      } else {
        alert('Elementos não encontrados nas coordenadas especificadas.');
      }
    }
  });
  