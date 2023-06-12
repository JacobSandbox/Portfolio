// Hitomezashi generator scripts

const width       = 20;
const height      = 13;
const borderWidth = 5;
const boxSize     = 40;

// Load
function generate() {
    const grid = document.getElementById("grid");

    // Create grid of divs
    for ( let y = 0; y < height; y++ ) {
        const row = document.createElement("div");
        row.className = "row";
        grid.append(row);
        for ( let x = 0; x < width; x++ ) {
            const box = document.createElement("div");
            box.className = "box";
            box.id = x + "," + y;
            box.style = "width: " + boxSize + "px; height: " + boxSize + "px;";
            row.append(box);
        }
    }

    // Setup inputs
    // top inputs
    const t_in = document.getElementById("top-input");
    for ( let x = 0; x < width; x++ ) {
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.className = "input top";
        checkBox.id = "ct" + x;
        t_in.append(checkBox);
    }

    // left input
    const l_in = document.getElementById("left-input");
    for ( let y = 0; y < height; y++ ) {
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.className = "input left";
        checkBox.id = "cl" + y;
        l_in.append(checkBox);
    }
}

// Pattern generation
function createHitomezashi() {
    for ( let y = 0; y < height; y++ ) { 
        for ( let x = 0; x < width; x++ ) {
            const box = document.getElementById(x + "," + y);
            if ( box ) {
                // Determine if a stitch should be drawn
                let stitch = "";

                // check horizontal
                let doStitch = ( x % 2 == 0 ) ? true : false;
                if ( document.getElementById("cl" + y).checked  ) doStitch = !doStitch;
                // Stitch horizontal
                if ( doStitch ) {
                    stitch += "border-top-color: black;";
                }

                // Check vertical
                doStitch = ( y % 2 == 0 ) ? true : false;
                if ( document.getElementById("ct" + x).checked  ) doStitch = !doStitch;
                // Stitch vertical
                if ( doStitch ) {
                    stitch += "border-left-color: black";
                }

                box.style = "width: " + boxSize + "px;" + "height: " + boxSize + "px; " + stitch;
            }
        }
    }
}

function resetGrid() {
    // Reset grid styles and inputs
    for ( let y = 0; y < height; y++ ) {
        let cb = document.getElementById("cl" + y);
        if ( cb.checked ) cb.click();

        for ( let x = 0; x < width; x++ ) {
            document.getElementById(x + "," + y).style = "width: " + boxSize + "px;" + "height: " + boxSize + "px; ";
            cb = document.getElementById("ct" + x);
            if ( cb.checked ) cb.click();
        }
    }
}

function randomizeGrid() {
    // Randomize top and left inputs

    // Left
    for ( let i = 0; i < height; i++ ) {
        let value = Math.random() >= 0.5 ? true : false;
        let cb = document.getElementById("cl" + i);
        if ( cb.checked != value ) cb.click();
    }

    // top
    for ( let i = 0; i < width; i++ ) {
        let value = Math.random() >= 0.5 ? true : false;
        let cb = document.getElementById("ct" + i);
        if ( cb.checked != value ) cb.click();
    }

    // Then draw grid
    createHitomezashi();
}