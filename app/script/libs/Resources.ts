

class Resources extends PIXI.loaders.Loader
{
    private _isCompleted: boolean = false;
    private _completed: Function = () => {};
    private _res: Object = {};

    constructor() {
        super();

        this.add("player", "resources/player.png")
            .add("buttons", "resources/buttons.jpg")
            .add("menubg", "resources/menubg.jpg")
            .add("rocket", "resources/rocket.png")
            .add("enemy", "resources/enemy.png")
            .add("logo", "resources/logo.png")
            .add("gamebg_far", "resources/sky.gif")
            .add("gamebg_near", "resources/landscape.jpg")
            .add("explosion", "resources/explosion2.png")
            .add("splash", "resources/splash.jpg");
    }

}