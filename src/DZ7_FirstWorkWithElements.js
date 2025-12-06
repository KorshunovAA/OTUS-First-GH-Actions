//pApp(document.querySelector('#app'));

export function pApp(el) {
  el.innerHTML = `
    <input />
    <button hidden>Добавить новый параграф</button>
    <p class="paragraf">Текст первого параграфа</p>
    <p class="paragraf">Текст второго параграфа</p>
    <p class="paragraf">Текст третьего параграфа</p>
`;

  const input = el.querySelector("input");
  const button = el.querySelector("button");

  input.addEventListener("input", () => {
    button.hidden = !input.value;
  });

  button.addEventListener("click", () => {
    const newP = document.createElement("p");
    newP.innerHTML = input.value;
    newP.classList.add("paragraf"); // Присвоили новому элементу свойства класса "paragraf"
    el.appendChild(newP);
    input.value = "";
    button.hidden = true;

    const pList = el.querySelectorAll("p");
    if (pList.length > 5) {
      pList[0].remove();
    }
  });
}
