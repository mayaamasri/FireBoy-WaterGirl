class Player extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.type = type;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.gravity = 0.5;
        this.jumpForce = -12 ;
        this.moveSpeed = 5;
    }

    update(sprites, keys) {
        this.velocityY += this.gravity;

        if (this.type === 'fire') {
            if (keys['ArrowLeft']) this.velocityX = -this.moveSpeed;
            else if (keys['ArrowRight']) this.velocityX = this.moveSpeed;
            else this.velocityX = 0;

            if (keys['ArrowUp'] && !this.isJumping) {
                this.velocityY = this.jumpForce;
                this.isJumping = true;
            }
        } else {
            if (keys['a']) this.velocityX = -this.moveSpeed;
            else if (keys['d']) this.velocityX = this.moveSpeed;
            else this.velocityX = 0;

            if (keys['w'] && !this.isJumping) {
                this.velocityY = this.jumpForce;
                this.isJumping = true;
            }
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x < 0) {
            this.x = 0;
            this.velocityX = 0;
        } else if (this.x + this.width > 900) {
            this.x = 900 - this.width;
            this.velocityX = 0;
        }
    
        if (this.y < 0) {
            this.y = 0;
            this.velocityY = 0;
        } else if (this.y + this.height > 700) {
            this.y = 700 - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
        
        sprites.forEach(sprite => {
            if (sprite instanceof Platform) {
                if (this.checkCollision(sprite)) {
                    this.handlePlatformCollision(sprite);
                }
            }
        });
        
        return false; 
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

    draw(ctx) {
        ctx.fillStyle = this.type === 'fire' ? '#ff4444' : '#4444ff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}