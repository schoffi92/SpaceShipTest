

class EnemyShip extends PIXI.Container implements IView {

    private game: Game;
    private movement: PIXI.Point;
    private speed: number = 1;

    private shipSprite: PIXI.Sprite;
    private res: Resources;

    constructor(game: Game, res: Resources)
    {
        super();

        this.game = game;
        this.res = res;
        this.shipSprite = new PIXI.Sprite();
        this.shipSprite.texture = res.resources.enemy.texture;
        this.addChild(this.shipSprite);

        //this.anchor.set(0.5, 0.5);
        this.movement = new PIXI.Point();
        this.position.set(this.game.width, (this.game.height - this.shipSprite.height) * Math.random());
        this.randMovement();
    }

    private randMovement(): void
    {
        this.movement.x = -1;
        this.movement.y = (Math.random() * 2) - 1;

        if (this.movement.y < 0.1 && this.movement.y > -0.1) {
            this.movement.y = -0.1;
        }
    }

    private update(deltaTime: number): void
    {
        this.position.set(
            this.x + (this.movement.x * deltaTime * this.speed),
            this.y + (this.movement.y * deltaTime * this.speed * 1.2)
        );

        if ((this.position.y <= 0) ||
            (this.position.y + this.shipSprite.height >= this.game.height)
        ) {
            this.movement.y = - this.movement.y;
        }
        else if (Math.random() < 0.005) {
            this.randMovement();
        }
    }

    public activate(): void
    {
        this.game.stage.addChild(this);
        this.game.ticker.add(this.update, this);
    }

    public deactivate(): void
    {
        this.game.stage.removeChild(this);
        this.game.ticker.remove(this.update, this);
    }

    public collisionBox(): ICollisionBox
    {
        return <ICollisionBox>{
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    public die(): void
    {
        Explosion.createExplosionEffect(this.game, this.res, this.x - (this.width / 2), this.y + (this.height / 2), this);
    }

}