class MenuScreen extends Sprite {
    constructor() {
        super();
        this.state = {
            current: 'MENU',
            MENU: 'MENU',
            STORY: 'STORY',
            WALKTHROUGH: 'WALKTHROUGH',
            PLAYING: 'PLAYING'
        };
        
        this.background = new Image();
        this.background.src = 'images/menu-bg.png';
        
        this.bgMusic = new Audio('sounds/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4;

        this.buttons = {
            MENU: [
                { text: 'Play', x: 350, y: 300, width: 150, height: 50 },
                { text: 'Story', x: 350, y: 375, width: 150, height: 50 },
                { text: 'Walkthrough', x: 300, y: 450, width: 250, height: 50 }
            ],
            STORY: [
                { text: 'Back', x: 350, y: 600, width: 150, height: 50 }
            ],
            WALKTHROUGH: [
                { text: 'Back', x: 350, y: 600, width: 150, height: 50 }
            ]
        };

        this.content = {
            STORY: 'FireBoy and WaterGirl must work together to collect gems and reach their respective doors.',
            WALKTHROUGH: 'Use WASD to control WaterGirl and Arrow Keys for FireBoy. Press O near levers to activate them.'
        };

        document.addEventListener('click', () => this.bgMusic.play(), { once: true });
    }

    update(sprites, keys) {
        const canvas = document.getElementById('canvas');
        const rect = canvas.getBoundingClientRect();
        
        canvas.onclick = (event) => {
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            
            this.buttons[this.state.current].forEach(button => {
                if (mouseX >= button.x && mouseX <= button.x + button.width &&
                    mouseY >= button.y && mouseY <= button.y + button.height) {
                    switch(button.text) {
                        case 'Play':
                            this.state.current = this.state.PLAYING;
                            canvas.onclick = null;
                            return true;
                        case 'Story':
                            this.state.current = this.state.STORY;
                            break;
                        case 'Walkthrough':
                            this.state.current = this.state.WALKTHROUGH;
                            break;
                        case 'Back':
                            this.state.current = this.state.MENU;
                            break;
                    }
                }
            });
        };

        return this.state.current === this.state.PLAYING;
    }

    draw(ctx) {
        ctx.drawImage(this.background, 0, 0, 850, 750);

        if (this.state.current === this.state.MENU) {
            this.drawButtons(ctx, this.state.current);
        } else if (this.state.current !== this.state.PLAYING) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, 850, 750);
            
            ctx.font = '48px TrajanPro';
            ctx.fillStyle = '#DCBB12';
            ctx.textAlign = 'center';
            ctx.fillText(this.state.current.charAt(0) + this.state.current.slice(1).toLowerCase(), 425, 300);
            
            ctx.font = '24px TrajanPro';
            ctx.fillStyle = '#FFFFFF';
            this.wrapText(ctx, this.content[this.state.current], 425, 350, 600, 30);
            this.drawButtons(ctx, this.state.current);
        }
    }

    drawButtons(ctx, state) {
        this.buttons[state].forEach(button => {
            ctx.fillStyle = '#726834';
            ctx.fillRect(button.x, button.y, button.width, button.height);
            
            ctx.strokeStyle = '#5A522A';
            ctx.lineWidth = 3;
            ctx.strokeRect(button.x, button.y, button.width, button.height);
            
            ctx.font = '24px TrajanPro';
            ctx.fillStyle = '#DCBB12';
            ctx.textAlign = 'center';
            ctx.fillText(button.text, button.x + button.width/2, button.y + 35);
        });
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';

        for(let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
    }
}