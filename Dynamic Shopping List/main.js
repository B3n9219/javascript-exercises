const shoppingList = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", (event) => {
    const item = input.value;
    input.value = "";
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");

    span.textContent = item;
    deleteButton.textContent = "delete";

    deleteButton.addEventListener("click", (event) => {
        listItem.remove();
        input.focus()
    })

    listItem.appendChild(span);
    listItem.appendChild(deleteButton);
    shoppingList.appendChild(listItem);
});
