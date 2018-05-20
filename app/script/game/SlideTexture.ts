

class SlideTexture extends PIXI.Container implements IView
{
    private game: Game;
    private tex: PIXI.Texture;
    private sprites: Array<PIXI.Sprite> = [];
    private speed: number = 1;

    constructor(game: Game, tex: PIXI.Texture, speed?: number)
    {
        super();

        this.speed = speed ? speed : this.speed;
        this.game = game;
        this.tex = tex;

        for (let x=0;x<this.game.width;x+=this.tex.width)
        {
            this.addTexture();
        }
    }

    addTexture()
    {
        var x = this.sprites.length > 0 ? this.sprites[this.sprites.length-1].x + this.sprites[this.sprites.length-1].width : 0;
        var s:PIXI.Sprite = new PIXI.Sprite(this.tex);
        s.x = x;
        this.addChild(s);
        this.sprites.push(s);
    }

    activate(): void
    {
        this.game.stage.addChild(this);
        this.game.ticker.add(this.update, this);
    }

    deactivate(): void
    {
        this.game.stage.removeChild(this);
        this.game.ticker.remove(this.update, this);
    }

    update(deltaTime:number): void
    {
        if (this.sprites.length > 0) {
            var last = this.sprites.length - 1;
            if (this.sprites[last].x + this.sprites[last].width + (this.speed * deltaTime) < this.game.width)
            {
                this.addTexture();
            }

            for (let i=this.sprites.length-1;i>=0;i--)
            {
                this.sprites[i].x += this.speed * deltaTime;

                // Remove Sprites what does not show
                if (this.sprites[i].x + this.sprites[i].width < 0) {
                    this.removeChild(this.sprites[i]);
                    this.sprites.splice(i, 1);
                }
            }
        }
    }

}