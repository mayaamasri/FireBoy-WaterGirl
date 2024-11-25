class Background extends Sprite {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 1000;
        this.height = 800;
        this.image = new Image();
        this.image.src = 'images/background.png';
    }

    update() {
    }

    draw(ctx) {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = '#2D2D0C';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}