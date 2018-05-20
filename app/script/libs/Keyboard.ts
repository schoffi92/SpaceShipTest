
class Keyboard {

    pressedKeys: Array<string> = [];

    constructor()
    {

        document.addEventListener("keydown", (e: KeyboardEvent): void => { this.downHandler(e); });
        document.addEventListener("keyup", (e: KeyboardEvent): void => { this.upHandler(e); });
    }

    private downHandler(keyEvent: KeyboardEvent): void
    {
        var index: number = this.pressedKeys.indexOf(keyEvent.code);
        if (index < 0)
        {
            this.pressedKeys.push(keyEvent.code);
        }
    }

    private upHandler(keyEvent: KeyboardEvent): void
    {
        var index: number = this.pressedKeys.indexOf(keyEvent.code);
        if (index >= 0)
        {
            this.pressedKeys.splice(index, 1);
        }
    }

    public getKey(code: string): boolean
    {
        return (this.pressedKeys.indexOf(code) < 0 ? false : true);
    }

    public get pressed(): Array<string>
    {
        return this.pressedKeys;
    }

}