

document.addEventListener("DOMContentLoaded", () => {
    // Load Assets
    var res: Resources = new Resources();
    res.load( () => {

        // Resources loaded
        var game: Game = new Game(document.getElementById("canvasContainer"));
        var splashView: SplashView = new SplashView(game, res);
        var menuView: MenuView = new MenuView(game, res);
        var gameView: GameView = new GameView(game, res);

        // Start with Splash Screen
        if (!game.switchView("splash")) {
            var elements: NodeListOf<HTMLElement> = document.getElementsByName("canvas");
            if (elements.length > 0) {
                for (let i:number =0;i<elements.length;i++) {
                    elements[i].remove();
                }
            }

            document.getElementById("error").classList.remove("hidden");
        }
    });
});

