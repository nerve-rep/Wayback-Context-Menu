// Создаём пункты контекстного меню при установке расширения
chrome.runtime.onInstalled.addListener(() => {
  // Пункт для страницы
  chrome.contextMenus.create({
    id: "openPageInWayback",
    title: "↗️ Wayback Machine",
    contexts: ["page"]
  });

  // Пункт для ссылки
  chrome.contextMenus.create({
    id: "openLinkInWayback",
    title: "↗️ Wayback Machine",
    contexts: ["link"]
  });

  // Пункт для выделенного текста
  chrome.contextMenus.create({
    id: "openSelectionInWayback",
    title: "↗️ Wayback Machine",
    contexts: ["selection"]
  });
});

// Функция проверки, является ли текст URL
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

// Обрабатываем клики по пунктам меню
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let url;

  if (info.menuItemId === "openPageInWayback") {
    url = info.pageUrl;
  } else if (info.menuItemId === "openLinkInWayback") {
    url = info.linkUrl;
  } else if (info.menuItemId === "openSelectionInWayback") {
    const selection = info.selectionText.trim();
    if (isValidUrl(selection)) {
      url = selection;
    }
  }

  if (url) {
    const archiveUrl = `https://web.archive.org/web/*/${url}`;
    chrome.tabs.create({ url: archiveUrl });
  }
});
