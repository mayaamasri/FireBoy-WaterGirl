class Button extends Sprite {
    constructor(x, y, config) {
        super();
        this.x = x;
        this.y = y;
        this.width = 55;
        this.height = 30;
        this.isPressed = false;
        this.wasPressed = false;
        this.spriteSheet = new Image();
        this.spriteSheet.src = config.spriteSheetPath;
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

class PurpleButton extends Button {
    constructor(x, y) {
        super(x, y, {
            spriteSheetPath: 'images/buttons/purplebtn.png'
        });
    }
}

class GreenButton extends Button {
    constructor(x, y) {
        super(x, y, {
            spriteSheetPath: 'images/buttons/greenbtn.png'
        });
    }
}