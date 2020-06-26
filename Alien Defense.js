//Idea and ships made by Serendibite
//Coding done by Money
//TODO: make map look less like a dick 
var map =
"-----------------3-------------9---------2------------------\n"+
"---------------2---1---------9-9-------3-1-------------3----\n"+
"-------6--------1--0-1----6------6----0----0----------------\n"+
"--------------969696969--6-6----6-6--969696969--------------\n"+
"---1-----------848484849--6------6--948484848---------------\n"+
"-----------------------49----------94-----------------------\n"+
"------7-----------------49--------94-----------------3------\n"+
"-------------1-----------49------94-------------------------\n"+
"------------------9------86-0--3-68-------------------------\n"+
"-------------------------49--1---94-----2-------------------\n"+
"-------------------------86----2-68------------4------------\n"+
"----------8--------------491-----94-------------------------\n"+
"-------------------------86-0----68-------------------------\n"+
"----2--------------------49---0--94------------------1------\n"+
"-----------------7-------86-3--2-68-------------------------\n"+
"--------3-----------------9------9-----8--------------------\n"+
"-----------4------------------------------------5-----------\n"+
"-----------7------------------------------------------------\n"+
"------------------------------------------------------------\n"+
"------------------------------------------------------------\n"+
"-----2-------------------1---------------2---------------8--\n"+
"------------------------------------------------------------\n"+
"------------------------------------------------------------\n"+
"---------------03---------------------------------1---------\n"+
"-----------------------6---------0--------------------------\n"+
"---------4------------------------------1---------------1---\n"+
"------------------------------------------------------------\n"+
"------------------------------------------------------------\n"+
"------------------------------------------------------------\n"+
"-44------------8--------------0-------------4---------------\n"+
"------------------------------------------------------------\n"+
"------------------------------------------------------------\n"+
"------------------------------------------------------------\n"+
"------------------------------6----------------------4------\n"+
"------7------------7-----------------------8----------------\n"+
"------------------------------------------------------------\n"+
"------------------------------------------------------------\n"+
"--------------6---------------------------------------------\n"+
"----------------------------------1-----------------------3-\n"+
"-------------------------3----------------------4-----------\n"+
"---------------4--------------------------------------------\n"+
"------1-----------------------------------------------------\n"+
"--------------------------------------2---------------------\n"+
"------------------------------------------------------------\n"+
"----------2---------------9------9--------------7-----------\n"+
"-------------------------86-1--0268-------------------------\n"+
"-------------------5-----493--1--94-------------------------\n"+
"--2----------------------86------68------9------------------\n"+
"-------------------------49-2--1-94------------------7------\n"+
"----------4--------------86------68-------------------------\n"+
"-------------------------490---3-94-------------------------\n"+
"-------------------------86--2---68-----------6-------------\n"+
"---------------6---------49-1----94-------------------------\n"+
"------------------------49--------94--------------2---------\n"+
"-----------------------49----------94------------------8----\n"+
"----3----------848484849--6------6--948484848---------------\n"+
"--------------969696969--6-6----6-6--969696969--------------\n"+
"---------------0-----2----6------6----2--------------7------\n"+
"--------8----------1--------9-9---------1--0----------------\n"+
"----------------3-----------9---------1----------------------" ; //No, I don't need to hear about how it looks like a dick
//------------------------------------------------------------------------------------------------------------------------------------------------
var vocabulary = [
  {text: "You", icon:"\u004e", key:"O" },
  {text: "Me", icon:"\u004f", key:"E" },
  {text: "Yes", icon:"\u004c", key:"Y" },
  {text: "No", icon:"\u004d", key:"N" },
  {text: "Attack", icon:"\50", key:"A" },
  {text: "Healing", icon:"\70", key:"H" },
  {text: "Gems", icon:"\u0044", key:"M" },
  {text: "Defend", icon:"\u0025", key:"D" },
  {text: "Wait", icon:"\u0048", key:"T" },
  {text: "Kill", icon:"\u005b", key:"K" },
  {text: "Base", icon:"\u0034", key:"B" },
  {text: "?????????????????", icon:"\131", key:"E" },
  {text: "Good Game", icon:"GG", key:"G" },
  {text: "No Prob", icon:"\u0047", key:"P" },
  {text: "Thanks", icon:"\u0041", key:"X" },
  {text: "Sorry", icon:"\u00a1", key:"S" }
];

