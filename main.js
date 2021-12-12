window.onload = () => {
  fetch("https://serverless-duquedk1.vercel.app/api/meals")
    .then((res) => res.json())
    .then((data) => {
      const mealsList = document.getElementById("meals-list");
      const template = data.map((x) => "<li>" + x.name + "</li>").join("");
      mealsList.innerHTML = template;
    });
};
