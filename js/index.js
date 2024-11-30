const game = new Game();

const menuScreen = new MenuScreen();
const background = new Background();
game.addSprite(background);

const fireBoy = new FireBoy(100, 575);
const waterGirl = new WaterGirl(100, 675);

const platforms = [
  new Platform(0, 0, 25, 750),
  new Platform(825, 0, 25, 750),
  new Platform(0, 0, 850, 25),
  new Platform(0, 725, 300, 25),
  new Platform(300, 740, 150, 10),
  new Platform(450, 725, 100, 25),
  new Platform(550, 740, 150, 10),
  new Platform(700, 725, 150, 25),

  new Platform(0, 625, 250, 25),

  new Platform(750, 650, 100, 75),

  new Platform(0, 525, 350, 25),
  new Platform(300, 550, 200, 25),
  new Platform(500, 565, 120, 10),
  new Platform(620, 550, 100, 25),

  new Platform(125, 400, 700, 25),

  new Platform(0, 200, 150, 100),
  new Platform(425, 250, 150, 50),
  new Platform(0, 300, 725, 25),

  new Platform(225, 100, 100, 25),
  new Platform(325, 100, 100, 75),
  new Platform(325, 175, 800, 25),
];

const lever = new Lever(200, 490);

const gems = [
  new Gem(610, 675, "water"),
  new Gem(500, 350, "water"),
  new Gem(50, 150, "water"),
  new Gem(550, 125, "water"),

  new Gem(360, 675, "fire"),
  new Gem(200, 350, "fire"),
  new Gem(275, 50, "fire"),
];

const doors = [new Door(625, 95, "fire"), new Door(725, 95, "water")];

const rivers = [
  new River(300, 727, 150, 12, "fire"),
  new River(550, 727, 150, 12, "water"),
];

const hazardRiver = new River(500, 552, 120, 12, "hazard");

const movingBar = new MovingBar(25, 400, 100, 25, 75, "down");

const buttons = [new Button(275, 375), new Button(625, 275)];

const rocks = [new Rock(500, 200, 50, 50)];

const buttonBar = new ButtonBar(725, 300, 100, 25, 75);

doors.forEach((door) => game.addSprite(door));
platforms.forEach((platform) => game.addSprite(platform));
game.addSprite(lever);
game.addSprite(fireBoy);
game.addSprite(waterGirl);
game.addSprite(movingBar);
rocks.forEach((rock) => game.addSprite(rock));
buttons.forEach((button) => game.addSprite(button));
game.addSprite(buttonBar);
rivers.forEach((river) => game.addSprite(river));
game.addSprite(hazardRiver);
gems.forEach((gem) => game.addSprite(gem));
game.addSprite(menuScreen);

game.animate();
