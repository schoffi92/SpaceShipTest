
class Game {

    private _app: PIXI.Application;

    private lastTime: number = 0;
    private currentViewIndex: number = 0;
    private viewNames: Array<string> = [];
    private views: Array<IView> = [];
    private _keyboard: Keyboard;

    constructor(parent?: HTMLElement)
    {
        parent = parent || document.body;
        this._app = new PIXI.Application({
            width: 800,
            height: 600,
            //roundPixels: true,
        });

        this._keyboard = new Keyboard();
        parent.appendChild(this._app.view);
    }

    public get stage(): PIXI.Container
    {
        return this._app.stage;
    }

    public get ticker(): PIXI.ticker.Ticker
    {
        return this._app.ticker;
    }

    public get width(): number
    {
        return this._app.screen.width;
    }

    public get height(): number
    {
        return this._app.screen.height;
    }

    public get keyboard(): Keyboard
    {
        return this._keyboard;
    }

    public addView(id: string, view: IView): boolean
    {
        var index: number = this.viewNames.indexOf(id);
        if (index >= 0) return false;

        this.viewNames.push(id);
        this.views.push(view);
    }
    
    /**
     * Switch View
     * 
     * Removes stage children and ticker events
     * Then 
     * 
     * @param id 
     */
    public switchView(id: string): boolean
    {
        var index: number = this.viewNames.indexOf(id);

        if (index >= 0) {
            this.views[this.currentViewIndex].deactivate();
            this.views[index].activate();
            this.currentViewIndex = index;
            return true;
        }
        return false;
    }

}
