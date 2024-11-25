const game = new Game();

const background = new Background();
game.addSprite(background);

const fireBoy = new Player(50, 500, "fire");
const waterGirl = new Player(50, 700, "water");

const platforms = [
  new Platform(0, 550, 300, 25),

  new Platform(750, 575, 100, 75),
  
  new Platform(0, 425, 400, 25),
  new Platform(400, 425, 50, 50),
  new Platform(400, 475, 325, 25),

  new Platform(100, 350, 800, 25),
  
  new Platform(0, 150, 150, 100),
  new Platform(500, 200, 150, 50),
  new Platform(0, 250, 800, 25),

  new Platform(250, 75, 100, 25),
  new Platform(350, 75, 50, 70),
  new Platform(350, 125, 800, 25)

];

const gems = [
  new Gem(650, 580, "water"),
  new Gem(500, 300, "water"),
  new Gem(20, 100, "water"),
  new Gem(600, 60, "water"),

  new Gem(450, 580, "fire"),
  new Gem(250, 300, "fire"),
  new Gem(290, 25, "fire"),
];

const doors = [new Door(675, 50, "fire"), new Door(775, 50, "water")];

doors.forEach((door) => game.addSprite(door));
game.addSprite(fireBoy);
game.addSprite(waterGirl);
platforms.forEach((platform) => game.addSprite(platform));
gems.forEach((gem) => game.addSprite(gem));

game.animate();
