class WaterGirl extends Player {
    constructor(x, y) {
        super(x, y, 'water');
        
        this.sprites = {
            body: new Image(),
            walkFace: new Image(),
            idleFace: new Image()
        };
        this.sprites.body.src = 'images/water/body.png';
        this.sprites.walkFace.src = 'images/water/face-walking.png';
        this.sprites.idleFace.src = 'images/water/face-idle.png';

        this.frameWidth = 105;
        this.frameHeight = 95;
        this.walkFaceWidth = 380;
        this.walkFaceHeight = 215;
        this.idleFaceWidth = 210;
        this.idleFaceHeight = 255;
        
        this.bodyFrame = 0;
        this.walkFaceFrame = 0;
        this.idleFaceFrame = 0;
        this.maxBodyFrames = 8;
        this.maxWalkFaceFrames = 7;
        this.maxIdleFaceFrames = 5;
        
        this.frameInterval = 120;
        this.lastFrameUpdate = 0;
        this.faceOffsetY = -20;
        this.isMoving = false;
        this.direction = 1;
    }

    handleMovement(keys) {
        this.isMoving = false;
        if (keys['a']) {
            this.velocityX = -this.moveSpeed;
            this.direction = -1;
            this.isMoving = true;
        } else if (keys['d']) {
            this.velocityX = this.moveSpeed;
            this.direction = 1;
            this.isMoving = true;
        } else {
            this.velocityX = 0;
            this.bodyFrame = 0;
        }

        if (keys['w'] && !this.isJumping) {
            this.velocityY = this.jumpForce;
            this.isJumping = true;
        }
    }

    draw(ctx) {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameUpdate > this.frameInterval) {
            if (this.isMoving) {
                this.bodyFrame = (this.bodyFrame + 1) % this.maxBodyFrames + 1;
                this.walkFaceFrame = (this.walkFaceFrame + 1) % this.maxWalkFaceFrames;
            }
            this.idleFaceFrame = (this.idleFaceFrame + 1) % this.maxIdleFaceFrames;
            this.lastFrameUpdate = currentTime;
        }

        ctx.save();
        if (this.direction === -1) {
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }

        ctx.drawImage(
            this.sprites.body,
            this.bodyFrame * this.frameWidth,
            0,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y + 10,
            30,
            25
        );

        if (this.isMoving) {
            ctx.drawImage(
                this.sprites.walkFace,
                this.walkFaceFrame * this.walkFaceWidth,
                0,
                this.walkFaceWidth,
                this.walkFaceHeight,
                this.x - 15,
                this.y + this.faceOffsetY,
                50,
                this.width
            );
        } else {
            ctx.drawImage(
                this.sprites.idleFace,
                this.idleFaceFrame * this.idleFaceWidth,
                0,
                this.idleFaceWidth,
                this.idleFaceHeight,
                this.x - 5,
                this.y + this.faceOffsetY,
                40,
                40
            );
        }

        ctx.restore();
    }
}