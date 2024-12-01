class MenuScreen extends Sprite {
    constructor() {
        super();
        this.state = {
            current: 'MENU',
            MENU: 'MENU',
            STORY: 'STORY',
            WALKTHROUGH: 'WALKTHROUGH',
            LEVEL_SELECT: 'LEVEL_SELECT',
            PLAYING: 'PLAYING',
            GAME_OVER: 'GAME_OVER',
            WIN: 'WIN'
        };
        
        this.selectedLevel = 1;
        this.maxLevels = 3;
        
        this.background = new Image();
        this.background.src = 'images/menu-bg.png';
        
        this.bgMusic = new Audio('sounds/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4;

        this.buttons = {
            MENU: [
                { text: 'Play', x: 350, y: 325, width: 150, height: 50 },
                { text: 'Story', x: 350, y: 400, width: 150, height: 50 },
                { text: 'Walkthrough', x: 300, y: 475, width: 250, height: 50 }
            ],
            STORY: [
                { text: 'Back', x: 350, y: 600, width: 150, height: 50 }
            ],
            WALKTHROUGH: [
                { text: 'Back', x: 350, y: 600, width: 150, height: 50 }
            ],
            LEVEL_SELECT: [
                { text: 'Level 1', x: 350, y: 350, width: 150, height: 50 },
                { text: 'Level 2', x: 350, y: 420, width: 150, height: 50 },
                { text: 'Level 3', x: 350, y: 495, width: 150, height: 50 },
                { text: 'Back', x: 350, y: 600, width: 150, height: 50 }
            ],
            GAME_OVER: [
                { text: 'Retry', x: 300, y: 400, width: 150, height: 50 },
                { text: 'Menu', x: 500, y: 400, width: 150, height: 50 }
            ],
            WIN: [
                { text: 'Next Level', x: 300, y: 400, width: 150, height: 50 },
                { text: 'Menu', x: 500, y: 400, width: 150, height: 50 }
            ]
        };

        this.content = {
            STORY: 'FireBoy and WaterGirl must work together to collect gems and reach their respective doors.',
            WALKTHROUGH: 'Use WASD to control WaterGirl and Arrow Keys for FireBoy. Press O near levers to activate them. Press R to restart.',
            GAME_OVER: 'Game Over! Try again?',
            WIN: 'Level Complete!'
        };

        document.addEventListener('click', () => this.bgMusic.play(), { once: true });
    }


    update(sprites, keys) {
        const canvas = document.getElementById('canvas');
        const rect = canvas.getBoundingClientRect();
        
        canvas.onclick = (event) => {
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            
            if (this.buttons[this.state.current]) {
                this.buttons[this.state.current].forEach(button => {
                    if (mouseX >= button.x && mouseX <= button.x + button.width &&
                        mouseY >= button.y && mouseY <= button.y + button.height) {
                        this.handleButtonClick(button.text);
                    }
                });
            }
        };

        return this.state.current === this.state.PLAYING;
    }

    handleButtonClick(buttonText) {
        switch(buttonText) {
            case 'Play':
                this.state.current = this.state.LEVEL_SELECT;
                break;
            case 'Story':
                this.state.current = this.state.STORY;
                break;
            case 'Walkthrough':
                this.state.current = this.state.WALKTHROUGH;
                break;
            case 'Back':
                this.state.current = this.state.MENU;
                break;
                case 'Level 1':
                    const levelManager = new LevelManager();
                    levelManager.loadLevel(1);
                    this.state.current = this.state.PLAYING;
                    break;
                case 'Level 2':
                    const levelManager2 = new LevelManager();
                    levelManager2.loadLevel(2);
                    this.state.current = this.state.PLAYING;
                    break;
                case 'Level 3':
                    const levelManager3 = new LevelManager();
                    levelManager3.loadLevel(3);
                    this.state.current = this.state.PLAYING;
                    break;
            case 'Retry':
                this.state.current = this.state.PLAYING;
                break;
            case 'Menu':
                this.state.current = this.state.MENU;
                break;
            case 'Next Level':
                if (this.selectedLevel < this.maxLevels) {
                    this.selectedLevel++;
                    this.state.current = this.state.PLAYING;
                } else {
                    this.state.current = this.state.MENU;
                }
                break;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.background, 0, 0, 850, 750);

        if (this.state.current !== this.state.PLAYING) {
            if (this.state.current !== this.state.MENU) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, 850, 750);
            }
            
            ctx.font = '48px TrajanPro';
            ctx.fillStyle = '#DCBB12';
            ctx.textAlign = 'center';
            
            // Draw title
            const title = this.state.current.charAt(0) + this.state.current.slice(1).toLowerCase();
            if(title!=="Menu")
            ctx.fillText(title.replace('_', ' '), 425, 300);
            
            // Draw content if available
            if (this.content[this.state.current]) {
                ctx.font = '24px TrajanPro';
                ctx.fillStyle = '#FFFFFF';
                this.wrapText(ctx, this.content[this.state.current], 425,375, 600, 30);
            }
            
            // Draw buttons
            if (this.buttons[this.state.current]) {
                this.drawButtons(ctx, this.state.current);
            }
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