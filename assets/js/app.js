
document.addEventListener("DOMContentLoaded", function () {

    // antialias property makes the graphics property smooth
    // creating a new 
    const app = new PIXI.Application({ antialias: true, backgroundColor: 0xFFFFFF });

    document.getElementById('game_scence').appendChild(app.view);

    let colors = [
        '0xFF0000',
        '0x00FF00',
        '0x7777FF',
        '0xFF00FF',
        '0x00FFFF'
    ];

    // we will generate shape using this PIX graphics instance.
    //****************** Start Rectangle *************************
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0xDE3249);
    rectangle.drawRect(50, -100, 100, 100);
    rectangle.endFill();
    const texture_for_rectangle = app.renderer.generateTexture(rectangle);
    const rectangle_texture = PIXI.Sprite.from(texture_for_rectangle);
    rectangle_texture.anchor.set(0.5);
    rectangle_texture.x = 100;
    rectangle_texture.y = 10;

    //******************End Rectangle *************************

    //****************** Start Hexagon *************************
    const hexagon = new PIXI.Graphics();
    hexagon.beginFill(0xDE3249);
    let hexagonRadius = 60;
    let hexagonHeight = hexagonRadius * Math.sqrt(3);
    hexagon.drawPolygon([
        -hexagonRadius, 0,
        -hexagonRadius / 2, hexagonHeight / 2,
        hexagonRadius / 2, hexagonHeight / 2,
        hexagonRadius, 0,
        hexagonRadius / 2, -hexagonHeight / 2,
        -hexagonRadius / 2, -hexagonHeight / 2,
        // -64, 128,             //First point
        // 64, 128,              //Second point
        // 0, 0 
    ])
    hexagon.endFill();
    const texture_for_hexagon = app.renderer.generateTexture(hexagon);
    const hexagon_texture = PIXI.Sprite.from(texture_for_hexagon);
    hexagon_texture.anchor.set(0.5);
    hexagon_texture.x = 300;
    hexagon_texture.y = 10;

    //******************End Hexagon *************************

    //******************Start Circle *************************
    const circle = new PIXI.Graphics();
    circle.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    circle.beginFill(0xDE3249, 1);
    circle.drawCircle(100, 250, 50);
    circle.endFill();
    const texture_for_circle = app.renderer.generateTexture(circle);
    const circle_texture = PIXI.Sprite.from(texture_for_circle);
    circle_texture.anchor.set(0.5);
    circle_texture.x = 500;
    circle_texture.y = 10;
    //******************End Circle *************************

    //******************Start Triangle *************************
    const triangle = new PIXI.Graphics();
    let triangleWidth = 100,
        triangleHeight = triangleWidth,
        triangleHalfway = triangleWidth / 2;

    triangle.beginFill(0xFF0000, 1);
    triangle.lineStyle(0, 0xFF0000, 1);
    triangle.moveTo(triangleWidth, 0);
    triangle.lineTo(triangleHalfway, triangleHeight);
    triangle.lineTo(0, 0);
    triangle.lineTo(triangleHalfway, 0);
    triangle.endFill();
    const texture_for_triangle = app.renderer.generateTexture(triangle);
    const triangle_texture = PIXI.Sprite.from(texture_for_triangle);
    triangle_texture.anchor.set(0.5);
    triangle_texture.x = 700;
    triangle_texture.y = 10;

    //******************End Triangle *************************


    app.stage.addChild(rectangle_texture, hexagon_texture, circle_texture, triangle_texture);

    // const target = new PIXI.Point();

    // reset();

    // function reset() {
    //     target.x = Math.floor(Math.random() * 550);
    //     target.y = Math.floor(Math.random() * 300);
    // }
    class GameManager {
        static start() {

            // create a new shape generator object instance

            // requestAnimationFrame call is built on top of this function
            // fps will control automatically
            app.ticker.add(() => {
                // mask.x += (target.x - mask.x) * 0.1;
                // mask.y += (target.y - mask.y) * 0.1;
                rectangle_texture.y = rectangle_texture.y + 5;
                console.log('calling');

                // here check the y position if it's outside the game container then reset the mask.y to 10
                // game container height 600
                if (rectangle_texture.y > 600) {
                    rectangle_texture.y = 10
                }
                // if (Math.abs(mask.x - target.x) < 1) {
                //     reset();
                // }
            });
        }
    }


    // can generate on click position or default position
    // track the object position
    // if the object is almost on the bottom of the game container then fall a new object
    // if the falling container goes outisde the bottom then remove that object from the game stage
    class Circle {

        static generate(xPos, yPos, color) {

        }
    }
    class Ellipse {
        static generate(xPos, yPos, color) {

        }
    }
    class Triangle {
        static generate(xPos, yPos, color) {

        }
    }
    class Rectangle {
        static generate(xPos, yPos, color) {

        }
    }
    class Pentagon {
        static generate(xPos, yPos, color) {

        }
    }
    class Hexagon {
        static generate(xPos, yPos, color) {

        }
        // var hexagonRadius = 60;
        // var hexagonHeight = hexagonRadius * Math.sqrt(3);
        // bunny.drawPolygon([
        //     -hexagonRadius, 0,
        //     -hexagonRadius/2, hexagonHeight/2,
        //     hexagonRadius/2, hexagonHeight/2,
        //     hexagonRadius, 0,
        //     hexagonRadius/2, -hexagonHeight/2,
        //     -hexagonRadius/2, -hexagonHeight/2,
        //       // -64, 128,             //First point
        //       // 64, 128,              //Second point
        //       // 0, 0 
        //   ])
    }

    // ShapeGenerator class responsibility is to generate new shapes and render to the stage.
    class ShapeGenerator {
        constructor() {
            this.shapes = []
            this.shapes_per_second = 0;
            this.gravity = 5;
            this.random_shapes = [Circle, Ellipse, Triangle, Rectangle, Pentagon, Hexagon];
        }
        static update() {
            let new_shapes_to_generate = 0;
            console.log('I am calling....');

            // foreach shapes check the shape current position
            // if the shape y position is 600 then increment the value of new_shapes_to_generate

            // for generating random shape. generate a number between 0-5
            // this.random_shapes [generated_random_shape_index]
            // now randomly select a color from the colors array
            // 
        }
    }


    // GameManager.start();

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

    rectangle_texture.interactive = true;
    rectangle_texture.buttonMode = true;


    // ********* pointerup event has event bubbling bug **********
    // ********* For example all the object will be placed inside gameCanvas. 
    // Pointers normalize touch and mouse
    app.renderer.plugins.interaction.on('pointerup', onClickCanvas);

    function onClickCanvas(e) {
        console.log(e.data.global.x);
        rectangle_texture.x = parseInt(e.data.global.x);
        rectangle_texture.y = parseInt(e.data.global.y);
    }
    rectangle_texture.on('pointerdown', onClick);
    function onClick(e) {
        console.log(e)
        e.stopPropagation();
        app.stage.removeChild(rectangle_texture)
    }
})
