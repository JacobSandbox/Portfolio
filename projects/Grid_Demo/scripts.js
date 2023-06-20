// Grid demo scripts

function loadScene() {
    generateGrid();
    document.onmousemove = handleMouse;
}

/*function generateGrid() {
    const grid = document.getElementById("grid");
    const sizes = ["tiny", "small", "medium", "large"];
    for ( let s = 0; s < 4; s++ ) {
        for ( let i = 0; i < 3; i++ ) {
            const square = document.createElement("div");
            square.className = "square " + sizes[s] + " " + i;
            grid.append(square);
        }
    }
}*/

function generateGrid() {
    const sizes = ["large", "medium", "small", "tiny"];
    const names = ["zero", "one", "two", "three"];
    // Get starting grid container
    var container = document.getElementById("grid");
    // Loop through all sizes and make four squares
    for ( let s of Array(4).keys() ) {
        for ( let i of Array(4).keys() ) {
            const square = document.createElement("div");
            // Last square is next container for next smaller size
            square.className = "square " + sizes[s] + " " + names[i];
            container.append(square);
            if ( i == 3 ) {
                square.id = "sub" + sizes[s];
                square.className += " container";
                container = square;
                // Very last square
                if ( s == 3 ) {
                    square.id = "last";
                }
            }
        }
    }
    
}

function rotateCoords ( x, y ) {
    // XOR inputs with 0,1
    // then swap coords
    let newX = (y+1 == 1) ? 1 : 0;
    return {x: newX, y: x};
}

function locateInRect ( point, rect ) {
    // Find which quarter the point lies in the givin rect
    //
    // Calc point location in rect (from 0.0 - 1.0 mapping to rect size)
    let pos = {x: (point.x - rect.left) / rect.width, y: (point.y - rect.top) / rect.height};
    let offset = 0;
    offset += (pos.x >= 0.5) ? 1 : 0;
    offset += (pos.y >= 0.5) ? 2 : 0;
    //offset = (pos.x >= 0.5 && pos.y >= 0.5) ? 2 : offset;
    return offset;
}

function handleMouse( mouse ) {
    // Create size table
    const sizes = ["large", "medium", "small", "tiny"];

    // Rotate grid at each size level to avoid mouse
    for ( let size of Array(4).keys()) {
        // Find location of mouse in current size's container
        let rect = document.getElementById("grid").getBoundingClientRect();
        if ( mouse.pageX < rect.left || mouse.pageX > (rect.left+rect.width) || mouse.pageY < rect.top || mouse.pageY > (rect.top+rect.height) ) break;
        if ( size > 0 ) rect = document.getElementById("sub" + sizes[size-1]).getBoundingClientRect();
        let offset = locateInRect({x:mouse.pageX, y:mouse.pageY}, rect);
        //console.log("size: ", size, "mouse: ", mouse, "rect: ", rect, "offset: ", offset);
        /*
        // Rotate square coords
        var coords = {x:0, y:0};
        for ( let i = 0; i < offset+1; i++ ) {
            // rotate coords for squares
            coords = rotateCoords(coords.x, coords.y);
        }

        // place squares
        for ( let i = 0; i < 4; i++ ) {
            const box = document.getElementsByClassName("square " + sizes[size] + " " + i);
            box[0].style = "grid-area: " + (coords.y+1) + " / " +  (coords.x+1) + " / span 1 / span 1";
            coords=rotateCoords(coords.x,coords.y);
        }
        */
       // Set order of square to apply rotation
        document.getElementsByClassName("square " + sizes[size] + " zero")[0].style = "order: " + ((offset + 1) % 4);
        document.getElementsByClassName("square " + sizes[size] + " one")[0].style = "order: " + ((offset + 2) % 4);
        document.getElementsByClassName("square " + sizes[size] + " two")[0].style = "order: " + ((offset + 3) % 4);
        document.getElementsByClassName("square " + sizes[size] + " three container")[0].style = "order: " + offset;

    }

}
