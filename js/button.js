class Button extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 55;
        this.height = 30;
        this.isPressed = false;
        this.spriteSheet = new Image();
        this.spriteSheet.src = 'images/button.png';
    }

    update(sprites) {
        this.isPressed = false;
        sprites.forEach(sprite => {
            if ((sprite instanceof FireBoy || sprite instanceof WaterGirl) && 
                this.detectCollision(sprite)) {
                this.isPressed = true;
            }
        });
        return false;
    }

    detectCollision(player) {
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }

    draw(ctx) {
        ctx.drawImage(
            this.spriteSheet,
            this.isPressed ? 200 : 0,
            0,
            45,
            20,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}