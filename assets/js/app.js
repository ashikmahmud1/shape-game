
document.addEventListener("DOMContentLoaded", function () {

    // antialias property makes the graphics property smooth
    // creating a new 
    const app = new PIXI.Application({ antialias: true });
    document.getElementById('game_scence').appendChild(app.view);
    let colors = [
        '0xFF0000',
        '0x00FF00',
        '0x7777FF',
        '0xFF00FF',
        '0x00FFFF'
    ];

    const graphics = new PIXI.Graphics();

    // Rectangle
    graphics.beginFill(0xDE3249);
    graphics.drawRect(50, -100, 100, 100);
    graphics.endFill();
    const texture = app.renderer.generateTexture(graphics);
    const mask = PIXI.Sprite.from(texture);
    mask.anchor.set(0.5);
    mask.x = 310;
    mask.y = 190;

    app.stage.addChild(mask);

    const target = new PIXI.Point();

    reset();

    function reset() {
        target.x = Math.floor(Math.random() * 550);
        target.y = Math.floor(Math.random() * 300);
    }
    class GameManager {
        static start() {
            // requestAnimationFrame call is built on top of this function
            // fps will control automatically
            app.ticker.add(() => {
                mask.x += (target.x - mask.x) * 0.1;
                mask.y += (target.y - mask.y) * 0.1;

                if (Math.abs(mask.x - target.x) < 1) {
                    reset();
                }
            });
        }
    }

    // ShapeGenerator class responsibility is to generate new shapes and render to the stage.
    class ShapeGenerator {
        constructor() {
            this.shapes = []
        }
        static update() {
            console.log('I am calling....');
        }
    }

    // can generate on click position or default position
    // track the object position
    // if the object is almost on the bottom of the game container then fall a new object
    // if the falling container goes outisde the bottom then remove that object from the game stage
    class Circle {
    }
    class Ellipse {
    }
    class Triangle {
    }
    class Rectangle {
    }
    class Pentagon {
    }
    class Hexagon {
    }


    GameManager.start();

    // // Rectangle + line style 1
    // graphics.lineStyle(2, 0xFEEB77, 1);
    // graphics.beginFill(0x650A5A);
    // graphics.drawRect(200, 50, 100, 100);
    // graphics.endFill();

    // // Rectangle + line style 2
    // graphics.lineStyle(10, 0xFFBD01, 1);
    // graphics.beginFill(0xC34288);
    // graphics.drawRect(350, 50, 100, 100);
    // graphics.endFill();

    // // Rectangle 2
    // graphics.lineStyle(2, 0xFFFFFF, 1);
    // graphics.beginFill(0xAA4F08);
    // graphics.drawRect(530, 50, 140, 100);
    // graphics.endFill();

    // // Circle
    // graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    // graphics.beginFill(0xDE3249, 1);
    // graphics.drawCircle(100, 250, 50);
    // graphics.endFill();

    // // Circle + line style 1
    // graphics.lineStyle(2, 0xFEEB77, 1);
    // graphics.beginFill(0x650A5A, 1);
    // graphics.drawCircle(250, 250, 50);
    // graphics.endFill();

    // // Circle + line style 2
    // graphics.lineStyle(10, 0xFFBD01, 1);
    // graphics.beginFill(0xC34288, 1);
    // graphics.drawCircle(400, 250, 50);
    // graphics.endFill();

    // // Ellipse + line style 2
    // graphics.lineStyle(2, 0xFFFFFF, 1);
    // graphics.beginFill(0xAA4F08, 1);
    // graphics.drawEllipse(600, 250, 80, 50);
    // graphics.endFill();

    // // draw a shape
    // graphics.beginFill(0xFF3300);
    // graphics.lineStyle(4, 0xffd900, 1);
    // graphics.moveTo(50, 350);
    // graphics.lineTo(250, 350);
    // graphics.lineTo(100, 400);
    // graphics.lineTo(50, 350);
    // graphics.closePath();
    // graphics.endFill();

    // // draw a rounded rectangle
    // graphics.lineStyle(2, 0xFF00FF, 1);
    // graphics.beginFill(0x650A5A, 0.25);
    // graphics.drawRoundedRect(50, 440, 100, 100, 16);
    // graphics.endFill();

    // // draw star
    // graphics.lineStyle(2, 0xFFFFFF);
    // graphics.beginFill(0x35CC5A, 1);
    // graphics.drawStar(360, 370, 5, 50);
    // graphics.endFill();

    // // draw star 2
    // graphics.lineStyle(2, 0xFFFFFF);
    // graphics.beginFill(0xFFCC5A, 1);
    // graphics.drawStar(280, 510, 7, 50);
    // graphics.endFill();

    // // draw star 3
    // graphics.lineStyle(4, 0xFFFFFF);
    // graphics.beginFill(0x55335A, 1);
    // graphics.drawStar(470, 450, 4, 50);
    // graphics.endFill();

    // // draw polygon
    // const path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520];

    // graphics.lineStyle(0);
    // graphics.beginFill(0x3500FA, 1);
    // graphics.drawPolygon(path);
    // graphics.endFill();

    mask.interactive = true;
    mask.buttonMode = true;


    // ********* pointerup event has event bubbling bug **********
    // ********* For example all the object will be placed inside gameCanvas. 
    // Pointers normalize touch and mouse
    app.renderer.plugins.interaction.on('pointerup', onClickCanvas);

    function onClickCanvas(e) {
        console.log(e.data.global.x);
        console.log(e.data.global.y);
    }
    mask.on('pointerdown', onClick);
    function onClick(e) {
        console.log(e)
        e.stopPropagation();
        app.stage.removeChild(mask)
    }
})
