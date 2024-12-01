const game = new Game();
const menu = new MenuScreen();
const fontFace = new FontFace('TrajanPro', 'url(fonts/TrajanPro-Bold.otf)');
fontFace.load().then(font => {
    document.fonts.add(font);
});
game.addSprite(menu);
game.animate();