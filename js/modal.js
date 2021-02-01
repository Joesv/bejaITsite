let getModal = id => document.getElementById(id);
let getCloseButton = id => document.getElementById(id);

let bindButtonToModal = (modalID, buttonID)=> {
    const closeButton = getCloseButton(buttonID);
    closeButton.onclick = () => {closeModal(modalID)}
};

let closeModal = id => {
    const modal = getModal(id);
    modal.style.display = "none";
};
let openModal = id => {
    const modal = getModal(id);
    modal.style.display = "block";

};
