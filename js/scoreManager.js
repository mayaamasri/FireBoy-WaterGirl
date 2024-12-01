class ScoreManager extends Sprite {
    constructor() {
        super();
        this.score = 0;
        this.elapsedTime = 0;
        this.startTime = null;
        this.gameWon = false;
        this.state = 'WAITING';
        this.collectedGems = new Set();
    }

    update(sprites) {
        if (this.state === 'WAITING' && this.detectFirstInput()) {
            this.startTime = Date.now();
            this.state = 'RUNNING';
        }

        if (this.state === 'RUNNING' && !this.gameWon) {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateScore(sprites);
        }
        return false;
    }

    detectFirstInput() {
        return this.keys && (this.keys['ArrowLeft'] || this.keys['ArrowRight'] || 
               this.keys['ArrowUp'] || this.keys['a'] || this.keys['d'] || 
               this.keys['w']);
    }

    updateScore(sprites) {
        sprites.forEach(sprite => {
            if (sprite instanceof Gem && sprite.collected && !this.collectedGems.has(sprite)) {
                this.collectedGems.add(sprite);
                this.score += 100;
            }
        });
    }

    draw(ctx) {
        const minutes = Math.floor(this.elapsedTime / 60);
        const seconds = this.elapsedTime % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        ctx.font = '24px TrajanPro';
        ctx.fillStyle = '#DCBB12';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${this.score}`, 20, 60);

        if (this.state === 'RUNNING' || this.gameWon) {
            ctx.fillText(`Time: ${timeString}`, 20, 90);
        } else {
            ctx.fillText('Time: 0:00', 20, 90);
        }

        if (this.gameWon) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, 850, 750);
            
            ctx.fillStyle = '#DCBB12';
            ctx.textAlign = 'center';
            ctx.font = '48px TrajanPro';
            ctx.fillText('Level Complete!', 425, 300);
            
            ctx.font = '32px TrajanPro';
            ctx.fillText(`Final Score: ${this.score}`, 425, 370);
            ctx.fillText(`Time: ${timeString}`, 425, 420);
            
            ctx.font = '24px TrajanPro';
            ctx.fillText('Press N for next level', 425, 490);
        }
    }
}