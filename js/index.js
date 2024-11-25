const game = new Game();

const background = new Background();
game.addSprite(background);

const fireBoy = new Player(50, 525, "fire");
const waterGirl = new Player(50, 700, "water");

const platforms = [
  new Platform(0, 570, 300, 25),

  new Platform(800, 600, 100, 100),
  
  new Platform(0, 450, 400, 25),
  new Platform(400, 450, 30, 75),
  new Platform(400, 500, 350, 25),

  new Platform(100, 350, 800, 25),
  
  new Platform(0, 250, 800, 25),
  new Platform(500, 200, 150, 70),
  new Platform(0, 150, 150, 100),

  new Platform(250, 70, 100, 25),
  new Platform(350, 70, 50, 70),
  new Platform(350, 120, 800, 25)

];

const gems = [
  new Gem(650, 630, "water"),
  new Gem(500, 300, "water"),
  new Gem(20, 100, "water"),
  new Gem(600, 60, "water"),

  new Gem(450, 630, "fire"),
  new Gem(250, 300, "fire"),
  new Gem(290, 25, "fire"),
];

const doors = [new Door(800, 60, "fire"), new Door(850, 60, "water")];

doors.forEach((door) => game.addSprite(door));
game.addSprite(fireBoy);
game.addSprite(waterGirl);
platforms.forEach((platform) => game.addSprite(platform));
gems.forEach((gem) => game.addSprite(gem));

game.animate();
