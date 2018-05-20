
interface IExplosionSetup
{
    particlePerSecond: number;

    minParticleLifeTime: number;
    maxParticleLifeTime: number;
    speed: number;

    maxScale: number;
}

interface IExplosionParticle
{
    lifetime: number;
    maxLifetime: number; // For Random
    directionX: number;
    directionY: number;
    sprite: PIXI.Sprite;

    scale: number;
}

class Explosion extends PIXI.Container implements IView
{
    private game: Game;
    private res: Resources;
    private sprites: Array<IExplosionParticle> = [];
    private setup: IExplosionSetup;
    private spentTime: number = 0;

    constructor(game: Game, res: Resources, setup?: IExplosionSetup)
    {
        super();

        this.game = game;
        this.res = res;
        this.setup = setup;

        this.game.stage.addChild(this);
    }

    public static createExplosionEffect(game: Game, res: Resources, posX: number, posY: number, self: PIXI.Container): void
    {
        var e: Explosion = new Explosion(game, res, {
            maxParticleLifeTime: 12,
            minParticleLifeTime: 10,
            speed: 2,
            particlePerSecond: 0,

            maxScale: 0.5,
        });

        e.position.set(posX, posY);
        game.stage.addChild(e);
        game.ticker.add(e.update, e);
        e.emitParticles(10);

        setTimeout( () => {
            self.removeChild(e);
            game.ticker.remove(e.update, e);
        }, 10000);
    }

    private createExplosionParticle(): void
    {
        var s: PIXI.Sprite = new PIXI.Sprite(this.res.resources.explosion.texture);
        var p: IExplosionParticle = {
            lifetime: 0,
            maxLifetime: (Math.random() * (this.setup.maxParticleLifeTime - this.setup.minParticleLifeTime)) + this.setup.minParticleLifeTime,
            directionX: Math.random() * 2 -1,
            directionY: Math.random() * 2 -1,
            sprite: s,
            scale: this.setup.maxScale
        };
        s.anchor.set(0.5, 0.5);
        s.position.set(s.x + p.directionX, s.y + p.directionY);
        s.scale.set(this.setup.maxScale, this.setup.maxScale);

        this.sprites.push(p);
        this.addChild(s);
    }

    public activate(): void
    {
        this.game.ticker.add(this.update, this);
    }

    public deactivate(): void
    {
        this.game.stage.removeChild(this);
        this.game.ticker.remove(this.update, this);
    }

    public emitParticles(count: number): void
    {
        for (let i: number=0;i<count;i++)
        {
            this.createExplosionParticle();
        }
    }

    public update(deltaTime: number): void
    {
        for (let i: number=this.sprites.length-1;i>=0;i--)
        {
            this.sprites[i].sprite.x += this.sprites[i].directionX * this.setup.speed * deltaTime;
            this.sprites[i].sprite.y += this.sprites[i].directionY * this.setup.speed * deltaTime;

            this.sprites[i].lifetime += deltaTime;
            this.sprites[i].scale = (1 - (this.sprites[i].lifetime / this.sprites[i].maxLifetime)) * this.setup.maxScale;
            this.sprites[i].sprite.scale.set(this.sprites[i].scale, this.sprites[i].scale);

            if (this.sprites[i].lifetime > this.sprites[i].maxLifetime)
            {
                this.removeChild(this.sprites[i].sprite);
                this.sprites.splice(i, 1);
            }
        }

        if (this.setup.particlePerSecond > 0)
        {
            this.emitParticles(this.setup.particlePerSecond);
        }
    }

}