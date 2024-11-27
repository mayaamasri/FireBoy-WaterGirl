class FireBoy extends Player {
    constructor(x, y) {
        super(x, y, 'fire');
    }

    handleMovement(keys) {
        if (keys['ArrowLeft']) this.velocityX = -this.moveSpeed;
        else if (keys['ArrowRight']) this.velocityX = this.moveSpeed;
        else this.velocityX = 0;

        if (keys['ArrowUp'] && !this.isJumping) {
            this.velocityY = this.jumpForce;
            this.isJumping = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}