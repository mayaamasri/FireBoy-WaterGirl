class Gem extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.type = type; 
        this.collected = false;
    }

    update(sprites) {
        if (this.collected) return true; 

        sprites.forEach(sprite => {
            if (sprite instanceof Player) {
                if (sprite.type === this.type && this.checkCollision(sprite)) {
                    this.collected = true;
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
        if (!this.collected) {
            ctx.fillStyle = this.type === 'fire' ? '#ff0000' : '#00ffff';
            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height/2);
            ctx.lineTo(this.x + this.width/2, this.y + this.height);
            ctx.lineTo(this.x, this.y + this.height/2);
            ctx.closePath();
            ctx.fill();
        }
    }
}
