import ky from 'ky';

document.addEventListener("DOMContentLoaded", async () => {
  const todos = await ky('http://localhost:8083/todo').json();
  console.log(todos);
});