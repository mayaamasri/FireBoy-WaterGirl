class River extends Sprite {
    constructor(x, y, width, height, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.waveOffset = 5;
        this.waveSpeed = 0.1;
    }

    update(sprites) {
        this.waveOffset += this.waveSpeed;
        
        sprites.forEach(sprite => {
            if (sprite instanceof Player && 
                sprite.type !== this.type && 
                this.checkCollision(sprite)) {
                sprite.x = 50;
                sprite.y = sprite.type === 'fire' ? 500 : 700;
                sprite.velocityX = 0;
                sprite.velocityY = 0;
            }
        });
        return false;
    }

    checkCollision(player) {
        return this.x < player.x + player.width &&
               this.x + this.width > player.x &&
               this.y < player.y + player.height &&
               this.y + this.height > player.y;
    }

    draw(ctx) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = this.type === 'fire' ? '#ff0000' : '#0088ff';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height);
        
        for (let x = 0; x <= this.width; x += 20) {
            ctx.lineTo(
                this.x + x, 
                this.y + Math.sin(x * 0.2 + this.waveOffset) * 3
            );
        }
        
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}