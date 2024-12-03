class ScoreManager extends Sprite {
    constructor() {
        super();
        this.state = {
            current: 'WAITING',
            WAITING: 'RUNNING',
            RUNNING: 'PAUSED',
            PAUSED: 'RUNNING'
        };
        this.score = 0;
        this.startTime = null;
        this.pauseTime = null;
        this.elapsedTime = 0;
        this.finalTime = null;
    }

    update(sprites, keys) {
        const gameStateManager = sprites.find(sprite => 
            sprite instanceof GameStateManager
        );

        if (gameStateManager && 
            (gameStateManager.state.current === 'GAME_OVER' || 
             gameStateManager.state.current === 'WIN')) {
            if (this.finalTime === null) {
                this.finalTime = this.elapsedTime;
            }
            return false;
        }

        if (this.state.current === 'WAITING' && 
            (keys['ArrowRight'] || keys['ArrowLeft'] || keys['a'] || keys['d'])) {
            this.state.current = this.state[this.state.current];
            this.startTime = Date.now();
        }

        if (keys['p'] && this.state.current !== 'WAITING') {
            this.state.current = this.state[this.state.current];
            if (this.state.current === 'PAUSED') {
                this.pauseTime = Date.now();
            } else if (this.pauseTime) {
                this.startTime += Date.now() - this.pauseTime;
            }
        }

        if (this.state.current === 'RUNNING' && this.startTime) {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        }

        return false;
    }

    formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    draw(ctx) {
        ctx.save();
        ctx.font = 'bold 20px TrajanPro';
        ctx.fillStyle = '#DCBB12';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${this.score}`, 30, 50);
        
        const displayTime = this.finalTime !== null ? this.finalTime : this.elapsedTime;
        ctx.fillText(`Time: ${this.formatTime(displayTime)}`, 700, 50);
        
        ctx.restore();
    }

    addScore(points) {
        this.score += points;
    }
}