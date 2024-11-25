class Platform extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.brickWidth = 50;
        this.brickHeight = 25;
    }

    update() {
    }

    draw(ctx) {
        ctx.fillStyle = `#726834`;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw brick pattern
        ctx.strokeStyle = `#5A522A`;
        ctx.lineWidth = 3;
        
        // Horizontal lines
        for (let y = this.y; y < this.y + this.height; y += this.brickHeight) {
            ctx.beginPath();
            ctx.moveTo(this.x, y);
            ctx.lineTo(this.x + this.width, y);
            ctx.stroke();
        }
        
        // Vertical lines with offset for every other row
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