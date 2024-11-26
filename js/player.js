class Player extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = 35;
        this.height = 35;
        this.type = type;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.gravity = 0.5;
        this.jumpForce = -10;
        this.moveSpeed = 5;

        // Sprite animation properties
        this.sprites = {
            body: new Image(),
            face: new Image()
        };
        this.sprites.body.src = 'images/water/body.png';  // Update with actual path
        this.sprites.face.src = 'images/water/face-idle.png';  // Update with actual path

        // Animation frame properties
        this.frameWidth = 105;  // Adjust based on actual sprite size
        this.frameHeight = 95; // Adjust based on actual sprite size
        this.faceWidth = 210;   // Adjust based on actual sprite size
        this.faceHeight = 255;  // Adjust based on actual sprite size
        
        // Current frame indexes
        this.bodyFrame = 0;    // First frame for idle
        this.faceFrame = 0;    // First face frame
        
        // Animation timing
        this.frameTimer = 0;
        this.frameInterval = 150; // Milliseconds between frame updates
        this.lastFrameUpdate = 0;

        this.faceOffsetY = -25;
    }

    update(sprites, keys) {
        // Existing movement and physics code
        this.velocityY += this.gravity;

        if (this.type === 'fire') {
            if (keys['ArrowLeft']) this.velocityX = -this.moveSpeed;
            else if (keys['ArrowRight']) this.velocityX = this.moveSpeed;
            else this.velocityX = 0;

            if (keys['ArrowUp'] && !this.isJumping) {
                this.velocityY = this.jumpForce;
                this.isJumping = true;
            }
        } else {
            if (keys['a']) this.velocityX = -this.moveSpeed;
            else if (keys['d']) this.velocityX = this.moveSpeed;
            else this.velocityX = 0;

            if (keys['w'] && !this.isJumping) {
                this.velocityY = this.jumpForce;
                this.isJumping = true;
            }
        }

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Boundary checking
        if (this.x < 0) {
            this.x = 0;
            this.velocityX = 0;
        } else if (this.x + this.width > 850) {
            this.x = 850 - this.width;
            this.velocityX = 0;
        }
    
        if (this.y < 0) {
            this.y = 0;
            this.velocityY = 0;
        } else if (this.y + this.height > 650) {
            this.y = 650 - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
        
        // Platform collision
        sprites.forEach(sprite => {
            if (sprite instanceof Platform) {
                if (this.checkCollision(sprite)) {
                    this.handlePlatformCollision(sprite);
                }
            }
        });

        // Update animation frames
        const currentTime = Date.now();
        if (currentTime - this.lastFrameUpdate > this.frameInterval) {
            // Update face animation
            this.faceFrame = (this.faceFrame + 1) % 6;
            this.lastFrameUpdate = currentTime;
        }
        
        return false;
    }

    draw(ctx) {
        // Draw body (idle frame)
        if(this.type==='water'){
            ctx.drawImage(
                this.sprites.body,
                0,
                0,
                this.frameWidth,
                this.frameHeight,
                this.x,
                this.y+5,
                30,
                30
            );
    
            // Draw face animation
            ctx.drawImage(
                this.sprites.face,
                this.faceFrame * this.faceWidth,
                0,
                this.faceWidth,
                this.faceHeight,
                this.x-2,
                this.y + this.faceOffsetY,
                this.width,
                this.width
            );
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    }

    // Existing collision methods remain the same
    checkCollision(platform) {
        return this.x < platform.x + platform.width &&
               this.x + this.width > platform.x &&
               this.y < platform.y + platform.height &&
               this.y + this.height > platform.y;
    }

    handlePlatformCollision(platform) {
        if (this.velocityY > 0 && 
            this.y + this.height - this.velocityY <= platform.y) {
            this.y = platform.y - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
        else if (this.velocityY < 0 && 
                 this.y - this.velocityY >= platform.y + platform.height) {
            this.y = platform.y + platform.height;
            this.velocityY = 0;
        }
        else {
            if (this.velocityX > 0) {
                this.x = platform.x - this.width;
            } else if (this.velocityX < 0) {
                this.x = platform.x + platform.width;
            }
            this.velocityX = 0;
        }
    }
}