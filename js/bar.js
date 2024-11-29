class MovingBar extends Platform {
    constructor(x, y, width, height, moveDistance, direction = 'right') {
        super(x, y, width, height);
        this.initialX = x;
        this.initialY = y;
        this.moveDistance = moveDistance;
        this.direction = direction;
        this.targetPosition = this.calculateTargetPosition();
        this.moveSpeed = 2;
        this.moving = false;
        this.isActive = false;
        this.spriteSheet = new Image();
        this.spriteSheet.src = 'images/bar.png';
    }

    calculateTargetPosition() {
        switch(this.direction) {
            case 'up': return this.initialY - this.moveDistance;
            case 'down': return this.initialY + this.moveDistance;
            case 'left': return this.initialX - this.moveDistance;
            case 'right': return this.initialX + this.moveDistance;
        }
    }

    update(sprites) {
        let leverActive = sprites.some(sprite => 
            sprite instanceof Lever && sprite.isActive()
        );

        this.isActive = leverActive;
        if (leverActive && !this.moving) {
            this.moving = true;
        }

        if (this.moving) {
            switch(this.direction) {
                case 'up':
                case 'down':
                    let targetY = leverActive ? this.targetPosition : this.initialY;
                    if (this.y !== targetY) {
                        this.y += this.y < targetY ? this.moveSpeed : -this.moveSpeed;
                        if (Math.abs(this.y - targetY) < this.moveSpeed) this.y = targetY;
                    }
                    break;
                case 'left':
                case 'right':
                    let targetX = leverActive ? this.targetPosition : this.initialX;
                    if (this.x !== targetX) {
                        this.x += this.x < targetX ? this.moveSpeed : -this.moveSpeed;
                        if (Math.abs(this.x - targetX) < this.moveSpeed) this.x = targetX;
                        if (this.x === this.initialX && !leverActive) this.moving = false;
                    }
                    break;
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.spriteSheet,
            this.isActive ? 250 : 0,
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