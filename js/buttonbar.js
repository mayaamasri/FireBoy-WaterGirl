class ButtonBar extends Platform {
    constructor(x, y, width, height, moveDistance, direction = 'down') {
        super(x, y, width, height);
        this.initialX = x;
        this.initialY = y;
        this.moveDistance = moveDistance;
        this.direction = direction;
        this.targetPosition = this.calculateTargetPosition();
        this.moveSpeed = 3;
        this.spriteSheet = new Image();
        this.spriteSheet.src = 'images/barpurple.png';
    }

    calculateTargetPosition() {
        const positions = {
            up: this.initialY - this.moveDistance,
            down: this.initialY + this.moveDistance,
            left: this.initialX - this.moveDistance,
            right: this.initialX + this.moveDistance
        };
        return positions[this.direction];
    }

    update(sprites) {
        const buttonPressed = sprites.some(sprite => 
            sprite instanceof Button && sprite.isPressed
        );

        const previousY = this.y;
        const targetPos = buttonPressed ? this.targetPosition : this.initialY;
        
        if (this.y !== targetPos) {
            this.y += this.y < targetPos ? this.moveSpeed : -this.moveSpeed;
            if (Math.abs(this.y - targetPos) < this.moveSpeed) {
                this.y = targetPos;
            }

            const deltaY = this.y - previousY;
            sprites.forEach(sprite => {
                if ((sprite instanceof FireBoy || sprite instanceof WaterGirl) && 
                    this.detectCollision(sprite) && 
                    sprite.y + sprite.height <= this.y + 3) {
                    sprite.y += deltaY;
                }
            });
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
            this.y !== this.initialY ? 250 : 0,
            0,
            250,
            50,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}