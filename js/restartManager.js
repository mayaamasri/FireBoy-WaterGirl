class RestartManager extends Sprite {
    constructor(levelSprites) {
        super();
        this.levelSprites = this.cloneLevelData(levelSprites);
        this.bindRestartEvent();
    }

    cloneLevelData(sprites) {
        return sprites.map(sprite => {
            const { constructor: SpriteType, x, y, width, height, type, moveDistance, direction } = sprite;
            switch(true) {
                case sprite instanceof Background: return new SpriteType();
                case sprite instanceof Platform: return new SpriteType(x, y, width, height);
                case sprite instanceof MovingBar: return new SpriteType(x, y, width, height, moveDistance, direction);
                case sprite instanceof ButtonBar: return new SpriteType(x, y, width, height, moveDistance, direction);
                case sprite instanceof River: return new SpriteType(x, y, width, height, type);
                case sprite instanceof Gem: return new SpriteType(x, y, type);
                case sprite instanceof Door: return new SpriteType(x, y, type);
                case sprite instanceof Lever: return new SpriteType(x, y);
                case sprite instanceof Button: return new SpriteType(x, y);
                case sprite instanceof Rock: return new SpriteType(x, y, width, height);
                case sprite instanceof FireBoy: return new SpriteType(100, 575);
                case sprite instanceof WaterGirl: return new SpriteType(100, 675);
                default: return null;
            }
        }).filter(Boolean);
    }

    bindRestartEvent() {
        document.addEventListener('keydown', e => {
            if (e.key === 'r') this.restartLevel();
        });
    }

    restartLevel() {
        game.sprites = this.cloneLevelData(this.levelSprites);
        game.addSprite(this);
    }

    update() {
        return false;
    }
}