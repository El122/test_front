const showContactInfo = (data) => {
    document.querySelector(".modal-container").style.display = "block";
    for (let key in data)
        document.querySelector(`.modal-content__${key}`).innerText = data[key];
};

const clodeContactInfo = () => {
    document.querySelector(".modal-container").style.display = "none";
};

const generateCard = (data) => {
    const card = document.createElement("div");
    card.classList.add("content-card");
    card.setAttribute("data-search", data.name.toLowerCase());
    card.onclick = () => showContactInfo(data);

    const cardName = document.createElement("h2");
    cardName.classList.add("content-card__title");
    cardName.innerText = data.name;

    const cardPhone = document.createElement("p");
    cardPhone.classList.add("content-card__info", "content-card__info-phone");
    cardPhone.innerText = data.phone;

    const cardEmail = document.createElement("p");
    cardEmail.classList.add("content-card__info", "content-card__info-email");
    cardEmail.innerText = data.email;

    card.appendChild(cardName);
    card.appendChild(cardPhone);
    card.appendChild(cardEmail);

    return card;
};

const getContacts = async () => {
    const data = await fetch("http://127.0.0.1:3000").then((res) => res.json());
    document.querySelector(".content-container").innerHTML = "";

    for (let item of data) {
        document
            .querySelector(".content-container")
            .appendChild(generateCard(item));
    }
};

const filterCards = async () => {
    const search = document.querySelector("#search-input");

    if (search.value.length === 0) return getContacts();

    document.querySelector(".content-container").innerHTML = "";
    const data = await fetch(`http://127.0.0.1:3000?term=${search.value}`).then(
        (res) => res.json()
    );

    for (let item of data) {
        document
            .querySelector(".content-container")
            .appendChild(generateCard(item));
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const search = document.querySelector("#search-input");
    search.onkeyup = filterCards;

    document.querySelector(".modal-back").onclick = clodeContactInfo;
    document.querySelector(".modal-close-btn").onclick = clodeContactInfo;

    getContacts();
});
