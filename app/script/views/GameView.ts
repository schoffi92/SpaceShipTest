

class GameView extends PIXI.Container implements IView
{
    private playerDead: boolean = false;
    private viewName: string = "game";
    private game: Game;
    private spentTime: number = 0;

    private shipSprite: PIXI.Sprite;
    private player: PlayerShip;
    private enemies: Array<EnemyShip> = [];
    private res: Resources;

    private farBg: SlideTexture;
    private nearBg: SlideTexture;

    constructor(game: Game, res: Resources)
    {
        super();

        this.game = game;
        this.game.addView(this.viewName, this);
        this.res = res;

        this.farBg = new SlideTexture(this.game, res.resources.gamebg_far.texture, -1);
        this.nearBg = new SlideTexture(this.game, res.resources.gamebg_near.texture, -10);
        this.nearBg.y = this.game.height - res.resources.gamebg_near.texture.height;
    }

    public activate(): void
    {
        this.farBg.activate();
        this.nearBg.activate();

        this.game.stage.addChild(this);
        this.game.ticker.add(this.update, this);
        this.player = new PlayerShip(this.game, this.res);
        this.player.activate();
        this.playerDead = false;
    }

    public deactivate(): void
    {
        this.farBg.deactivate();
        this.nearBg.deactivate();
        this.game.stage.removeChildren();
        this.game.ticker.remove(this.update, this);
        this.player.deactivate();

        for (let i in this.enemies) {
            this.enemies[i].deactivate();
        }
        this.enemies = [];
        this.player = undefined;
    }

    private addEnemy(): void
    {
        var enemy: EnemyShip = new EnemyShip(this.game, this.res);
        enemy.activate();

        this.enemies.push(enemy);
    }

    private displayGameOver(): void
    {
        // Kill The Player
        this.player.die();
        this.playerDead = true;

        // Display Game Over Text
        var text: PIXI.Text = new PIXI.Text("Game Over");
        text.anchor.set(0.5, 0.5);
        text.position.x = this.game.width / 2;
        text.position.y = this.game.height / 2;
        text.style = new PIXI.TextStyle({
            fontFamily: "Dignity",
            fontSize: 50,
            fill: "#888888",
        });
        this.addChild(text);
        
        // Spend 4s on game Over Screen then switch to menu
        setTimeout( () => {
            this.removeChild(text);
            this.game.switchView("menu");
        }, 4000);
    }

    private detectCollision(): void
    {
        // Collisions
            for (let i:number=this.enemies.length-1;i>=0;i--)
            {
                // Player collide with enemy
                if (Collider.hitTest(
                    this.enemies[i].collisionBox(),
                    this.player.collisionBox()
                )) {
                    this.displayGameOver();
                    return;
                }

                // If Enemy is out of the screen then destroy it
                if (this.enemies[i].x < -this.enemies[i].width)
                {
                    this.enemies[i].deactivate();
                    this.enemies.splice(i, 1);
                    continue;
                }

                // Rocket collide with enemy
                for (let j: number=this.player.rockets.length-1;j>=0;j--)
                {
                    if (Collider.hitTest(
                        this.enemies[i].collisionBox(),
                        this.player.rockets[j].collisionBox()
                    )) {
                        this.enemies[i].die();
                        this.enemies[i].deactivate();
                        this.enemies.splice(i, 1);
                        this.player.rockets[j].deactivate();
                        this.player.rockets.splice(j, 1);
                        break;
                    }
                }
            }
    }

    private update(deltaTime: number): void
    {
        if (!this.playerDead)
        {
            this.detectCollision();
        }

        if (this.spentTime > 120)
        {
            this.addEnemy();
            this.spentTime -= 120;
        }

        this.spentTime += deltaTime;
    }
}