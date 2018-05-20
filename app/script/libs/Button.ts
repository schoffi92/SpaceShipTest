
class Button extends PIXI.Sprite implements IButton
{
    private _cb: Function = () => {};
    private _clickStarted: boolean = false;
    private _tilingSprite: PIXI.extras.TilingSprite;
    private setup: IButtonSetup;


    constructor(setup: IButtonSetup) {
        super();

        this._tilingSprite = new PIXI.extras.TilingSprite(setup.texture, setup.width, setup.height);
        this._tilingSprite.anchor.set(0.5, 0.5);
        this.setup = setup;
        this.displayDefault();
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.interactive = true;
        this.addChild(this._tilingSprite);

        this.on("mousedown", () => {
            this.onDown();
        });

        this.on("mouseup", () => {
            this.onUp();
        });

        this.on("mouseover", () => {
            this.onHover();
        });

        this.on("mouseout", () => {
            this.onOut();
        });
    }

    public get name(): string
    {
        return (this.setup.name || "");
    }

    public displayDefault(): void
    {
        this._tilingSprite.tilePosition.set(-this.setup.buttonPosX, -(this.setup.buttonPosY));
    }

    public displayHover(): void
    {
        this._tilingSprite.tilePosition.set(-this.setup.buttonPosX, -(this.setup.buttonPosY + this.setup.height));
    }

    public displayPressed(): void
    {
        this._tilingSprite.tilePosition.set(-this.setup.buttonPosX, -(this.setup.buttonPosY + this.setup.height * 2));
    }

    public clicked(): void
    {
        this._cb();
    }

    public onClicked(clicked: Function): void
    {
        this._cb = clicked;
    }

    private onUp(): void
    {
        if (this._clickStarted) {
            this.displayDefault();
            this.clicked();
            this._clickStarted = false;
        }
    }

    private onDown(): void
    {
        this.displayPressed();
        this._clickStarted = true;
    }

    private onOut(): void
    {
        this.displayDefault();
        this._clickStarted = false;
    }

    private onHover(): void
    {
        this.displayHover();
    }
}