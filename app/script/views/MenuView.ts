

class MenuView extends PIXI.Container implements IView
{
    private viewName: string = "menu";
    private game: Game;

    private background: PIXI.Sprite;
    private logo: PIXI.Sprite;
    private btns: Array<Button> = [];
    private spentTime: number = 0;
    private res: Resources;

    constructor(game: Game, res: Resources)
    {
        super();

        this.game = game;

        this.game.addView(this.viewName, this);

        this.res = res;
        this.background = new PIXI.Sprite();
        this.background.texture = res.resources.menubg.texture;
        
        this.addChild(this.background);

        this.createLogo();
        this.createButtons();
    }

    /**
     * Make View Active
     * 
     * Add View to the Application
     */
    public activate(): void
    {
        this.game.stage.addChild(this);

        for (let i in this.btns) {
            this.btns[i].displayDefault();
        }
    }

    /**
     * Make View Inactive
     */
    public deactivate(): void
    {
        this.game.stage.removeChildren();
    }

    /**
     * Creates the logo
     */
    private createLogo(): void
    {
        this.logo = new PIXI.Sprite();
        this.logo.texture = this.res.resources.logo.texture;
        this.logo.anchor.set(0.5, 0.5);
        this.logo.x = this.game.width / 2;
        this.logo.y = 150;

        this.addChild(this.logo);
    }

    /**
     * Adds a Button
     * 
     * @param text Button's label/caption
     * @param clicked On Click Event
     */
    private addButton(name: string, clicked?: Function): void
    {
        var opt: IButtonSetup = {
            texture: this.res.resources.buttons.texture,
            width: 150,
            height: 50,

            buttonPosX: (150 * this.btns.length),
            buttonPosY: 0,

            name
        };
        var btn: Button = new Button(opt);
        if (!clicked) {
            clicked = ((): void => { this.gameBtnClicked(); });
        }

        btn.anchor.set(0.5, 0.5);
        btn.position.set(this.game.width / 2, this.btns.length * 70 + 300);
        btn.onClicked( clicked );

        this.btns.push(btn);
        this.addChild(btn);
    }

    /**
     * Create Buttons
     * 
     * Create An exit button and three game buttons
     */
    private createButtons(): void
    {
        this.addButton("GAME1");
        this.addButton("GAME2");
        this.addButton("GAME3");
        this.addButton("EXIT", () => { this.exitBtnClicked(); });
    }

    /**
     * Next Game
     * 
     * If Any Game Button pressed this function will be executed
     */
    private gameBtnClicked(): void {
        this.game.switchView("game");
    }

    /**
     * Exit Game
     * 
     * If Exit Button Pressed this function will be executed
     */
    private exitBtnClicked(): void {
        location.href = "/goodbye.html";
    }
}