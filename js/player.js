class Player extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 35;
        this.height = 35;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.gravity = 0.4;
        this.jumpForce = -10;
        this.moveSpeed = 5;
    }

    update(sprites, keys) {
        this.velocityY += this.gravity;
        this.handleMovement(keys);
        this.updatePosition();
        this.checkBoundaries();
        this.handleCollisions(sprites);
        return false;
    }

    handleMovement(keys) {
    
    }

    updatePosition() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    checkBoundaries() {
        if (this.x < 0) {
            this.x = 0;
            this.velocityX = 0;
        } else if (this.x + this.width > 850) {
            this.x = 850 - this.width;
            this.velocityX = 0;
        }
    
        if (this.y < 0) {
            this.y = 0;
            this.velocityY = 0;
        } else if (this.y + this.height > 750) {
            this.y = 750 - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }

    handleCollisions(sprites) {
        sprites.forEach(sprite => {
            if (sprite instanceof Platform && this.checkCollision(sprite)) {
                this.handlePlatformCollision(sprite);
            }
        });
    }

    checkCollision(platform) {
        return this.x < platform.x + platform.width &&
               this.x + this.width > platform.x &&
               this.y < platform.y + platform.height &&
               this.y + this.height > platform.y;
    }

    handlePlatformCollision(platform) {
        if (this.velocityY > 0 && 
            this.y + this.height - this.velocityY <= platform.y) {
            this.y = platform.y - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
        else if (this.velocityY < 0 && 
                 this.y - this.velocityY >= platform.y + platform.height) {
            this.y = platform.y + platform.height;
            this.velocityY = 0;
        }
        else {
            if (this.velocityX > 0) {
                this.x = platform.x - this.width;
            } else if (this.velocityX < 0) {
                this.x = platform.x + platform.width;
            }
            this.velocityX = 0;
        }
    }
}