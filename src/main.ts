import { mount } from 'svelte';
import App from './App.svelte';
import './app.css';

function renderFallback(): void {
  const target = document.getElementById('app');
  if (!target) return;
  target.innerHTML =
    '<div style="font-family:sans-serif;padding:2rem;max-width:32rem;margin:0 auto;text-align:center;">' +
    '<h1 style="font-size:1.25rem;margin:0 0 0.5rem;">加载失败</h1>' +
    '<p style="color:#666;margin:0 0 1rem;">应用初始化时发生错误，请刷新页面重试。</p>' +
    '<button type="button" onclick="location.reload()" ' +
    'style="background:#b8732d;color:#fff;border:0;padding:0.6rem 1.25rem;' +
    'border-radius:0.5rem;font-size:0.95rem;cursor:pointer;font-family:inherit;">' +
    '刷新页面</button></div>';
}

try {
  mount(App, { target: document.getElementById('app')! });
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('App failed to mount:', err);
  renderFallback();
}
