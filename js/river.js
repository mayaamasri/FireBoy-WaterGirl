class River extends Sprite {
    constructor(x, y, width, height, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.waveOffset = 3;
        this.waveSpeed = 0.1;
    }

    update(sprites) {
        this.waveOffset += this.waveSpeed;
        
        sprites.forEach(sprite => {
            if (sprite instanceof Player) {
                if (this.type === 'hazard' || sprite.type !== this.type) {
                    if (this.checkCollision(sprite)) {
                        sprite.x = 100;
                        sprite.y = sprite.type === 'fire' ? 575 : 675;
                        sprite.velocityX = 0;
                        sprite.velocityY = 0;
                    }
                }
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
        ctx.globalAlpha = 0.6;
        
        const colors = {
            fire: '#ff0000',
            water: '#0088ff',
            hazard: '#00ff00'
        };
        
        ctx.fillStyle = colors[this.type] || '#ffffff';

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height);
        
        for (let x = 0; x <= this.width; x += 10) {
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