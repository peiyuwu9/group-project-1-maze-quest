$(document).ready(function(){

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

  var username = "";
  var username2 = "";
  var currentPlayers = null;
  var playerNum = false;
  var playerOneExists = false;
  var playerTwoExists = false;
  var playerOneData = null;
  var playerTwoData = null;


    //-------------------------------------------------//
    
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
    1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,
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
    

    //hero image array

    
    var ninja = new Image();
    ninja.src = "assets/images/ninja.png";

    var knight = new Image();
    knight.src = "assets/images/greenKnight.png";
    
    var tuna = new Image();
    tuna.src = "assets/images/treasure.png";
    
    var wall = new Image();
    wall.src = "assets/images/brickwall.png";
    
    var maze = [];

    var moveTrack = [];

    var moveTrack2 = [];

   
    //-----------------------------------------------//
    
    //Set up start location of player 1
    var player = new Object ({
        x   :0,
        y   :22,
        loc :1166,
        moves:0
    });
    var x = 0;
    var y = 0;

    // //Set up start location of player 2

    var player2 = new Object ({
        x2   :0,
        y2   :24,
        loc2 :1272, 
        moves2:0
    });
    
    var x2 = 0;
    var y2 = 0;


    
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
            "x"  : x2 , 
            "y"  : y2 , 
            "loc": player2.loc2
            })
        }
    
