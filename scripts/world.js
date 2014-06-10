var zero = {
    el: document.getElementById("zero"),
    beam: document.querySelector("#beam"),
    transformed: false,
    running: false,
    isJump: false,
    isAttack : false,
    getPosX: function () {
        var style = window.getComputedStyle(this.el),
            left  = style.left,
            posX  = parseInt(left.substr(0, left.length - 2), 10);
        
        return posX;
    },
    getPosY: function () {
        var style = window.getComputedStyle(this.el),
            top   = style.top,
            posY  = parseInt(top.substr(0, top.length - 2), 10);

        return posY;
    },
    standStill: function () {
        if (this.running || this.isJump || this.isAttack) {
            if(this.attack && this.transformed){
                this.el.style.left = (this.getPosX()+35)+"px";
            }    
            this.el.style.display = "none";
            this.el.offsetHeight;
            this.el.style.webkitAnimation = "zero-stand 1.5s steps(4, end) infinite";
            this.el.style.display = "block";
            this.running = false;
            this.isJump = false;
            this.isAttack = false;
        }
    },
    moveRight: function () {
        var posX   = this.getPosX(),
            newPos = posX + 3;
        
        if (posX > 600) {
            return;
        }
        
        if (!this.running) {
            this.el.style.webkitAnimation = "zero-run 1s steps(14, end) infinite";
            this.running = true;
        }
        
        if (this.transformed) {
            this.el.style.webkitTransform = "";
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";
    },
    moveLeft: function () {
        var posX   = this.getPosX(),
            newPos = posX - 3;
        
        if (posX < 0) {
            return;
        }
        
        if (!this.running) {
            this.el.style.webkitAnimation = "zero-run 1s steps(14, end) infinite";
            this.running = true;
        }
        
        if (!this.transformed) {
            this.el.style.webkitTransform = "rotateY(180deg)";
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";
    },
	fin: function () {
		//this.el.style.top = "100px";
        this.el.style.webkitAnimation = "zero-finish 2s steps(11, end) 1";
		
		setTimeout(zero.remove, 2000);
	},
	remove: function(){
		document.getElementById("viewport").innerHTML = "";
	},  
	attack: function () {
        if(!this.isAttack){
           
            if (this.transformed) {
                this.el.style.left = (this.getPosX()-35)+"px";
            }
            this.el.style.webkitAnimation = "zero-attack1 .5s steps(17,end) infinite";
            this.isAttack = true;
            
            
        }
        
    },	
    jump: function () {
        var posX   = this.getPosX();
        //newPosX = posX + 40;
       
            this.el.style.webkitAnimation = "zero-jump .8s steps(9, end) 1";//, zero-stand 2s steps(2, end) infinite";  
            if (!this.transformed) {
                //newPosX = posX + 40;
                this.el.style.webkitTransform = "";
            }
            else if (this.transformed) {
                //newPosX = posX - 40;
                this.el.style.webkitTransform = "rotateY(180deg)";
            }
            this.el.style.height = "50px";
            //this.isJump = true;
        
    },// yang ini belum 
    radical_beam: function() {
        var sfxBeam = new Audio("../sfx/sfxBeam.mp3");
        var zeroPosX = this.getPosX();
        var zeroPosY = this.getPosY();
        var st = window.getComputedStyle(this.beam);
        this.beam.style.display = "none";
        this.beam.offsetHeight;
        this.beam.style.webkitAnimation = "zero-radical-beam .3s steps(9, end) 1";
        this.beam.style.display = "block";
        sfxBeam.play();
        if (!this.transformed) {
            //newPosX = posX + 40;
            this.beam.style.webkitTransform = "";
            this.beam.style.left = (zeroPosX + 58) + "px";
        }
        else if (this.transformed) {
            //newPosX = posX - 40;
            this.beam.style.webkitTransform = "rotateY(180deg)";
            this.beam.style.left = (zeroPosX - 200) + "px";
        }
        this.beam.style.top = (zeroPosY + 12) + "px";

    }// ini tinggal CSS
};
// yang di bawah ini smua handle delay keydown ama control zero
var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
    zero.standStill();
},true);
x = 100;
function gameLoop() {
    if (keyState[37] || keyState[65]){
        zero.moveLeft();
    }

    if (keyState[39] || keyState[68]){
        zero.moveRight();
    }
	
	if (keyState[32]){
        zero.attack();
    }

    //document.getElementById("test").style.left = x + "px";

    setTimeout(gameLoop, 10);
}
gameLoop();
