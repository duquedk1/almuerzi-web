const stringToHTML = (s) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(s, "text/html");
  return doc.body.firstChild;
};

const renderItem = (item) => {
  const element = stringToHTML(`<li data-id="${item._id}">${item.name}</li>`);
  element.addEventListener("click", () => {
    element.classList.add("selected");
    element.classList.remove("selected")
  });
  return element;
};

window.onload = () => {
  fetch("https://serverless-duquedk1.vercel.app/api/meals")
    .then((res) => res.json())
    .then((data) => {
      const mealsList = document.getElementById("meals-list");
      const submit = document.getElementById("submit");
      const listItems = data.map(renderItem);
      mealsList.removeChild(mealsList.firstElementChild);
      //const template = data.map(renderItem).join("");
      listItems.forEach((element) => mealsList.appendChild(element));
      //mealsList.innerHTML = template;
      submit.removeAttribute("disabled");
    });
};