//KEY FUNCTION FOR PLAYER 1 //

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



                //PLAYER 2 CONTROLS
    
            //Right
            case 76:
                //Once players click right key, players x loction will add 1 and moves willl increase 1. If hitting the wall, the right key wont't do anything. 

                if (player2.x2 != 52){
                    player2.loc2 ++;
                    if (maze[player2.loc2].state != 0 ){

                        //Paint where players were before they click keys
                        // player.x * 
                        ctx.rect(player2.x2 * 15, player2.y2 * 15, 15 ,15);
                        ctx.fill();
                        
                        player2.x2 ++;
                        player2.moves2 ++;
                        moveTracker2();
                    }
                    else (player2.loc2--);
                }
             
                break;
            
            //Left
            case 74:
                //Once players click left key, players x loction will decrease 1 and moves willl increase 1. If hitting the wall, the left key wont't do anything.


                if (player2.x2 !=0){
                    player2.loc2 --;
                    if (maze[player2.loc2].state != 0 ){

                        //Paint where players were before they click keys
                        ctx.rect(player2.x2 * 15, player2.y2 * 15, 15 ,15);
                        ctx.fill();
                       
                        player2.x2 --;
                        player2.moves2 ++;
                        moveTracker2();
                    }
                    else (player2.loc2++);
                }
                break;
    
            //Down
            case 75:
                //Once players click down key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the down key wont't do anything. 
                
                if (player2.y2 !=46){

                    //player.loc += 53;
                    player2.loc2 += 53;
                    if (maze[player2.loc2].state != 0 ){

                        //Paint where players were before they click keys
                        ctx.rect(player2.x2 * 15, player2.y2 * 15, 15 ,15);
                        ctx.fill();
                       
                        player2.y2 ++;
                        player2.moves2 ++;
                        moveTracker2();
                    }

                    else (player2.loc2 -= 53);
                    
                }
                break;
            
            //Up
            case 73:
                //Once players click up key, players y loction will increase 1 and moves willl increase 1. If hitting the wall, the up key wont't do anything.

                if (player2.y2 !=0){

                    player2.loc2 -= 53;
                    if (maze[player2.loc2].state != 0 ){

                        //Paint where players were before they click keys
                        ctx.rect(player2.x2 * 15, player2.y2 * 15, 15 ,15);
                        ctx.fill();
                        
                        player2.y2 --;
                        player2.moves2 ++;
                        moveTracker2();
                    }

                    else (player2.loc2 += 53);
                }

                break;

                 
        }


        
        ctx.drawImage(knight, player.x * 15, player.y * 15, 15, 15);
        ctx.drawImage(ninja, player2.x2 * 15, player2.y2 * 15, 15, 15);
    
        //Print moves on screen
        document.getElementById("moves").innerText = "Moves: " + player.moves;
        document.getElementById("moves2").innerText = "Moves: " + player2.moves2;

        //When players' location match exit location, players win.
        if (maze[player.loc].state == 2) {
            document.getElementById("moves").innerText = "You win the treasure!";
            // location.reload();
        }

        if (maze[player2.loc2].state == 2) {
            document.getElementById("moves2").innerText = "You win the treasure!";
            // location.reload();
        }
    
    }


    //Print moves on screen
    document.getElementById("moves").innerText = "Player 1 Moves: " + player.moves;

    //Player 2 moves on screen counter
    document.getElementById("moves2").innerText = "Player 2 Moves: " + player2.moves2;

    //When players' location match exit location, players win.
    if (maze[player.loc].state == 2) {
        document.getElementById("moves").innerText = "You win the treasure!";
        // location.reload();
    }

    //PLAYER 2 MOVES//
    if (maze[player2.loc2].state == 2) {
        document.getElementById("moves2").innerText = "You win the treasure!";
        // location.reload();
    }
    
    document.getElementById("start-button").onclick = start;
    
    function start(){
    
        //Put image of where players are
        ctx.drawImage(knight, player.x * 15, player.y * 15, 15, 15);

        //Put image of where players are
        ctx.drawImage(ninja, player2.x2 * 15, player2.y2 * 15, 15, 15);

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

    //Player 1 Username Function

    $("#plyer1Name").on("click", function(event){
        event.preventDefault();
        username = $("#usernameEnter").val().trim();
        // username.child('#usernameEnter').update();
        database.ref().push({
        username: username,
        
        
        });
    });

    //Player 2 Username Function

    $("#plyer2Name").on("click", function(event){
        event.preventDefault();
        username2 = $("#usernameEnter2").val().trim();
        
        database.ref().push({
        username2: username2,
        
        
        });
    });


    //-------------------------------------------

    // Image scroll display
    AOS.init();

    // Get IG image
    $("#getIGImage").on("click", function(){

        
        var token = "22117331751.0da22be.d1003c3b370f47b390079af113bd34be";

  
        $("#image-display").html("");
        // first var token = "22117331751.0da22be.d1003c3b370f47b390079af113bd34be";
        var token = "22117331751.3aaa3da.94e479597e8345899f9bdb342937150e";
        num_photos = 1;
        $.ajax({
            url: "https://api.instagram.com/v1/users/self/media/recent",
            dataType: "jsonp",
            type: "GET",
            data: {access_token: token, count: num_photos},
            success: function(data){
                console.log(data);
                for( x in data.data ){
                    var imageDiv = $('<div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">');
                    var playerImage = $("<img id='playerImage'>");
                    playerImage.attr("src",data.data[x].images.low_resolution.url);
                    $(imageDiv).append(playerImage);
                    $("#image-display").append(imageDiv);
                }
            },
            error: function(data){
                console.log(data);
            }
        });
    });

    // Get random hero name and image
    $("#randomHero").on("click", function(event){
        $("#image-display").html("");
        var randomID = Math.floor(Math.random()*731) + 1;
        var queryURL = "https://www.superheroapi.com/api.php/2539613446097074/" + randomID;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var randomName = response.name;
            console.log(randomName);
            $("#usernameEnter").attr("placeholder",randomName);

            var imageDiv = $('<div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">');
            var playerImage = $("<img id='playerImage'>");
            playerImage.attr("src",response.image.url);
            $(imageDiv).append(playerImage);
            $("#image-display").append(imageDiv);
        })
    });

    // IMAGE PLAYER 2 IG
    $("#getIGImage2").on("click", function(){
        var token = "22117331751.0da22be.d1003c3b370f47b390079af113bd34be";
    $("#image-display2").html("");
    // first var token = "22117331751.0da22be.d1003c3b370f47b390079af113bd34be";
    var token = "22117331751.3aaa3da.94e479597e8345899f9bdb342937150e";
    num_photos = 1;
    $.ajax({
        url: "https://api.instagram.com/v1/users/self/media/recent",
        dataType: "jsonp",
        type: "GET",
        data: {access_token: token, count: num_photos},
        success: function(data){
            console.log(data);
            for( x in data.data ){
                var imageDiv2 = $('<div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">');
                var playerImage2 = $("<img id='playerImage2'>");
                playerImage2.attr("src",data.data[x].images.low_resolution.url);
                $(imageDiv2).append(playerImage2);
                $("#image-display2").append(imageDiv2);
            }
        },
        error: function(data){
            console.log(data);
        }
    });
 });
 // Get random hero name and image for PLAYER 2
 $("#randomHero2").on("click", function(event){
    $("#image-display2").html("");
    var randomID = Math.floor(Math.random()*731) + 1;
    var queryURL = "https://www.superheroapi.com/api.php/2539613446097074/" + randomID;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response2){
        var randomName2 = response2.name;
        console.log(randomName2);
        $("#usernameEnter2").attr("placeholder",randomName2);
        var imageDiv2 = $('<div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">');
        var playerImage2 = $("<img id='playerImage2'>");
        playerImage2.attr("src",response2.image.url);
        $(imageDiv2).append(playerImage2);
        $("#image-display2").append(imageDiv2);
    })
 });

    //-------------------------------------------

    //DatabaseListener
    database.ref().on("child_added", function(snapshot) {
        var ss = snapshot.val();
        // var addUser =
        $("#player1-name").text(ss.username);
        $("#player2-name").text(ss.username2);
        console.log(ss.username);
        console.loh(ss.username2);
        $("#player1-name").append();
        $("#player2-name").append();
        return   
    });
    //Enter Username for Player 2
playersRef.on("value", function (snapshot) {

    currentPlayers = snapshot.numChildren();

    playerOneExists = snapshot.child("1").exists();
    playerTwoExists = snapshot.child("2").exists();
  
    // Player data objects
    playerOneData = snapshot.child("1").val();
    playerTwoData = snapshot.child("2").val();
  
    // If theres a player 1, fill in name and win loss data
    if (playerOneExists) {
        moveTracker();
    } else {
      // If there is no player 1, clear win/loss data and show waiting
        moveTracker2();

        console.log(moveTracker2);
    }
  
  });

});



//Created by Peiyu, Kyle, Amir, Manuel, and Alexis //
