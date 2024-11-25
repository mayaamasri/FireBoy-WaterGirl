class Platform extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {
    }

    draw(ctx) {
        ctx.fillStyle = '#776C2E';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}