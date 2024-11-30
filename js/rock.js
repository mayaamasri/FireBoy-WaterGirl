class Rock extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.isMoving = false;
        this.pushSpeed = 3;
        
        // Load the rock sprite
        this.sprite = new Image();
        this.sprite.src = 'images/rock.png';
    }

    update(sprites) {
        this.velocityY += this.gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityX = 0;
        
        sprites.forEach(sprite => {
            if (sprite instanceof Player && this.checkCollision(sprite)) {
                this.handlePlayerCollision(sprite);
            } else if (sprite instanceof Platform && this.checkCollision(sprite)) {
                this.handlePlatformCollision(sprite);
            }
        });

        return false;
    }

    checkCollision(entity) {
        return this.x < entity.x + entity.width &&
               this.x + this.width > entity.x &&
               this.y < entity.y + entity.height &&
               this.y + this.height > entity.y;
    }

    handlePlayerCollision(player) {
        const fromLeft = (player.x + player.width) - this.x;
        const fromRight = (this.x + this.width) - player.x;
        const fromTop = (player.y + player.height) - this.y;
        const fromBottom = (this.y + this.height) - player.y;

        const collisionDirections = [
            { dir: 'left', depth: fromLeft },
            { dir: 'right', depth: fromRight },
            { dir: 'top', depth: fromTop },
            { dir: 'bottom', depth: fromBottom }
        ];

        const minCollision = collisionDirections.reduce((min, curr) => 
            curr.depth < min.depth ? curr : min
        );

        switch (minCollision.dir) {
            case 'left':
                if (player.velocityX > 0) {
                    this.velocityX = this.pushSpeed;
                    player.x = this.x - player.width;
                }
                break;
            case 'right':
                if (player.velocityX < 0) {
                    this.velocityX = -this.pushSpeed;
                    player.x = this.x + this.width;
                }
                break;
            case 'top':
                if (player.velocityY > 0) {
                    player.y = this.y - player.height;
                    player.velocityY = 0;
                    player.isJumping = false;
                }
                break;
            case 'bottom':
                if (player.velocityY < 0) {
                    player.y = this.y + this.height;
                    player.velocityY = 0;
                }
                break;
        }
    }

    handlePlatformCollision(platform) {
        const fromLeft = (this.x + this.width) - platform.x;
        const fromRight = (platform.x + platform.width) - this.x;
        const fromTop = (this.y + this.height) - platform.y;
        const fromBottom = (platform.y + platform.height) - this.y;

        const collisionDirections = [
            { dir: 'left', depth: fromLeft },
            { dir: 'right', depth: fromRight },
            { dir: 'top', depth: fromTop },
            { dir: 'bottom', depth: fromBottom }
        ];

        const minCollision = collisionDirections.reduce((min, curr) => 
            curr.depth < min.depth ? curr : min
        );

        switch (minCollision.dir) {
            case 'left':
                this.x = platform.x - this.width;
                this.velocityX = 0;
                break;
            case 'right':
                this.x = platform.x + platform.width;
                this.velocityX = 0;
                break;
            case 'top':
                this.y = platform.y - this.height;
                this.velocityY = 0;
                break;
            case 'bottom':
                this.y = platform.y + platform.height;
                this.velocityY = 0;
                break;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
}