this.options = {
  root_mode: "team",
  friendly_colors: 1,
  map_size: 60,
  asteroid_strength: 0.3,
  radar_zoom: 1,
  crystal_value: 0,
  soundtrack: "argon.mp3",
  speed_mod: 1,
  vocabulary: vocabulary,
  custom_map: map,
  asteroids_strength: 10
};
 
function tick(game){  
  if (game.step % 3600 === 0){
    if (game.ships.length === 1||2){
      rip += 1;
      basetimer(game);
    } else {
      rip += ~~(game.ships.length/3); 
      basetimer(game);
    }
  }
  if (game.step % 30 === 0){
    var max = Math.max(14,Math.min(26,~~(game.ships.length*2.2))); 
    if (game.aliens.length < max){
      var aliens = [{code:11,crystal_drop:10},{code:11,level:1,crystal_drop:20},{code:17,crystal_drop:15},{code:11,level:2,crystal_drop:45},{code:17,level:1,crystal_drop:30}];
      var spawn_delay = game.step / ~~(1800 / 1.5 * 2);
      var alien = aliens[~~(Math.random()*Math.min(aliens.length,spawn_delay/4))];
      alien.x = game.aliens[0].x+Math.cos(Math.random()*Math.PI*2)*10;
      alien.y = game.aliens[0].y+Math.sin(Math.random()*Math.PI*2)*10;
      game.addAlien(alien);
    }
    for (let ship of game.ships){
      if (!ship.custom.init){
        ship.custom.init = true;
        joinmessage(ship);
        basetimer(game);
      }
    }
    if (rip > 79){
      game.setUIComponent({
        id: "wtf",
        position: [32,8,42-8,40-8],
        visible: true,
        components: [
          {type: "text",position:[0,0,80,33],value:"Your base is out of health!",color:"#fff"},
        ]
      });         
      setTimeout(function(){
        for (let ship of game.ships) ship.gameover({"Try again next time!":""});
        game.modding.I1I0I.send({name:"stop"});
      },5000);
    }
    for(var i=0; i<game.aliens.length; i++){  
      if (game.aliens[0].code == 19){
        //curry curry curry 
      } else {
        for (let alien of game.aliens) alien.set({kill:true});
        game.setUIComponent({
          id: "lol",
          position: [32,5,42-8,40-8],
          visible: true,
          components: [
            {type: "text",position:[0,0,80,33],value:"Purple Saucer has been killed",color:"#fff"},
            {type: "text",position:[0,14,80,33],value:"GG, thanks for playing!",color:"#fff"},
          ]
        });          
        setTimeout(function(){ //don't make functions within a loop well FUCK YOU  
          for (let ship of game.ships) ship.gameover({"Nice":""});
          game.modding.I1I0I.send({name:"stop"});
        },5000);
      }
      //if (game.aliens[i].code == 12){
      //} else {
        //for (let i=0; i<2; i++) game.addAlien({code:19,level:1,crystals:2000,points:2000,x:game.aliens[0].x,y:game.aliens[0].y,vy:-1});
      //}
    }
  }
}
 
function game_start(game){
  if (!game.custom.init){
    game.custom.init = true;
    game.addAlien({code:19,level:2,crystals:4000,points:4000,x:0,y:300});
    for (let i=0; i<40; i+=10) game.addAlien({code:12,crystals:1200,points:1200,x:Math.cos(Math.random()*Math.PI*2)*i,y:250+Math.sin(Math.random()*Math.PI*2)*i});
  }
  this.tick = tick;
}
this.tick = game_start;

var rip = 1;

yeetalien = function(game){
  for (let alien of game.aliens) alien.set({kill:true});
};

function basetimer(game){
  game.setUIComponent({
    id: "pogggggggg",
    position: [22,1,22,20],
    visible: true,
    components: [
      {type: "text",position:[0,0,80,33],value:"Station energy:",color:"#fff"},
      {type:"box",position:[1,34,79-rip,10],fill:"#00cc00"},
      {type:"box",position:[1,34,78,10],stroke:"#000",width:3}
    ]
  });   
}

function joinmessage(ship){
  ship.setUIComponent({
    id: "yeet",
    position: [32,8,42-8,40-8],
    visible: true,
    components: [
      {type: "text",position:[0,0,80,33],value:"Kill the purple Saucer to win",color:"#fff"},
      {type: "text",position:[0,16,80,33],value:"Good luck and have fun!",color:"#fff"},
    ]
  });      
  setTimeout(function(){  
    ship.setUIComponent({id:"yeet",visible:false});
  },5000);
}