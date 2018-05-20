
interface IButton extends PIXI.Sprite
{

    displayDefault(): void;
    displayHover(): void;
    displayPressed(): void;

    clicked(): void;
    onClicked(clicked: Function): void;

}

interface IButtonSetup
{
    texture: PIXI.Texture;

    width: number;
    height: number;

    buttonPosX: number;
    buttonPosY: number;

    name?: string;
}

