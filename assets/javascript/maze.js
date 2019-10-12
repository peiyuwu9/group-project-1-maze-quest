
//Fire Base //
var firebaseConfig = {
    apiKey: "AIzaSyAMuI4ukHem5yFtVc8s38IQ0Re3zK1J7lU",
    authDomain: "maze-game-01.firebaseapp.com",
    databaseURL: "https://maze-game-01.firebaseio.com",
    projectId: "maze-game-01",
    storageBucket: "maze-game-01.appspot.com",
    messagingSenderId: "313717969408",
    appId: "1:313717969408:web:7ad33d531eb574536dfee5",
    measurementId: "G-M5C0F7QHKD"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Multiplayer Firebase Variables //

  var database = firebase.database();


  var playersRef = database.ref("players");
  var currentTurnRef = database.ref("turn");
  var username = "";
  var username2 = "";


//----------------------------------------------------//




$(document).ready(function(){
    
    var template = [

// 0 is wall ; 1 is empty
//1
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//2
    0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,
//3
    0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,
//4
    0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,
//5
    0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,
//6
    0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,
//7
    0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,
//8
    0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
//9
    0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
//10
    0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,
//11
    0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,
//12
    0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,1,1,1,1,1,0,1,0,
//13
    0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,0,0,0,1,0,
//14
    0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,
//15
    0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,1,0,
//16
    0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,0,
//17
    0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,0,1,0,
//18
    0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,
//19
    0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,0,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,1,0,
//20
    0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,
//21
//22
    0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1,0,1,1,0,
//23
    0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,
//24
    1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,2,
//25
    0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,
//26
    0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,
//27
    0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,
//28
    0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,
//29
    0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,
//30
    0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,
//31
    0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
//32
    0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
//33
    0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
//34
    0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,
//35
    0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,
//36
    0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,
//37
    0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,
//38
    0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,0,
//39
    0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,
//40
    0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,
//41
    0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,1,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,1,0,
//42
    0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,0,
//43
    0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,
//44
    0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,
//45
    0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,
//46
    0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,
//47
    0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,
//48
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    
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

    var moveTrack = [];
    
    //Set up start location of player 1
    var player = new Object ({
        x   :0,
        y   :22,
        loc :1166,
        moves:0
    });
    
    var x = 0;
    var y = 0;

    //Set up start location of player 2

    var player2 = new Object ({
        x   :0,
        y   :24,
        loc :1272, 
        moves:0
    });
    
    var x = 0;
    var y = 0;

    
    //Save maze states in each cell
    for (var i = 0; i < ((53 * 47) + 1) ; i++) {
        maze.push ({
            "x"     : x , 
            "y"     : y , 
            "state" : template[i]
        });
            if (x == 52){
                y++;
                x = 0;
            }
            else {
                x++;
        }
    }

    //Push location record to move tracker
    function moveTracker() {
        moveTrack.push({
        "x"  : x , 
        "y"  : y , 
        "loc": player.loc
        })
    }

     //Push location record to move tracker for PLayer 2
        function moveTracker2() {
            moveTrack2.push({
            "x"  : x , 
            "y"  : y , 
            "loc": player2.loc
            })
        }
        
    
    //Generate key in function for moving
    document.onkeydown = function (event) {

        switch (event.keyCode) {
    
            //Right
            case 68:
                //Once players click right key, players x loction will add 1 and moves willl increase 1. If hitting the wall, the right key wont't do anything. 

                if (player.x != 52){
                    player.loc ++;
                    if (maze[player.loc].state != 0 ){

                        //Paint where players were before they click keys
                        // player.x * 
                        ctx.rect(player.x * 15, player.y * 15, 15 ,15);
                        ctx.fill();
                        player.x ++;
                        player.moves ++;
                        moveTracker();
                    }
                    else (player.loc--);
                }
                break;
            
            //Left
            case 65:
                //Once players click left key, players x loction will decrease 1 and moves willl increase 1. If hitting the wall, the left key wont't do anything.


                if (player.x !=0){
                    player.loc --;
                    if (maze[player.loc].state != 0 ){

                        //Paint where players were before they click keys
                        ctx.rect(player.x * 15, player.y * 15, 15 ,15);
                        ctx.fill();
                        player.x --;
                        player.moves ++;
                        moveTracker();
                    }
                    else (player.loc++);
                }
                break;
    
            //Down
            case 83:
                //Once players click down key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the down key wont't do anything. 
                
                if (player.y !=46){

                    //player.loc += 53;
                    player.loc += 53;
                    if (maze[player.loc].state != 0 ){

                        //Paint where players were before they click keys
                        ctx.rect(player.x * 15, player.y * 15, 15 ,15);
                        ctx.fill();
                        player.y ++;
                        player.moves ++;
                        moveTracker();
                    }

                    else (player.loc -= 53);
                    
                }
                break;
            
            //Up
            case 87:
                //Once players click up key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the up key wont't do anything.

                if (player.y !=0){

                    player.loc -= 53;
                    if (maze[player.loc].state != 0 ){

                        //Paint where players were before they click keys
                        ctx.rect(player.x * 15, player.y * 15, 15 ,15);
                        ctx.fill();
                        player.y --;
                        player.moves ++;
                        moveTracker();
                    }

                    else (player.loc += 53);
                }
                break;
        }
    
        console.log(moveTrack);

        //Put image of where players are
        ctx.drawImage(cat, player.x * 15, player.y * 15, 15, 15);
        // ctx.fill();
    
        //Print moves on screen
        document.getElementById("moves").innerText = "Moves: " + player.moves;

        //When players' location match exit location, players win.
        if (maze[player.loc].state == 2) {
            document.getElementById("moves").innerText = "You win!";
            // location.reload();
        }
    
    }

                    //Player 2 Key Functions //
    //----------------------------------------------------------//

     //Generate key in function for moving
     document.onkeydown = function (event) {

        switch (event.keyCode) {
    
            //Right
            case 68:
            //Once player2 click right key, players x loction will add 1 and moves willl increase 1. If hitting the wall, the right key wont't do anything. 

                if (player2.x != 52){
                    player2.loc ++;
                    if (maze[player2.loc].state != 0 ){

                        //Paint where players were before they click keys
                        // player2.x * 
                        ctx.rect(player2.x * 15, player2.y * 15, 15 ,15);
                        ctx.fill();
                        player2.x ++;
                        player2.moves ++;
                        moveTracker2();
                    }
                    else (player2.loc--);
                }
                break;
            
            //Left
            case 65:
                //Once players click left key, players x loction will decrease 1 and moves willl increase 1. If hitting the wall, the left key wont't do anything.


                if (player2.x !=0){
                    player2.loc --;
                    if (maze[player2.loc].state != 0 ){

                        //Paint where players were before they click keys
                        ctx.rect(player2.x * 15, player2.y * 15, 15 ,15);
                        ctx.fill();
                        player2.x --;
                        player2.moves ++;
                        moveTracker2();
                    }
                    else (player2.loc++);
                }
                break;
    
            //Down
            case 83:
                //Once players click down key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the down key wont't do anything. 
                
                if (player2.y !=46){

                    //player.loc += 53;
                    player2.loc += 53;
                    if (maze[player2.loc].state != 0 ){

                        //Paint where players were before they click keys
                        ctx.rect(player2.x * 15, player2.y * 15, 15 ,15);
                        ctx.fill();
                        player2.y ++;
                        player2.moves ++;
                        moveTracker2();
                    }

                    else (player2.loc -= 53);
                    
                }
                break;
            
            //Up
            case 87:
                //Once players click up key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the up key wont't do anything.

                if (player2.y !=0){

                    player2.loc -= 53;
                    if (maze[player2.loc].state != 0 ){

                        //Paint where players were before they click keys
                        ctx.rect(player2.x * 15, player2.y * 15, 15 ,15);
                        ctx.fill();
                        player2.y --;
                        player2.moves ++;
                        moveTracker2();
                    }

                    else (player2.loc += 53);
                }
                break;
        }
    
        console.log(moveTrack);



        //----------------------------------//

        //Put image of where players are
        ctx.drawImage(cat, player.x * 15, player.y * 15, 15, 15);

                             //Player 2 Image //
        //--------------------------------------------------//

        ctx.drawImage(cat, player2.x * 15, player2.y * 15, 15, 15);
               
        // ctx.fill();
    
        //Print moves on screen
        document.getElementById("moves").innerText = "Moves: " + player.moves;
        //Player 2 moves on screen counter
        document.getElementById("moves2").innerText = "Moves: " + player2.moves;

        //When players' location match exit location, players win.
        if (maze[player.loc].state == 2) {
            document.getElementById("moves").innerText = "You win!";
            // location.reload();
        }

        if (maze[player2.loc].state == 2) {
            document.getElementById("moves2").innerText = "You win!";
            // location.reload();
        }
    
    }
    
    document.getElementById("start-button").onclick = start;
    
    function start(){
    
        //Put image of where players are
        ctx.drawImage(cat, player.x * 15, player.y * 15, 15, 15);

        //Drawing the wall and goal

        for(var i=0; i < ((53 * 47) + 1) ; i++){
            if (maze[i].state == 0 || maze[i].state == "0") {
                ctx.drawImage(wall, maze[i].x * 15, maze[i].y * 15, 15, 15);
            }
            
            if (maze[i].state == 2 || maze[i].state == "2") {
                ctx.drawImage(tuna, maze[i].x * 15, maze[i].y * 15, 15, 15);
            }
        }
    }


//Enter Username for Player 1


$("#plyer1Name").on("click", function(event){
    event.preventDefault();
   username = $("#usernameEnter").val().trim();
  // username.child('#usernameEnter').update();
   database.ref().push({
       username: username,
       
   });

});

//DatabaseListener

database.ref().on("child_added", function(snapshot) {
    var ss = snapshot.val();

    // var addUser =

 
     $("#player1-name").text(ss.username);
     $("#player2-name").text(ss.username2);
 
 
     console.log(ss.username);
 
     $("#player1-name").append();
     $("#player2-name").append();
 
 
     return   
   
 
 });

//Enter Username for Player 2

$("#plyer2Name").on("click", function(event){
    event.preventDefault();
   username2 = $("#usernameEnter2").val().trim();
  
   database.ref().push({
       username2: username2,
       
   })

});
});