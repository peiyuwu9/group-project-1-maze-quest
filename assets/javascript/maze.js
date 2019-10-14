$(document).ready(function(){
    
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

    // Multiplayer Firebase Variables

    var database = firebase.database();

    var playersRef = database.ref("players");

    var username = "";
    var userImageURL = "";
    var userMoves = 0;
    var currentPlayers = null;
    var playerNum = false;
    var playerOneExists = false;
    var playerTwoExists = false;
    var playerOneData = null;
    var playerTwoData = null;

    var x = 0;
    var y = 0;

    var moveTrack = [];

    // Image scroll display
    AOS.init();

    // Get IG image
    $("#getIGImage").on("click", function(){

        
        var token = "22117331751.0da22be.d1003c3b370f47b390079af113bd34be";
        
        // var currentLocation = window.location.href;
        // console.log(currentLocation);
        // var token = currentLocation.slice();
        
        // var username ="h707743";
        // var num_photos = 1;
        // $("#playerImage").html("");
        //     $.ajax({

        //         url: "https://api.instagram.com/v1/users/" + username + "/media/recent", // specify the ID of the first found user
        //         dataType: "jsonp",
        //         type: "GET",
        //         data: {access_token: token, count: num_photos},
        //         success: function(data){
        //             console.log(data);
        //             for( x in data.data ){
        //                 var igImage = $("#playerImage");
        //                 igImage.attr("src",data.data[x].images.low_resolution.url);
        //                 $("#playerImage").attr("style","display:block");
        //                 $("#player1").append(igImage);
        //             }
        //         },
        //         error: function(data2){
        //             console.log(data2);
        //         }
        //     });
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
                    var imageDiv = $('<div data-aos="flip-right" data-aos-easing="ease-out-cubic" data-aos-duration="2000">');
                    var playerImage = $("<img id='playerImage'>");
                    playerImage.attr("src",data.data[x].images.low_resolution.url);
                    playerImage.attr("alt","If no picture shown, choose other heros.");
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
            $("#usernameEnter").attr("value",randomName);
            var imageDiv = $('<div data-aos="flip-right" data-aos-easing="ease-out-cubic" data-aos-duration="2000">');
            var playerImage = $("<img id='playerImage'>");
            playerImage.attr("src",response.image.url);
            playerImage.attr("alt","If no picture shown, choose other heros.");
            $(imageDiv).append(playerImage);
            $("#image-display").append(imageDiv);
        })
    });

    // Function to capitalize usernames
    function capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    //Once player decides name and image, click enter button to start the game
    $("#plyerNameEnter").on("click", function(event){
        event.preventDefault();
        if ($("#username").val() !== "") {
            username = capitalize($("#usernameEnter").val().trim());
            userImageURL = $("#playerImage").attr("src");
            $("#playerContainer").attr("style","display: none;");
            $("#gameContainer").attr("style","display: block;");
            getInGame();
        }
    });

    // Tracks changes in key which contains player objects
    playersRef.on("value", function(snapshot) {
        
        // length of the 'players' array
        currentPlayers = snapshot.numChildren();
    
        // Check to see if players exist
        playerOneExists = snapshot.child("1").exists();
        playerTwoExists = snapshot.child("2").exists();
    
        // Player data objects
        playerOneData = snapshot.child("1").val();
        playerTwoData = snapshot.child("2").val();
    
        // If theres a player 1, fill in user 1 data
        if (playerOneExists) {
            $("#player1-name").text(playerOneData.name);
            $("#player1-image").html(playerOneData.iamge);
            $("#player1-moves").text(playerOneData.track.moves);
        } else {
        // If there is no player 1, clear image/moves and show waiting
            $("#player1-name").text("Waiting for Player 1");
            $("#player1-image").empty();
            $("#player1-moves").empty();
        }
    
        // If theres a player 2, fill in user 1 data
        if (playerTwoExists) {
            $("#player2-name").text(playerOneData.name);
            $("#player2-image").html(playerOneData.iamge);
            $("#player2-moves").text(playerOneData.moves);
        } 
        
        else {
        // If no player 2, clear image/moves and show waiting
            $("#player2-name").text("Waiting for Player 2");
            $("#player2-image").empty();
            $("#player2-moves").empty();
        }
    });

    // Function to get in the game
    function getInGame() {
    
        // Checks for current players, if theres a player one connected, then the user becomes player 2.
        // If there is no player one, then the user becomes player 1
        if (currentPlayers < 2) {

            if (playerOneExists) {
                playerNum = 2;
            } else {
                playerNum = 1;
            }
        
            // Creates key based on assigned player number
            playerRef = database.ref("/players/" + playerNum);
        
            // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
            playerRef.set({
                name: username,
                iamge: userImageURL,
                track: moveTrack
            });
        
            // On disconnect remove this user's player object
            playerRef.onDisconnect().remove();
        
            // Remove name input box and show current player number.
            $(".playerContainer").empty();

        } 
    }
    //-------------------------------------------------//


    // When a player joins, checks to see if there are two players now. If yes, then it will start the game.
    playersRef.on("child_added", function(snapshot) {
        if (currentPlayers === 1) {
        // set pop up maze and have ready sreen, which starts the game in 3 seconds
        
        }
    });
    
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

    //Set up start location of player 1
    var player = new Object ({
        x   :0,
        y   :22,
        loc :1166,
        moves:0
    });


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
    
        //Print moves on screen
        document.getElementById("moves").innerText = "Moves: " + player.moves;

        //When players' location match exit location, players win.
        if (maze[player.loc].state == 2) {
            document.getElementById("moves").innerText = "You win!";
            // location.reload();
        }
    
    }

    //Put image of where players are
    ctx.drawImage(cat, player.x * 15, player.y * 15, 15, 15);

    //Player 2 Image //
    //-------------------------------------------------//

    ctx.drawImage(cat, player2.x * 15, player2.y * 15, 15, 15);

    //Print moves on screen
    document.getElementById("moves").innerText = "Moves: " + player.moves;

    //Player 2 moves on screen counter
    document.getElementById("moves2").innerText = "Moves: " + player2.moves;

    //When players' location match exit location, players win.
    if (maze[player.loc].state == 2) {
        document.getElementById("moves").innerText = "You win!";
        // location.reload();
    }
    
    document.getElementById("start-button").onclick = start;
    
    function start(){
    
        //Put image of where players are
        ctx.drawImage(cat, player.x * 15, player.y * 15, 15, 15);

        //Put image of where players are
        ctx.drawImage(cat, player2.x * 15, player2.y * 15, 15, 15);

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

});