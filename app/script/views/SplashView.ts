

class SplashView extends PIXI.Container implements IView
{
    private viewName: string = "splash";
    private game: Game;

    private splashSprite: PIXI.Sprite;
    private spentTime: number = 0;

    constructor(game: Game, res: Resources) {
        super();

        this.game = game;

        this.game.addView(this.viewName, this);

        this.splashSprite = new PIXI.Sprite();
        this.splashSprite.texture = res.resources.splash.texture;
        
        this.addChild(this.splashSprite);
    }

    /**
     * Things to do when view is activated
     */
    public activate(): void {
        this.game.stage.addChild(this);
        this.game.ticker.add(this.update, this);
    }

    /**
     * Things to do when view is deactivated
     */
    public deactivate(): void {
        this.game.stage.removeChildren();
        this.game.ticker.remove(this.update, this);
    }

    /**
     * Called on every frame
     * 
     * @param deltaTime spent time between two frame
     */
    public update(deltaTime: number): void {
        this.spentTime += deltaTime;

        // Fade To Black If we spent 2 seconds on this view
        if (this.spentTime > 120 && this.splashSprite.alpha > 0) {
            this.splashSprite.alpha -= (deltaTime) / 30;
        }

        // If SplashScreen faded away let's switch View
        if (this.splashSprite.alpha <= 0) {
            this.game.switchView("menu");
        }
    }
}