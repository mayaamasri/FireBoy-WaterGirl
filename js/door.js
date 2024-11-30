class Door extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 81;
        this.type = type;
        
        // Animation properties
        this.spriteSheet = new Image();
        this.spriteSheet.src = 'images/doors.png';
        this.frameWidth = 111;  // Width of each frame in the sprite sheet
        this.frameHeight = 120; // Height of each frame
        this.totalFrames = 18;
        this.currentFrame = 0;
        this.frameInterval = 30; // Time between frames in ms
        this.lastFrameUpdate = 0;
        
        // Door state
        this.state = {
            current: 'CLOSED',
            CLOSED: { startFrame: 17, endFrame: 0, direction: -1 },
            OPENING: { startFrame: 0, endFrame: 17, direction: 1 },
        };
    }

    update(sprites) {
        let playerNearby = false;
        
        // Check if the matching player type is nearby
        sprites.forEach(sprite => {
            if ((sprite instanceof FireBoy && this.type === 'fire') ||
                (sprite instanceof WaterGirl && this.type === 'water')) {
                
                // Check if player is within range
                const distance = Math.sqrt(
                    Math.pow(this.x - sprite.x, 2) + 
                    Math.pow(this.y - sprite.y, 2)
                );
                
                if (distance < 100) { // Adjust detection radius as needed
                    playerNearby = true;
                }
            }
        });

        // Update door state based on player proximity
        const currentState = this.state.current;
        const currentTime = Date.now();
        
        if (playerNearby && currentState === 'CLOSED') {
            this.state.current = 'OPENING';
        } else if (!playerNearby && currentState === 'OPENING' && 
                   this.currentFrame === this.state[currentState].endFrame) {
            this.state.current = 'CLOSED';
        }

        // Update animation frame
        if (currentTime - this.lastFrameUpdate > this.frameInterval) {
            const stateConfig = this.state[this.state.current];
            
            // Update frame based on current state direction
            if (this.currentFrame !== stateConfig.endFrame) {
                this.currentFrame += stateConfig.direction;
            }
            
            this.lastFrameUpdate = currentTime;
        }

        return false;
    }

    draw(ctx) {
        // Draw the door frame from the sprite sheet
        ctx.drawImage(
            this.spriteSheet,
            this.currentFrame * this.frameWidth, // Source X
            this.type === 'fire' ? 0 : this.frameHeight, // Source Y (different row for each type)
            this.frameWidth,  // Source width
            this.frameHeight, // Source height
            this.x,          // Destination X
            this.y,          // Destination Y
            this.width,      // Destination width
            this.height      // Destination height
        );
    }
}