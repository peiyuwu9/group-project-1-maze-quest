$(document).ready(function(){

    var template = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,1,0,0,0,0,0,1,1,0,1,
        1,1,1,1,0,1,0,1,1,1,0,1,1,0,1,
        0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,
        0,1,0,1,0,1,1,1,0,1,0,1,1,0,1,
        0,1,0,1,0,0,0,1,0,1,0,1,1,0,1,
        0,1,0,1,1,1,0,1,0,1,0,1,1,0,1,
        0,1,0,0,0,0,0,1,0,1,0,1,1,0,1,
        0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,
        0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,
        1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
        0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,0,2
    ];
    
    var canvas = document.getElementById("canvas");
    
    var ctx = canvas.getContext("2d");
    
    var cat = new Image();
    cat.src = "assets/images/cat.png";
    
    var tuna = new Image();
    tuna.src = "assets/images/cat.png";
    
    var wall = new Image();
    wall.src = "assets/images/wall.png";
    
    var maze = [];
    
    //Set up start loaction of player //loc 53
    var player = new Object ({
        x:0,
        y:1,
        loc:15,
        moves:0
    });
    
    var x = 0;
    var y = 0;
    
    //Save maze states in each cell // ((53 * 48) + 1)
    for (var i = 0; i < ((15 * 15) + 1) ; i++) {
        maze.push ({
            "x"     : x , 
            "y"     : y , 
            "state" : template[i]
        });
            // x == 52
            if (x == 14){
                y++;
                x = 0;
            }
            else {
                x++;
        }
    }

    
    
    //Generate key in function for moving
    document.onkeydown = function (event) {

        switch (event.keyCode) {
    
            //Right
            case 39:
                //Once players click right key, players x loction will add 1 and moves willl increase 1. If hitting the wall, the right key wont't do anything. 

                // x != 52
                if (player.x != 14){
                    player.loc ++;
                    if (maze[player.loc].state != 1 ){

                        //Clear where players were before they click keys
                        // player.x * 
                        ctx.clearRect(player.x * 15, player.y * 15, 15 ,15);
                        player.x ++;
                        player.moves ++;
                    }
                    else (player.loc--);
                }
                break;
            
            //Left
            case 37:
                //Once players click left key, players x loction will decrease 1 and moves willl increase 1. If hitting the wall, the left key wont't do anything.

                // x != 52
                if (player.x !=0){
                    player.loc --;
                    if (maze[player.loc].state != 1 ){

                        //Clear where players were before they click keys
                        ctx.clearRect(player.x * 15, player.y * 15, 15, 15);
                        player.x --;
                        player.moves ++;
                    }
                    else (player.loc++);
                }
                break;
    
            //Down
            case 40:
                //Once players click down key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the down key wont't do anything. 
                
                // x != 52
                if (player.y !=14){

                    //player.loc += 53;
                    player.loc += 15;
                    if (maze[player.loc].state != 1 ){

                        //Clear where players were before they click keys
                        ctx.clearRect(player.x * 15, player.y * 15, 15, 15);
                        player.y ++;
                        player.moves ++;
                    }
                    //player.loc -= 53;
                    else (player.loc -= 15);
                    
                }
                break;
            
            //Up
            case 38:
                //Once players click up key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the up key wont't do anything.

                // x != 52
                if (player.y !=0){

                    //player.loc -= 53;
                    player.loc -= 15;
                    if (maze[player.loc].state != 1 ){

                        //Clear where players were before they click keys
                        ctx.clearRect(player.x * 15, player.y * 15, 15, 15);
                        player.y --;
                        player.moves ++;
                    }
                    //player.loc += 53;
                    else (player.loc += 15);
                }
                break;
        }
    
        //When players' location match exit location, players win.
        if (maze[player.loc].state == 2) {
            alert("You win!!");
            location.reload();
        }

        //Put image of where players are
        ctx.drawImage(cat, player.x * 15, player.y * 15, 15, 15);
    
        //Print moves on screen
        document.getElementById("moves").innerText = "Moves: " + player.moves;
    
    }
    
    document.getElementById("start-button").onclick = start;
    
    function start(){
    
        //Put image of where players are
        ctx.drawImage(cat, player.x * 15, player.y * 15, 15, 15);

        //Drawing the wall and goal

        // ((53 * 48) + 1)
        for(var i=0; i < ((15 * 15) + 1) ; i++){
            if (maze[i].state == 1 || maze[i].state == "1") {
                ctx.drawImage(wall, maze[i].x * 15, maze[i].y * 15, 15, 15);
            }
            
            if (maze[i].state == 2 || maze[i].state == "2") {
                ctx.drawImage(tuna, maze[i].x * 15, maze[i].y * 15, 15, 15);
            }
        }

        
    }
})