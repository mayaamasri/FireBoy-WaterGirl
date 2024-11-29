class Lever extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 50;
        this.state = {
            current: 'OFF',
            OFF: 'ON',
            ON: 'OFF'
        };
        this.lastInteraction = 0;
        this.cooldownPeriod = 500;
        this.interactingPlayer = null;
        
        this.image = new Image();
        this.image.src = 'images/lever.png';
        this.frameWidth = 80;
        this.frameHeight = 70;

        const fontFace = new FontFace('TrajanPro', 'url(fonts/TrajanPro-Bold.otf)');
        fontFace.load().then(font => {
            document.fonts.add(font);
        });
    }

    update(sprites, keys) {
        const currentTime = Date.now();
        let playerInRange = false;
        
        sprites.forEach(sprite => {
            if ((sprite instanceof FireBoy || sprite instanceof WaterGirl) && 
                this.checkCollision(sprite)) {
                playerInRange = true;
                this.interactingPlayer = sprite;
            }
        });

        if (!playerInRange) {
            this.interactingPlayer = null;
            return false;
        }

        if (this.interactingPlayer && 
            currentTime - this.lastInteraction > this.cooldownPeriod && 
            keys['o']) {
            this.toggle();
            this.lastInteraction = currentTime;
        }

        return false;
    }

    toggle() {
        this.state.current = this.state[this.state.current];
    }

    checkCollision(player) {
        return this.x < player.x + player.width &&
               this.x + this.width > player.x &&
               this.y < player.y + player.height &&
               this.y + this.height > player.y;
    }

    draw(ctx) {
        const frameIndex = this.state.current === 'ON' ? 1 : 0;
        
        ctx.drawImage(
            this.image,
            frameIndex * this.frameWidth,
            0,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );

        if (this.interactingPlayer) {
            ctx.fillStyle = '#DCBB12';
            ctx.font = '14px TrajanPro';
            ctx.fillText('Press O', this.x + 5, this.y - 25);
        }
    }

    isActive() {
        return this.state.current === 'ON';
    }
}