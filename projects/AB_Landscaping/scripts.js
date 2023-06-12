//***************************************************//
// AB Lanscaping site scripts
//***************************************************//

//////////////////////
// Home page
//////////////////////


//////////////////////
// Services page
//////////////////////

function load() {
    generateCard("lawnmower", true, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
    generateCard("trimming", false, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
    generateCard("flowers", true, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
    generateCard("rocks", false, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
}

function generateCard ( img, dir, txt ) {
    // Generate div
    const card = document.createElement("div");
    card.className = "card";
    // Add image
    const pic = document.createElement("img");
    pic.src = "../../assets/images/" + img + ".png";
    // Set image style
    pic.style = (dir) ? "float:left" : "float:right";
    card.appendChild(pic);
    // Add text
    const desc = document.createElement("p");
    desc.innerHTML = txt;
    desc.className = "desc";
    card.appendChild(desc);
    // Get main content div
    const main = document.getElementById("content");
    // Append new div to content
    main.appendChild(card);
}

function openMenu() {
    const drop = document.getElementById("drop-down");
    if ( drop.dataset.isVisible != "true" ) {
        drop.dataset.isVisible = "true";
        drop.style = "display:flex";
    }
}

function closeMenu() {
    const drop = document.getElementById("drop-down");
    drop.dataset.isVisible = "false";
    drop.style = "display:none";
}
