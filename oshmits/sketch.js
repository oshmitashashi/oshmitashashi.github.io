
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCOcTpKoNryyRQHYwo0zMVCpIKLDjommiE",
    authDomain: "circle-game-project.firebaseapp.com",
    databaseURL: "https://circle-game-project.firebaseio.com",
    projectId: "circle-game-project",
    storageBucket: "circle-game-project.appspot.com",
    messagingSenderId: "772860815812",
    appId: "1:772860815812:web:b68bab6b5390f1ac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()
let scoreboard ={  }
let game = document.getElementById("game")
let x
let y
let a
let b
let c
let d
let direction_h
let direction_v
let direction_h2
let direction_v2
let score;
let enemy
let level 
let time
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 10
  y = 20
  a = 30
  b = 40
  c = [800, 200, 326, 432, 500, 323, 254, 179, 333, 473, 295, 395, 276, 195, 246, 123]
  d = [150, 350, 500, 265, 300, 200, 100, 163, 298, 210, 105, 364, 420, 176, 290, 300]
  direction_h = 1
  direction_v = 1
  direction_h2 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  direction_v2 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  score = 0
  enemy = 1
  level = 1
  time = 20
}

function draw() {
  if (time > 0) {
  background(204,204,255);
  fill(255,182,193);
  circle(x,y,30);
  fill(204,255,255);
  circle(a,b,50);
  a = a + 5*direction_h
  b = b + 5*direction_v
   
if (touches.length == 0)   {

	if(keyIsDown(LEFT_ARROW)){
	x = x - 7
	}

	if(keyIsDown(RIGHT_ARROW)){
	x = x + 7
	}

	if(keyIsDown(UP_ARROW)){
	y = y - 7
	}

	if(keyIsDown(DOWN_ARROW)){
	y = y + 7
	}

	if ( a > width || a < 0 ) {
	direction_h = direction_h * -1
	}

	if ( b > height || b < 0 ) {
	direction_v = direction_v * -1
	}

}

  
  else { 
  		x = touches[0].x
  		y = touches[0].y
  }
  
  

  
  textSize(30)
  text("Score:"+score,x,y)
  text("Time:"+time.toFixed(1) ,10,50)
  time = time - 0.1 
    
    
    
  if (dist(x,y,a,b)< 30 + 50) {
    score = score + 1
  }
  
  
  for (i=0; i<enemy; i=i+1) {
    fill(255,255,204);
    circle(c[i],d[i],50);
    c[i] = c[i] + 5*direction_h2[i]
    d[i] = d[i] + 5*direction_v2[i]

    if (dist(x,y,c[i],d[i])< 30 + 50) {
      score = score - 1
    }
    if ( c[i] > width || c[i] < 0 ) {
      direction_h2[i] = direction_h2[i] * -1
    }

    if ( d[i] > height || d[i] < 0 ) {
      direction_v2[i] = direction_v2[i] * -1
    }

  }
  
  if (score > 10 && level == 1) {
    enemy = enemy + 4
    level = 2
    c.push.apply(c,[230, 356])
    direction_h2.push.apply(direction_h2,[1])
    direction_v2.push.apply(direction_v2,[1])
  }
    
  if (score > 20 && level == 2) {
    enemy = enemy + 4
    level = 3

  }
  
  
 if (score > 30 && level == 3) {
   enemy = enemy + 4
   level = 4
}
  
  
 if (score > 40 && level == 4) {
   enemy = enemy + 4
   level = 5
}
  }  
  
else {
  game.innerHTML = "Name? <input id ='hehe'><button onclick='restart()'>Restart</button><buttononclick='generate_alltime_leaderboard()'>All-Time LeaderBoard</button>"
  noLoop()

}
    
}

function restart (){
  let hehe = document.getElementById("hehe")
  name = hehe.value
  database.ref(name).set(score)
  if (name != ""){
   scoreboard[name] = score
  }
  alert("Scoreboard: " + JSON.stringify(scoreboard,null,1))
  time = 20
  score = 0
  level = 1
  enemy = 1
  loop()
  game.innerHTML = ""
  generate_leaderboard()
  database.ref(name).set(score)
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}


function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}
