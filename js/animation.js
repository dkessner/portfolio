//
// sidebar.js
//


class Ball 
{
    position;
    velocity;
    hue;
    alpha;
    radius;

    constructor() 
    {
        this.position = createVector(mouseX, mouseY);

        this.velocity = createVector(pmouseX, pmouseY);
        this.velocity.sub(this.position);
        this.velocity.mult(.1);

        this.hue = currentHue;
        this.alpha = 255;

        this.radius = 0;
    }

    display()
    {
        noStroke();
        fill(this.hue, 100, 50, this.alpha);
        ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.alpha--;
        this.radius++;
    }
}

let balls = [];


function getSize()
{
    const sidebar = select(".sidebar");

    if (window.matchMedia("(min-width: 48rem)").matches) // hack for hydure css media query
    {
        // big screen: fill sidebar

        return {
            w: sidebar.width,
            h: sidebar.height
        };
    } 
    else 
    {
        // small screen: limit height

        return {w:sidebar.width, h:400};
    }
}


function setup() {
    //let {w, h} = getSize();
    //createCanvas(w, h);

    //let canvas = createCanvas(200, 200);
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    colorMode(HSB, 100);
}


let currentHue = 50;


function windowResized()
{
    /*let {w, h} = getSize();
    resizeCanvas(w, h);
    */
    resizeCanvase(windowWidth, windowHeight);
}


function draw() 
{
    background(0);

    for (let b of balls)
        b.display();

    if (++currentHue > 100) currentHue = 0;

    balls.push(new Ball());
    removeDeadBalls();
}


function removeDeadBalls()
{
    for (let i=balls.length-1; i>=0; i--)
    {
        if (balls[i].alpha <= 0)
            balls.splice(i, 1);
    }
}


