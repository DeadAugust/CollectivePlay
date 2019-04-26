let mapWidth = 10;
let mapHeight = 10;
let mapMax = mapWidth * mapHeight;
let mapScale = 50;

let map = [];

let grass = {
  color: "green"
}

let dude = {
  color: "blue"
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  for (let x = 0; x < mapWidth; x++){
    for (let y = 0; y < mapHeight; y++){
      map.push(grass);
    }
  }

  //starting place
  map[55] = dude;
}

function draw() {
  background(220);
  // console.log(grass.color);
  // console.log(map);


  for (let x = 0; x < mapWidth; x++){
    for (let y = 0; y < mapHeight; y++){
      let index = ((y * mapWidth) + x);
      fill(map[index].color);
      rect(x * mapScale, y * mapScale, mapScale, mapScale);
    }
  }
}

function keyPressed(){ //better to use keyTyped? maybe if holding down?
  //up
  if (keyCode === UP_ARROW || keyCode === 87){ //87 is 'w', 'w' doesn't work for some reason
    //better to have an x,y address in the object instead of manipulating whole array?
    for (let x = 0; x < mapWidth; x++){
      for (let y = 0; y < mapHeight; y++){
        let index = ((y * mapWidth) + x);
        if (map[index] == dude && (index - mapWidth) >= 0){ //to prevent going off screen
          console.log(index);

          map[index] = grass;
          map[index - mapWidth] = dude;
          return;

        }
      }
    }
  }
  //down
  if (keyCode === DOWN_ARROW || keyCode === 83){ //83 is 's'
    for (let x = 0; x < mapWidth; x++){
      for (let y = 0; y < mapHeight; y++){
        let index = ((y * mapWidth) + x);

        if (map[index] == dude && (index + mapWidth) < mapMax ){
          console.log(index);
          map[index] = grass;
          map[index + mapWidth] = dude;
          return;

        }
      }
    }
  }
  //left
  if (keyCode === LEFT_ARROW || keyCode === 65){ //65 is 'a'
    for (let x = 0; x < mapWidth; x++){
      for (let y = 0; y < mapHeight; y++){
        let index = ((y * mapWidth) + x);

        if (map[index] == dude && (index % 10) != 0){
          console.log(index);

          map[index] = grass;
          map[index - 1] = dude;
          return;
        }
      }
    }
  }
  //right
  if (keyCode === RIGHT_ARROW || keyCode === 68){ //68 is 'd'
    for (let x = 0; x < mapWidth; x++){
      for (let y = 0; y < mapHeight; y++){
        let index = ((y * mapWidth) + x);
        if (map[index] == dude && ((index + 1) % 10) != 0){
          console.log(index);
          map[index] = grass;
          map[index + 1] = dude;
          return;

        }
      }
    }
  }
}
