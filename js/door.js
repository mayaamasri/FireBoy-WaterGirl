class Door extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.type = type; 
    }

    update() {
        return false;
    }

    draw(ctx) {
        ctx.fillStyle = this.type === 'fire' ? '#8B0000' : '#00008B';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}