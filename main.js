let form = document.querySelector("#addForm");
let itemsList = document.querySelector("#items");
let filter = document.querySelector("#filter");

// Добавление новой задачи прослушка события
form.addEventListener("submit", addItem);

// Удаление элемента из списка - прослушка клика
itemsList.addEventListener("click", removeItem);

// Фильтрация списка дел - прослушка ввода
filter.addEventListener("keyup", filterItems);

// Добавление новой задачи
function addItem(e) {
  // Отмена отправки формы
  e.preventDefault();
  // Находим инпут с текстом для новой задачи
  let newItemInp = document.querySelector("#newItemText");
  // получаем текст из инпута
  let newItemText = newItemInp.value;

  // создание виртуального элемента со списком для новой задачи через шаблонные строки
  let markup = `<li class="list-group-item">
${newItemText}
<button
    data-action="delete"
    type="button"
    class="btn btn-light btn-sm float-right"
>
    Удалить
</button> </li>`;

  // создание виртуального элемента со списком для новой задачи
  // let newElement = document.createElement("li");
  // newElement.className = "list-group-item";
  // Добавить текст в новый элемент
  // let newTextNode = document.createTextNode(newItemText);
  // newElement.appendChild(newTextNode);

  //Создаем кнопку
  // let deleteBtn = document.createElement("button");
  // добавляем текст в кнопку
  // deleteBtn.appendChild(document.createTextNode("Удалить"));
  // Добавляем css класс в кнопку
  // deleteBtn.className = "btn btn-light btn-sm float-right";
  // добавляем data- атрибут
  // deleteBtn.dataset.action = "delete";
  // помещаем кнопку внутрь тего Li
  // newElement.appendChild(deleteBtn);

  // Добавление новой задачи в список со всеми задачами
  // itemsList.prepend(newElement);

  itemsList.insertAdjacentHTML("afterbegin", markup);
  // Очистить поле добавления новой задачи

  newItemInp.value = "";
}

// Удаление элемента - функция
function removeItem(e) {
  if (
    e.target.hasAttribute("data-action") &&
    e.target.getAttribute("data-action") == "delete"
  ) {
    if (confirm("Удалить задачу?")) {
      e.target.parentNode.remove();
    }
  }
}

// Фильтрация списка - функция
function filterItems(e) {
  // Получаем фразу для поиска и переводим ее в нижний регистр(свойство toLowerCase)
  let searchedText = e.target.value.toLowerCase();

  // 1. Получить список всех задач
  let items = itemsList.querySelectorAll("li");
  // 2. Перебор циклом все найденные теги li с задачами
  items.forEach(function (item) {
    // Получаем текст из задачи из спискаи переводим его в нижн регистр
    let itemText = item.firstChild.textContent.toLowerCase();
    // Провереям вхождение искомой подстроки в текст задачиы
    if (itemText.indexOf(searchedText) != -1) {
      // Если вхождения нет, то элемент с задачей не показываем
      item.style.display = "block";
    } else {
      // Если вхождение есть - показываем элемент с задачей
      item.style.display = "none";
    }
  });
}
