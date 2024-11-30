class Button extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 55;
        this.height = 30;
        this.isPressed = false;
        this.wasPressed = false;
        this.spriteSheet = new Image();
        this.spriteSheet.src = 'images/button.png';
        this.buttonSound = new Audio('sounds/lever-button.mp3');
    }

    update(sprites) {
        this.wasPressed = this.isPressed;
        this.isPressed = false;

        sprites.forEach(sprite => {
            if ((sprite instanceof FireBoy || sprite instanceof WaterGirl) && 
                this.detectCollision(sprite)) {
                this.isPressed = true;
            }
        });

        if (this.isPressed && !this.wasPressed) {
            this.buttonSound.currentTime = 0;
            this.buttonSound.play();
        }

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