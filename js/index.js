const game = new Game();

const background = new Background();
game.addSprite(background);

const fireBoy = new FireBoy(100, 575);
const waterGirl = new WaterGirl(100, 675);

const platforms = [
  new Platform(0, 0, 25, 750),
  new Platform(825, 0, 25, 750),
  new Platform(0, 0, 850, 25),
  new Platform(0, 725, 300, 25),
  new Platform(460, 725,90, 25),
  new Platform(710, 725, 125, 25),

  new Platform(0, 625, 250, 25),

  new Platform(750, 650, 100, 75),
  
  new Platform(0, 525, 350, 25),
  new Platform(300, 550, 400, 25),
  

  new Platform(150, 400, 700, 25),
  
  new Platform(0, 200, 150, 100),
  new Platform(425, 250, 150, 50),
  new Platform(0, 300, 725, 25),

  new Platform(225, 100, 100, 25),
  new Platform(325, 100, 100, 75),
  new Platform(325, 175, 800, 25)

];

const gems = [
  new Gem(610, 675, "water"),
  new Gem(500, 350, "water"),
  new Gem(50, 150, "water"),
  new Gem(550, 125, "water"),

  new Gem(360, 675, "fire"),
  new Gem(200, 350, "fire"),
  new Gem(275, 50, "fire"),
];

const doors = [new Door(650, 100, "fire"), new Door(750, 100, "water")];

const rivers = [
  new River(300, 730, 160, 20, "fire"),
  new River(550, 730, 160, 20, "water"),
];

const hazardRiver = new River(500, 545, 120, 15, 'hazard');

game.addSprite(fireBoy);
game.addSprite(waterGirl);
platforms.forEach((platform) => game.addSprite(platform));
rivers.forEach(river => game.addSprite(river));
game.addSprite(hazardRiver);
doors.forEach((door) => game.addSprite(door));
gems.forEach((gem) => game.addSprite(gem));

game.animate();