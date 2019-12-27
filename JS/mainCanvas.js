class Canvas {

    constructor($canvas, $clearButton) {
        this.paths = [];
        this.drawing = false;

        this.$canvas = $canvas;
        this.$clearButton = $clearButton;

        this.init();
    }

    init () {
        this.$clearButton.on('click', (e) => {
            this.paths = [];

            this.draw();
        });

        this.$canvas.on('mousedown', (e) => {
            this.addPoint(e.offsetX, e.offsetY, false);
            this.drawing = true;

            this.draw();
        });

        this.$canvas.on('mouseup', (e) => {
            if (! this.drawing) {
                return;
            }

            this.addPoint(e.offsetX, e.offsetY, true);
            this.drawing = false;

            this.draw();
        });

        this.$canvas.on('mouseover', (e) => {
            if (! this.drawing) {
                return;
            }

            //this.addPoint(e.offsetX, e.offsetY, true);
            this.drawing = false;

            this.draw();
        });

        this.$canvas.on('mousemove', (e) => {
            if (! this.drawing) {
                return;
            }

            this.addPoint(e.offsetX, e.offsetY, true);

            this.draw();
        });
    }

    addPoint(x, y, dragging){
        if (! dragging){
            let path = [
                {
                    x: x,
                    y: y
                }
            ]
            this.paths.push(path);
        } else {
            let path = this.paths[this.paths.length-1];
            path.push(
                {
                    x: x,
                    y: y
                }
            )
        }
    }

    draw() {
        let context = this.$canvas[0].getContext("2d");

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.strokeStyle = "black";
        context.lineJoin = "round";
        context.lineWidth = 5;

        for (const path of this.paths){
            for (let i = 1; i < path.length; i++){
                context.beginPath();

                const beginPoint = path[i-1];
                context.moveTo(beginPoint.x, beginPoint.y);

                const endPoint = path[i];
                context.lineTo(endPoint.x, endPoint.y);

                context.closePath();
                context.stroke();
            }
        }
    }
}

new Canvas($('#sign'), $('#clearButton'));