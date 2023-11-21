let extensionState = false;

function updateButtonVisibility(tabId) {
  chrome.tabs.sendMessage(tabId, { action: 'updateButtonVisibility', state: extensionState }, function(response) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
  });
}

function updateButtonVisibilityInAllTabs() {
  chrome.tabs.query({}, function (tabs) {
    for (const tab of tabs) {
      if (tab.url) {
        chrome.tabs.executeScript(tab.id, { code: '(' + updateButtonVisibility + ')(' + tab.id + ')' });
      }
    }
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updateExtensionState') {
    extensionState = request.state;
    // Envia a mensagem para todos os tabs atualizarem a visibilidade do botão
    updateButtonVisibilityInAllTabs();
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.executeScript(tabId, { code: '(' + updateButtonVisibility + ')(' + tabId + ')' });
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.executeScript(activeInfo.tabId, { code: '(' + updateButtonVisibility + ')(' + activeInfo.tabId + ')' });
});

// Adiciona um listener para quando a extensão é instalada ou atualizada
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install' || details.reason === 'update') {
    // Executa alguma lógica após a instalação ou atualização da extensão
    console.log('Extensão instalada ou atualizada');
  }
});
