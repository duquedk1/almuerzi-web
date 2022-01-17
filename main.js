const stringToHTML = (s) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(s, "text/html");
  return doc.body.firstChild;
};

const renderItem = (item) => {
  const element = stringToHTML(`<li data-id="${item._id}">${item.name}</li>`);
  element.addEventListener("click", () => {
    const mealsList = document.getElementById("meals-list");
    Array.from(mealsList.children).forEach((x) =>
      x.classList.remove("selected")
    );
    element.classList.add("selected");
    const mealsIdInput = document.getElementById("meals-id");
    mealsIdInput.value = item._id;
  });
  return element;
};

window.onload = () => {
  const orderForm = document.getElementById("order");
  orderForm.onsubmit = (e) => {
    e.preventDefault();
    const mealId = document.getElementById("meals-id");
    const mealIdValue = mealId.value;
    //
    if (!mealIdValue) {
      alert("Debes seleccionar un plato");
      return;
    }
    const order = {
      meal_id: mealIdValue,
      user_id: "Daniel",
    };
    console.log(order);
    fetch("https://serverless-duquedk1.vercel.app/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((x) => x.json())
      .then((x) => console.log(x));
  };

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
