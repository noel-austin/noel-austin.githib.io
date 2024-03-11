class Circle {
    constructor(id, x, y, radius, targetRadius, targetX, targetY, name, color, ratio, targetID) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.targetRadius = targetRadius;
        this.radius = radius;
        this.targetX = targetX;
        this.targetY = targetY;
        this.ratio = ratio;
        this.name = name;
        this.color = color;
        this.growing = false;
        this.targetID = targetID;
        this.finishedGrowing = false;
        this.reachedDestination = false;
        this.numOfCircles = 0;

        for (let number of ratio) {
            if (number > 0) {
                this.numOfCircles++;
            }
        }
    }
    grow() {
        if (this.growing) {
            this.radius += 2;
            if (this.radius >= this.targetRadius) {
                this.radius = this.targetRadius;
                this.growing = false;
                this.finishedGrowing = true;
            }
        }
    }

    startGrowing() {
        this.growing = true;
        this.finishedGrowing = false;
    }


    isMouseOver() {
        return dist(mouseX, mouseY, this.x, this.y) < this.radius / 2;
    }

    getInfo() {
        return ` ${allInfo[this.id]}`;
    }


    setTarget(x, y) {
        this.targetX = x;
        this.targetY = y;
        this.reachedDestination = false;
    }

    splitAndAssignTargets(boxes) {
        let newCircles = [];
        let positiveValues = this.ratio.filter(val => val > 0);

        if (positiveValues.length === 1) {
            let boxIndex = this.ratio.indexOf(positiveValues[0]);
            this.setTarget(boxes[boxIndex].x + boxes[boxIndex].w / 2, boxes[boxIndex].y + boxes[boxIndex].h / 2);
            return [this];
        } else {
            this.ratio.forEach((val, index) => {
                if (val > 0) {
                    let newRadius = this.radius * val;
                    let newCircle = new Circle(this.id, this.x, this.y, newRadius, newRadius, null, null, this.name, this.color, []);
                    newCircle.setTarget(boxes[index].x + boxes[index].w / 2, boxes[index].y + boxes[index].h / 2);
                    newCircles.push(newCircle);
                }
            });
            return newCircles;
        }
    }

    update() {
        if (!this.reachedDestination && this.targetX !== null && this.targetY !== null) {
            let step = 10;
            this.x = lerp(this.x, this.targetX, step / dist(this.x, this.y, this.targetX, this.targetY));
            this.y = lerp(this.y, this.targetY, step / dist(this.x, this.y, this.targetX, this.targetY));

            if (dist(this.x, this.y, this.targetX, this.targetY) < step) {
                this.reachedDestination = true;
            }
        }
    }

    updateSize(newRadius) {
        this.targetRadius = newRadius;

    }

    split() {
        let newCircles = [];
        for (let i = 0; i < this.ratio.length; i++) {
            // Reduce the radius for smaller circles
            if (this.ratio > 0) {
                let newRadius = this.radius * this.ratio[i];
                let newCircle = new Circle(this.x, this.y, newRadius, null, null, this.name, this.color);
                newCircles.push(newCircle);
            }
            let newRadius = this.radius * this.ratio[i];
            let newCircle = new Circle(this.x, this.y, newRadius, null, null, this.name, this.color);
            newCircles.push(newCircle);
        }
        return newCircles;
    }

    display() {
        fill(this.color);
        noStroke();
        circle(this.x, this.y, this.radius)
        if (this.radius >= 1) {
            textAlign(CENTER);

            fill("white");
            textSize(50)
            text(this.name, this.x, this.y);
        }

    }


}
