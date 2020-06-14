
const mycanvas = document.querySelector("#mycanvas");
const ctx = mycanvas.getContext("2d");
mycanvas.width = window.innerWidth;
mycanvas.height = window.innerHeight;

const edge = 180;

let drawing = false;

let mouse ={
    x:null,
    y:null
}


window.addEventListener('mousemove', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
});


class Root{
    constructor(x,y,color,centerX,centerY){
        this.x = x;
        this.y =y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    draw(){

        this.speedX += (Math.random() - 0.5) / 2;
        this.speedY += (Math.random() - 0.5) / 2;

        this.x += this.speedX;
        this.y += this.speedY;

        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY*distanceY);

        const radius = (-distance / edge + 1) * edge /10;

        if(radius > 0){
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath();
            ctx.arc(this.x,this.y,radius,0,2*Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
}

function branchOut(){

    if(drawing === true){
        const centerX = mouse.x;
        const centerY = mouse.y;
    
        for(let i=0;i<3;i++){
            const root = new Root(mouse.x,mouse.y,'red',centerX,centerY);
            root.draw();
        }
    
    }
}

window.addEventListener('resize',()=>{
    mycanvas.width = window.innerWidth;
    mycanvas.height  = window.innerHeight;
});

window.addEventListener('mousemove',()=>{
    ctx.fillStyle = 'rgba(255,0,255,0.03)';
    ctx.fillRect(0,0,mycanvas.width,mycanvas.height); 
    branchOut();

});

window.addEventListener('mousedown',()=>{
    drawing = true;
    console.log('VEYS');
    
});
window.addEventListener('mouseup',()=>{
    drawing=false;
}); 