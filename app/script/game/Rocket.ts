
class Rocket extends PIXI.Container implements IView
{
    private game: Game;
    private rocketSprite: PIXI.Sprite;
    private speed: number = 10;

    constructor(game: Game, res: Resources)
    {
        super();

        this.game = game;
        this.rocketSprite = new PIXI.Sprite();
        this.rocketSprite.anchor.set(0.5, 0.5);
        this.rocketSprite.texture = res.resources.rocket.texture;
        this.addChild(this.rocketSprite);
    }

    private update(deltaTime: number): void
    {
        this.x += this.speed * deltaTime;
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
}
