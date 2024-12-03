class Background extends Sprite {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 850;
        this.height = 750;
        this.brickWidth = 50;
        this.brickHeight = 25;
    }

    draw(ctx) {
        ctx.fillStyle = '#2D2D0C';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.strokeStyle = '#202200';
        ctx.lineWidth = 3;
        
        for (let y = this.y; y < this.y + this.height; y += this.brickHeight) {
            ctx.beginPath();
            ctx.moveTo(this.x, y);
            ctx.lineTo(this.x + this.width, y);
            ctx.stroke();
        }
        
        for (let y = this.y; y < this.y + this.height; y += this.brickHeight) {
            const offset = ((y - this.y) / this.brickHeight % 2) * (this.brickWidth / 2);
            for (let x = this.x + offset; x < this.x + this.width; x += this.brickWidth) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + this.brickHeight);
                ctx.stroke();
            }
        }
    }
}