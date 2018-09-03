export function sendHtml(content: string, selector = 'main') {
  const target = document.querySelector(selector);
  target.innerHTML = content;
}
