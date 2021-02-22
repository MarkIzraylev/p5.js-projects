var cells, angleBetweenVectors, outLayer;

/*
TODO:
create a искусственный отбор, рандомную генерацию весов и искусственный отбор лучших

*/

function relu(arr) {
    out = [];
    for (el of arr) {
        if (el > 0) {
            out.push(el);
        } else {
            out.push(0);
        }
    }
    return out;
}

function elSum(arr) {
    out = 0;
    for (el of arr) {
        out += el;
    }
    return out;
}

function arraysMul(arr1, arr2) {
    out = [];
    for (let i = 0; i < arr1.length; i++) {
        out.push(arr1[i] * arr2[i]);
    }
    return out;
}

function setup() {
    createCanvas(600, 600);
    
    // create some cells
    cells = [];
    for (let c = 0; c < 10; c++) {
        ce = new Cell('blue');
        ce.createVectors();
        cells.push(ce);
        
    }
    
}

function draw() {
    background(200);
    //cells.push()
    for (cell of cells) {
        cell.show();
        cell.makePredictionFromBrain();
        cell.showVision();
        cell.move(random(-1, 1), random(-1, 1));
        cell.angleOfRotation[0] += random(-10, 10);
        cell.angleOfRotation = [cell.angleOfRotation[0]]
        cell.createVectors();
    }
}

function Cell(color) {
    this.radius = 10;
    this.x = random(0+this.radius, width-this.radius);
    this.y = random(0+this.radius, height-this.radius);
    this.color = color;
    this.brainWeights = [
        [
            [1],
            [2],
            [3]
        ],
        [
            [4, 5, 6],
            [7, 8, 9]
        ]
    ];

    this.angleOfRotation = [random(0, 360)];

    this.maxVisionDistance = 80;

    this.show = function() {
        fill(this.color);
        circle(this.x, this.y, this.radius);
    }

    this.makePredictionFromBrain = function() {
        inp = [1];
        inpSaved = inp;
        for (let layerNum = 0; layerNum < this.brainWeights.length; layerNum++) {
            inpLayer = [];
            for (let neuronBackWeightsNum = 0; neuronBackWeightsNum < this.brainWeights[layerNum].length; neuronBackWeightsNum++) {
                inpLayer.push([elSum(arraysMul(inpSaved, this.brainWeights[layerNum][neuronBackWeightsNum]))]);
            }
            inpSaved = relu(inpLayer);
        }
        console.log(inpSaved);
        
    }

    this.showVision = function() {
        /*if (this.angleOfRotation.length < 2) {
            this.createVectors();
        }*/
        for (let angle of this.angleOfRotation) {
            line(this.x, this.y, this.x + this.maxVisionDistance * sin(radians(angle)), this.y + this.maxVisionDistance * cos(radians(angle)));
        }
    }

    this.createVectors = function() {
        angleBetweenVectors = 5;
        for (let i = 0; i < 18; i++) {
            this.angleOfRotation[this.angleOfRotation.length] = this.angleOfRotation[this.angleOfRotation.length-1] + angleBetweenVectors;
        }
    }

    this.move = function(xStep, yStep) {
        this.x += xStep;
        this.y += yStep;
    }
        
}
