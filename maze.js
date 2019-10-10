var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

var cat = new Image();
cat.src = "assets/images/cat.png";

var tuna = new Image();
tuna.src = "assets/images/cat.png";

var wall = new Image();
wall.src = "assets/images/wall.png";

var maze = [];

//Set up start loaction of player
var player = new object ({
    x:0,
    y=1,
    loc:15,
    moves:0
})

var x = 0;
var y = 0;

//Generate maze
for (var i=o; i<=15 ; 1++) {
    maze.push ({"x":x, "y":y, "state": template[i]});
     if (x = 14){
        y++;
        x = 0;
     }
     else {
        x++;
    }
}

//Generate key in function for moving
function keypress(event) {
    switch (event.keycode) {

        //Right 
        case 39:
            //Once players click right key, players x loction will add 1 and moves willl increase 1. If hitting the wall, the right key wont't do anything. 
            if (player.x != 14){
                player.loc ++;
                if (maze[player,loc].state != 1 ){
                    ctx.clearRect(player.x = 32, player.y = 32, 32, 32);
                    player.x ++;
                    player.moves ++;
                }
                else (player.loc--);
            }
            break;
        
        //Left 
        case 37:
                //Once players click left key, players x loction will decrease 1 and moves willl increase 1. If hitting the wall, the left key wont't do anything.  
                if (player.x !=0){
                    player.loc --;
                    if (maze[player,loc].state != 1 ){
                        ctx.clearRect(player.x = 32, player.y = 32, 32, 32);
                        player.x --;
                        player.moves ++;
                    }
                    else (player.loc++);
                }
                break;

        //Down 
        case 40:
                //Once players click down key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the down key wont't do anything.   
                if (player.y !=14){
                    player.loc += 15;
                    if (maze[player,loc].state != 1 ){
                        ctx.clearRect(player.x = 32, player.y = 32, 32, 32);
                        player.y ++;
                        player.moves ++;
                    }
                    else (player.loc -= 15);
                    
                }
                break;
        
        //Up 
        case 38:
                //Once players click up key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the up key wont't do anything.   
                if (player.y !=0){
                    player.loc -= 15;
                    if (maze[player,loc].state != 1 ){
                        ctx.clearRect(player.x = 32, player.y = 32, 32, 32);
                        player.y --;
                        player.moves ++;
                    }
                    else (player.loc += 15);
                }
                break;
    }

    ctx.drawImage(cat, player.x=32, player.y = 32, 32, 32);

    //When players' location match exit location, players win.
    if (maze[player.loc].state == 2) {
        alert("You win!!");
        location.reload();
    }

    //Print moves on screen
    document.getElementById("moves").innerHTML = "Moves: " + player.moves;

}

function start(){

    //Drawing the wall and goal
    for(var i=o; i<=15; i++){
        if (maze[i].state ==1 || maze[i].state == "1") {
            ctx.drawImage(wall, maze[i].x = 32, maze[1].y = 32, 32, 32);
        }
        
        if (maze[i].state ==2 || maze[i].state == "2") {
            ctx.drawImage(tuna, maze[i].x = 32, maze[1].y = 32, 32, 32);
        }
    }

    //Drawing players location
    ctx.drawImage(cat, player.x =32, player.y =32, 32, 32);

    window.addEventListener("keydown", keypress, true);
}