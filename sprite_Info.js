function sprite_Player_Path (type, frame) {
    var type_Anim;
    var image_Name
    switch (type) {
        case 'move':
            type_Anim = 'move';
            break;
        default:
            type_Anim = 'idle';
    }
    image_Name = 'Top_Down_Survivor/handgun/'+ type_Anim + '/survivor-' + type_Anim + '_handgun_' + frame + '.png';
    return image_Name;
}

function sprite(options) {
    
    var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0;
    that.loop = options.loop
    
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.x = options.x;
    that.y = options.y;
    that.dir = options.dir;
    that.shift = options.shift;
    that.shift_2 = options.shift;
    that.thing = options.thing;
    
    that.render = function () {
        // Draw the animation
        that.image.src = sprite_Player_Path(null, frameIndex);

        var dim = dimensions(that.thing);
        var clipx = dim[0];
        var clipy = dim[1];
        
        if (that.dir == null || that.dir == 'right'){
            draw_Rotated(0,that,clipx,clipy);
        }
        else if (that.dir == 'down'){
            that.shift_2*=-1;
            draw_Rotated(90,that,clipx,clipy);
        }
        
        else if (that.dir == 'up'){
            that.shift *=-1;
            draw_Rotated(270,that,clipx,clipy);
        }
        
        else { //left
            that.shift *=-1;
            that.shift_2 = that.shift;
            draw_Rotated(180,that,clipx,clipy);
        }
    };
    
    that.update = function () {
        
        tickCount += 1;
        
        if (tickCount > ticksPerFrame) {
            
            tickCount = 0;
            
            // Go to the next frame
            frameIndex += 1;
            if frameIndex
        }
    };
    
    return that;
}

function draw_Rotated(degrees,that,clipx,clipy){     //http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
    that.context.save();
    that.context.translate(that.x,that.y);   // translate to where we want the image to go
    that.context.translate(that.width/2,that.height/2);  //translate to the center of our image
    that.context.rotate(degrees*Math.PI/180);
    that.context.drawImage(
                           that.image,
                           0,       //where we start clipping from the .png
                           0,
                           clipx,   //how big the image we're taking from the photo is
                           clipy,
                           -that.width/2 -that.shift,   //where it will go on the canvas *** it would be 0 since we translated, but we translated TWICE to help with rotation, but
                           -that.height/2 -that.shift_2,  //now we have to shift the image back onto the first translation. use actual game measurements here not full pic
                           that.width,   // how big & wide it will be in the actual game
                           that.height);
    that.context.restore();
}

function dimensions(thing){
    switch (thing) {
        case 'player':
            return [255,215];
        case 'bomb':
            return [256,256];
        default:
            return [100,100];
    }
    
}
