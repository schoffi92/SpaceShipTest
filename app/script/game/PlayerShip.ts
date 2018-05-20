

class PlayerShip extends PIXI.Container implements IView {

    private game: Game;
    private shipSprite: PIXI.Sprite;
    private speed: number = 2;
    public rockets: Array<Rocket> = [];
    private res: Resources;
    private shootDelay: number = 0;

    constructor(game: Game, res: Resources)
    {
        super();

        this.game = game;
        this.res = res;
        this.shipSprite = new PIXI.Sprite();
        this.shipSprite.texture = res.resources.player.texture;
        this.shipSprite.rotation = (Math.PI / 180) * 90;
        this.addChild(this.shipSprite);
    }

    private shoot(): void
    {
        var r: Rocket = new Rocket(this.game, this.res);
        r.position.set(this.x - (this.width / 2), this.y + (this.height / 2));
        r.activate();

        this.rockets.push(r);
    }

    private update(deltaTime: number): void
    {
        if (this.game.keyboard.getKey("ArrowUp"))
        {
            if (this.y > 0) {
                this.y -= this.speed * deltaTime;
            }
            else
            {
                this.y = 0;
            }
        }

        if (this.game.keyboard.getKey("ArrowDown"))
        {
            if (this.y < this.game.height - this.shipSprite.height)
            {
                this.y += this.speed * deltaTime;
            }
            else
            {
                this.y = this.game.height - this.shipSprite.height;
            }
        }

        if (this.game.keyboard.getKey("ArrowLeft"))
        {
            if (this.x > this.shipSprite.width)
            {
                this.x -= this.speed * deltaTime;
            }
            else
            {
                this.x = this.shipSprite.width;
            }
        }

        if (this.game.keyboard.getKey("ArrowRight"))
        {
            if (this.x < this.game.width)
            {
                this.x += this.speed * deltaTime;
            }
            else
            {
                this.x = this.game.width;
            }
        }

        if (this.game.keyboard.getKey("Space"))
        {
            this.shootDelay -= deltaTime;
            if (this.shootDelay <= 0) {
                this.shoot();
                this.shootDelay += 25;
            }
        }

        // Remove Rockets
        if (this.rockets.length > 0)
        {
            for (let i: number=this.rockets.length;i>=0;i--)
            {
                if (this.rockets[i].x + this.rockets[i].width > this.game.width)
                {
                    this.rockets[i].deactivate();
                    this.rockets.splice(i, 1);
                }
            }
        }
    }

    public activate(): void
    {
        this.game.stage.addChild(this);
        this.game.ticker.add(this.update, this);
        this.position.set(this.shipSprite.width, this.game.height / 2);
    }

    public deactivate(): void
    {
        this.game.stage.removeChild(this);
        this.game.ticker.remove(this.update, this);
    }

    public die(): void
    {
        this.deactivate();
        Explosion.createExplosionEffect(this.game, this.res, this.x - (this.width / 2), this.y + (this.height / 2), this);
    }

    public collisionBox(): ICollisionBox
    {
        return <ICollisionBox>{
            x: this.x - this.width,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

}