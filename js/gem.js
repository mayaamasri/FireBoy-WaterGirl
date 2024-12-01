class Gem extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.originalY = y;
        this.width = 35; 
        this.height = 35; 
        this.type = type;
        this.collected = false;
        this.moveSpeed = 0.07;
        this.maxOffset = 5;
        this.offset = 0;
        this.movingUp = true;
        this.glowIntensity = 1;
        
        // Load sprite sheet
        this.spriteSheet = new Image();
        this.spriteSheet.src = 'images/gems.png';

        this.collectSound = new Audio('sounds/gem.mp3');
    }

    update(sprites) {
        if (this.collected) return true;

        if (this.movingUp) {
            this.offset += this.moveSpeed;
            if (this.offset >= this.maxOffset) {
                this.movingUp = false;
            }
        } else {
            this.offset -= this.moveSpeed;
            if (this.offset <= -this.maxOffset) {
                this.movingUp = true;
            }
        }
        
        this.y = this.originalY + this.offset;

        sprites.forEach(sprite => {
            if (sprite instanceof WaterGirl || sprite instanceof FireBoy) {
                if (sprite.type === this.type && this.checkCollision(sprite)) {
                    this.collected = true;
                    this.collectSound.play();
                    const scoreManager = sprites.find(s => s instanceof ScoreManager);
                    if (scoreManager) scoreManager.addScore(100);
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
            const baseColor = this.type === 'fire' ? 
                {r: 255, g: 0, b: 0} : 
                {r: 0, g: 255, b: 255};
            
            // Draw glow
            const glowSize = 30;
            const gradient = ctx.createRadialGradient(
                this.x + this.width/2, this.y + this.height/2, 0,
                this.x + this.width/2, this.y + this.height/2, glowSize
            );
            
            gradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${0.5 * this.glowIntensity})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(
                this.x - glowSize, 
                this.y - glowSize, 
                this.width + glowSize * 2, 
                this.height + glowSize * 2
            );
            
            // Draw the appropriate gem from sprite sheet
            const sourceX = this.type === 'water' ? 0 : 24;
            ctx.drawImage(
                this.spriteSheet,
                sourceX, 0,    
                24, 24,      
                this.x, this.y,
                this.width, this.height
            );
        }
    }
}