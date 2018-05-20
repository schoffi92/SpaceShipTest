
interface ICollisionBox
{
    x: number;
    y: number;
    width: number;
    height: number;
}

class Collider
{

    public static collisionBox(x: number, y: number, width: number, height: number): ICollisionBox
    {
        return <ICollisionBox>{
            x,
            y,
            width,
            height
        };
    }

    public static hitTest(c1: ICollisionBox, c2: ICollisionBox): boolean
    {
        var hit: boolean = false;
        var check: Function = (x1: number, w1: number, x2: number, w2: number): boolean => {
            return (x1 <= x2 && x1 + w1 >= x2) || (x1 >= x2 && x1 <= x2 + w2);
        }

        if ( check(c1.x, c1.width, c2.x, c2.width) && check(c1.y, c1.height, c2.y, c2.height) ) {
            hit = true;
        }


        return hit;
    }

}
