
document.addEventListener("DOMContentLoaded", function () {

    // antialias property makes the graphics property smooth
    const app = new PIXI.Application({ antialias: true, backgroundColor: 0xFFFFFF });
    document.getElementById('game_scence').appendChild(app.view);

    class GameManager {
        static start() {

            // create a new shape generator object instance
            let shape_generator = new ShapeGenerator();

            // requestAnimationFrame call is built on top of this function
            // fps will control automatically
            app.ticker.add(() => {
                shape_generator.update();
            });
        }
    }


    // can generate on click position or default position
    // track the object position
    // if the object is almost on the bottom of the game container then fall a new object
    // if the falling container goes outisde the bottom then remove that object from the game stage
    class Circle {

        // Responsibility to create a new circle with the given xPos and yPos and color
        static generate(xPos, yPos, color) {

            const circle = new PIXI.Graphics();
            circle.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
            circle.beginFill(color, 1);
            circle.drawCircle(100, 250, 50);
            circle.endFill();
            const texture_for_circle = app.renderer.generateTexture(circle);
            const circle_texture = PIXI.Sprite.from(texture_for_circle);
            circle_texture.anchor.set(0.5);
            circle_texture.x = xPos;
            circle_texture.y = yPos;

            return circle_texture;
        }
    }
    class Ellipse {
        static generate(xPos, yPos, color) {

            const ellipse = new PIXI.Graphics();
            ellipse.beginFill(color); // Blue
            ellipse.drawEllipse(170, 185, 45, 25); // drawEllipse(x, y, width, height)
            ellipse.endFill();
            const texture_for_ellipse = app.renderer.generateTexture(ellipse);
            const ellipse_texture = PIXI.Sprite.from(texture_for_ellipse);
            ellipse_texture.anchor.set(0.5);
            ellipse_texture.x = xPos;
            ellipse_texture.y = yPos;

            return ellipse_texture;
        }
    }
    class Triangle {
        static generate(xPos, yPos, color) {

            const triangle = new PIXI.Graphics();
            let triangleWidth = 100,
                triangleHeight = triangleWidth,
                triangleHalfway = triangleWidth / 2;

            triangle.beginFill(color, 1);
            triangle.lineStyle(0, 0xFF0000, 1);
            triangle.moveTo(triangleWidth, 0);
            triangle.lineTo(triangleHalfway, triangleHeight);
            triangle.lineTo(0, 0);
            triangle.lineTo(triangleHalfway, 0);
            triangle.endFill();
            const texture_for_triangle = app.renderer.generateTexture(triangle);
            const triangle_texture = PIXI.Sprite.from(texture_for_triangle);
            triangle_texture.anchor.set(0.5);
            triangle_texture.x = xPos;
            triangle_texture.y = yPos;

            return triangle_texture;
        }
    }
    class Rectangle {
        static generate(xPos, yPos, color) {

            const rectangle = new PIXI.Graphics();
            rectangle.beginFill(color);
            rectangle.drawRect(50, -100, 100, 100);
            rectangle.endFill();
            const texture_for_rectangle = app.renderer.generateTexture(rectangle);
            const rectangle_texture = PIXI.Sprite.from(texture_for_rectangle);
            rectangle_texture.anchor.set(0.5);
            rectangle_texture.x = xPos;
            rectangle_texture.y = yPos;

            return rectangle_texture;
        }
    }
    class Pentagon {
        static generate(xPos, yPos, color) {

            const pentagon = new PIXI.Graphics();
            pentagon.beginFill(color);
            pentagon.drawPolygon(
                [
                    new PIXI.Point(200, 500),
                    new PIXI.Point(200, 400),
                    new PIXI.Point(300, 400),
                    new PIXI.Point(200, 500),
                    new PIXI.Point(100, 500)
                ]
            )
            pentagon.endFill();
            const texture_for_pentagon = app.renderer.generateTexture(pentagon);
            const pentagon_texture = PIXI.Sprite.from(texture_for_pentagon);
            pentagon_texture.anchor.set(0.5);
            pentagon_texture.x = xPos;
            pentagon_texture.y = yPos;

            return pentagon_texture;
        }
    }
    class Hexagon {
        static generate(xPos, yPos, color) {

            const hexagon = new PIXI.Graphics();
            hexagon.beginFill(color);
            let hexagonRadius = 60;
            let hexagonHeight = hexagonRadius * Math.sqrt(3);
            hexagon.drawPolygon([
                -hexagonRadius, 0,
                -hexagonRadius / 2, hexagonHeight / 2,
                hexagonRadius / 2, hexagonHeight / 2,
                hexagonRadius, 0,
                hexagonRadius / 2, -hexagonHeight / 2,
                -hexagonRadius / 2, -hexagonHeight / 2,
            ])
            hexagon.endFill();
            const texture_for_hexagon = app.renderer.generateTexture(hexagon);
            const hexagon_texture = PIXI.Sprite.from(texture_for_hexagon);
            hexagon_texture.anchor.set(0.5);
            hexagon_texture.x = xPos;
            hexagon_texture.y = yPos;

            return hexagon_texture;

        }
    }

    // ShapeGenerator class responsibility is to generate new shapes and render to the stage.
    class ShapeGenerator {
        constructor() {
            this.shapes = []
            this.shapes_per_second = 0;
            this.gravity = 5;
            this.colors = [
                '0xFF0000',
                '0x00FF00',
                '0x7777FF',
                '0xFF00FF',
                '0x00FFFF'
            ];
            let _self = this;
            app.renderer.plugins.interaction.on('pointerup', function (e) {
                // firstly loop through the shapes object and check if clicked inside a shape object
                // if clicked inside the shape object then get the index of the shape object
                // remove that shape object from the stage
                // also remove that shapes object from the shapes array
                // else clicked outside the shape object but inside the game canvas
                // generate a shape object in the clicked position x and y
                let x = parseInt(e.data.global.x);
                let y = parseInt(e.data.global.y);
                _self.generate(1, x, y);
            });
            this.initializeButtonsListener();
            this.random_shapes = [Circle, Ellipse, Triangle, Rectangle, Pentagon, Hexagon];
        }
        update() {
            // first check if there is no shapes in the shapes array
            if (this.shapes.length === 0 && this.shapes_per_second > 0) {
                this.generate(this.shapes_per_second);
            }
            let new_shapes_to_generate = 0;
            if (this.shapes_per_second > this.shapes.length) {
                new_shapes_to_generate = this.shapes_per_second - this.shapes.length;
                this.generate(new_shapes_to_generate);
            }

            // secondly update the shapes y position
            for (let i = 0; i < this.shapes.length; i++) {
                this.shapes[i].y += this.gravity; // adding the gravity value
            }

            new_shapes_to_generate = 0;
            for (let i = 0; i < this.shapes.length; i++) {
                // foreach shapes check the shape current position
                // if the shape y position is 610 then increment the value of new_shapes_to_generate
                if (this.shapes[i].y > 610) {
                    new_shapes_to_generate++;
                    // remove the shape from the stage
                    app.stage.removeChild(this.shapes[i]);
                    // finally remove the shape from the shape array
                    this.shapes.splice(i, 1);
                }
            }
            this.generate(new_shapes_to_generate);

        }
        generate(shapes_to_generate, x_pos = 0, y_pos = -50) {
            // for generating random shape. generate a number between 0-5
            // this.random_shapes [generated_random_shape_index]
            // now randomly select a color from the colors array
            for (let i = 0; i < shapes_to_generate; i++) {
                console.log('I am generating shape')
                let random_shape_index = this.getRandomInt(5) // this will generate a random number 0, 1, 2, 3, 4 or 5
                let random_color_index = this.getRandomInt(4) // this will generate a random number 0, 1, 2, 3, 4
                x_pos = x_pos === 0 ? this.getRandomInt(800) : x_pos;
                y_pos = y_pos === -50 ? -50 : y_pos; // firstly y position will be -100 that means the object will be outside from the game container
                let generated_shape = this.random_shapes[random_shape_index].generate(x_pos, y_pos, this.colors[random_color_index]);
                // push the generated shape in the shapes array
                this.shapes.push(generated_shape);
                // render the generated shape to the game stage
                app.stage.addChild(this.shapes[this.shapes.length - 1]);
            }
        }
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        initializeButtonsListener() {
            let number_current_shapes = document.getElementById("number_current_shapes");
            let inc_shapes_button = document.getElementById("inc_shapes");
            let dec_shapes_button = document.getElementById("dec_shapes");
            let shapes_input = document.getElementById("shapes_value");
            shapes_input.value = this.shapes_per_second;
            number_current_shapes.value = this.shapes_per_second;

            let inc_gravity_button = document.getElementById("inc_gravity");
            let dec_gravity_button = document.getElementById("dec_gravity");
            let gravity_input = document.getElementById("gravity_value");
            gravity_input.value = this.gravity;

            let _self = this;
            inc_shapes_button.addEventListener('click', function () {
                _self.shapes_per_second++;
                shapes_input.value = _self.shapes_per_second;
                number_current_shapes.value = _self.shapes_per_second;
            });
            dec_shapes_button.addEventListener('click', function () {
                if (_self.shapes_per_second > 0) _self.shapes_per_second--
                shapes_input.value = _self.shapes_per_second;
                number_current_shapes.value = _self.shapes_per_second;
            });
            inc_gravity_button.addEventListener('click', function () {
                _self.gravity++
                gravity_input.value = _self.gravity;
            });
            dec_gravity_button.addEventListener('click', function () {
                if (_self.gravity > 1) _self.gravity--
                gravity_input.value = _self.gravity;
            })
        }
    }
    GameManager.start();
})
