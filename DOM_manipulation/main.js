const container = document.querySelector('#container');

redPara = document.createElement("p");
redPara.classList.add("red");
redPara.textContent = "Hey I'm red!";
container.appendChild(redPara);

blueHeader = document.createElement("h3")
blueHeader.classList.add("blue")
blueHeader.textContent = "I'm a blue h3!";
container.appendChild(blueHeader);

div = document.createElement("div");
div.classList.add("border", "pink-bg");

header = document.createElement("h1");
header.textContent = "I'm in a div"
div.appendChild(header);

para = document.createElement("p");
para.textContent = "ME TOO!"
div.appendChild(para);

container.appendChild(div);






const btn = document.querySelector('#btn2');
btn.onclick = () => alert("Hello World!");

const btn3 = document.querySelector('#btn3');
btn3.addEventListener("click", (e) => {
    e.target.style.background = "blue";
})
