class MATH${
    static resultantOf(x, y){
        return Math.sqrt( Math.pow(x, 2)+Math.pow(y, 2) );
    }
}//EO MATH$



    
    
class DOM${
    static _(string, index=0){
        let element = DOM$.SLT(string, index);
        return element;
    }
    static SLT(string, index){
        if(typeof index == "number"){ 
          return  document.querySelectorAll(string)[index];
        }
        if(index == "length"){
         return  document.querySelectorAll(string).length;    
        }
        if(index == "this"){ 
        return  document.querySelectorAll(string);
        }
    }
    static x = {
    }//EO x
    
    
    
    
    static OnLoad = function(event){}
    static OnLoadList = [];
    static RunOnLoad(event){ DOM$.OnLoadList.push(event); };
}
    
document.addEventListener("DOMContentLoaded", function(event) {
 DOM$.OnLoad(event);
 DOM$.OnLoadList.map((fnct)=>{
     fnct();
 });
});
























let CDrawf = {};    
class CDraw{
    static scope= this
    static a
    static b
    static init= function(a, b){
        CDraw.a = a; CDraw.b = b;
    }
    static line= function(x, endX, y, endY, color="red", thick=1){
        [this.x, this.endX, this.y, this.endY, this.color,this.thick] =
        [x, endX, y, endY, color, thick];
        this.lengthX = Math.abs(this.x-this.endX);
        this.breadthY = Math.abs(this.y-this.endY);
        this.center = {};
        this.rotation = {rad: 0, about:this.center};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x//+this.thick/2;
            this.center.y=this.y+this.breadthY/2;
        }//EO updateProps
        this.autoStyle = new CDraw.autoStyle(this.thick+"_"+this.color, this);
        
        this.draw = (B)=>{      
        B.beginPath();     
        this.autoStyle.call(B);
        B.moveTo(this.x, this.y); 
        B.lineTo(this.endX, this.endY); B.stroke();    
        B.closePath();
        this.updateProps(B);
        }
    }
    static sLine= function(x, lengthX, y, breadthY, color, thick, extras={}){
        [this.x, this.lengthX, this.y, this.breadthY, this.color,this.thick] =
        [x, lengthX, y, breadthY, color, thick];
        this.center = {};
        this.rotation = {rad: 0, about:this.center};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x//+this.thick/2;
            this.center.y=this.y+this.breadthY/2;
        }//EO updateProps
        this.autoStyle = new CDraw.autoStyle(this.thick+"_"+this.color, this);
        
        this.draw = (B)=>{   
        this.endX = this.x+this.lengthX; this.endY = this.y+this.breadthY
        B.beginPath();     
        this.autoStyle.call(B);
        for(let key in extras){ B[key] = extras[key]; }
        B.moveTo(this.x, this.y); 
        B.lineTo(this.endX, this.endY); B.stroke();    
        B.closePath();
        this.updateProps()
        }
    }
    static arc= function(x, y, r, startAngle, endAngle, styling){
        this.x = x; this.y = y, this.radius = r; this.startAngle= startAngle;
        this.endAngle = endAngle; 
        this.styling = styling; this.type = "arc";
        this.center = {};
        this.rotation = {rad: 0, about:this.center}
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.indexInScene = null;
        this.updateProps = (B)=>{
            this.center.x = this.x; this.center.y = this.y;
        }
        this.autoStyle = new CDraw.autoStyle(this.styling, this);
        
        this.draw = (B)=>{   
            B.beginPath();
            B.arc(this.x, this.y, this.radius, this.startAngle,this.endAngle);
            this.autoStyle.call(B);
            B.closePath();
            this.updateProps(B);
        }
    }
    static rect= function( x, lengthX, y, breadthY, styling ){
        this.x = x;   this.lengthX = lengthX;
        this.y = y;   this.breadthY = breadthY;
        this.styling = styling;
        this.center = {};
        this.rotation = {rad: 0, about:this.center};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x+this.lengthX/2;
            this.center.y=this.y+this.breadthY/2;
        }//EO updateProps
        this.autoStyle = new CDraw.autoStyle(this.styling, this);
        
        this.draw = (B)=>{      
            
            B.beginPath();
            this.autoStyle.call(B, ()=>{
            B.strokeRect(this.x, this.y, this.lengthX, this.breadthY );
            },
            ()=>{
            B.fillRect(this.x, this.y, this.lengthX, this.breadthY );
            })
            B.closePath();
        this.updateProps(B);
        }//EO draw
    }
    static img = function( src, x, lengthX, y, breadthY){
        this.src = src;
        this.image = new Image();
        this.image.src = this.src;
        this.image.onload = function(){}
        if(this.src instanceof HTMLElement) this.image = src;
        this.x = x;   this.lengthX = lengthX;
        this.y = y;   this.breadthY = breadthY;
        this.center = {};
        this.rotation = {rad: 0, about:this.center};
        this.alpha = 1;
        this.GCParams = {shadow: [0, 0, "transparent", 0]};
        this.updateProps = (B)=>{
            this.center.x=this.x+this.lengthX/2;
            this.center.y=this.y+this.breadthY/2;
        }//EO updateProps
        
        
        this.draw = (B)=>{      
            B.drawImage(this.image, this.x, this.y, this.lengthX, this.breadthY);
            this.updateProps(B);
        }//EO draw
    }
    static group = function(){
        
    }
    static Group = function(){
        this.children = [];
        this.x = 0;
        this.y = 0;
        this.add = (...children)=>{
            //[...children].map((a)=> alert(a) );
            this.children = [...this.children, ...children];
        }
        let animFrame = ()=>{
            this.children.map((child)=>{
                child.x = this.x;//+child.x;
                child.y = this.y;//+child.y;
            });
            requestAnimationFrame(animFrame)
        }
        //animFrame();
    }
    static autoStyle = function(styling, object){
       this.set = (styling)=>{
            var spl;
            if(typeof styling === "string")spl = styling.split("_");
            else spl = styling;
            this.object = object;
            this.color = this.object.color = spl[1]; 
            this.strokeWidth = this.object.strokeWidth = Number(spl[0]);
            this.styleType = "FILL";
            if(spl[0] == "") this.styleType = "FILL";    
            if(spl[0] != "") this.styleType = "STROKE";
       }
       this.call = (B,
       callStroke=function(){B.stroke();},callFill=function(){B.fill();})=>{
           //It is Reactive.
           this.color = this.object.color
           this.strokeWidth = this.object.strokeWidth
           if(this.styleType=="FILL"){ 
               B.fillStyle = this.color;
               callFill(); 
           }
           if(this.styleType =="STROKE"){
               B.lineWidth = this.strokeWidth; 
               B.strokeStyle = this.color;
               callStroke(); 
           }
           if(this.object.props !== undefined){ for(let key in this.object.props){B[key]= this.object.props[key];}}
       }//EO call
       this.set(styling);
    }
    //Transform
    static rotate= function(child, B){
        if(child.rotation.rad!=0 && child.center!=undefined){
            B.translate(child.rotation.about.x, child.rotation.about.y);
            B.rotate(child.rotation.rad);
            B.translate(-child.rotation.about.x, -child.rotation.about.y);
        }
    }
    static shadow = function(B, params){
        [B.shadowColor, B.shadowOffsetX, B.shadowOffsetY, B.shadowBlur] =
        [params[2], params[0], params[1], params[3]];
    }
    static stylesAndComposites = {
        draw: function(child, B){
            B.globalAlpha = child.alpha; 
            CDraw.shadow(B, child.GCParams.shadow);
        },
        restore: function(B, child){
            B.globalAlpha = 1;  
            CDraw.shadow(B, [0, 0, "transparent", 0]);
            if(child.GCParams.norestore){  }
            else
            B.globalCompositeOperation = "source-over";
        }
    }
    static useScene= function(context){
        ["rect", "img", "arc", "line", "sLine"]
        .map((object)=>{
            //CDraw[object].prototype.rotation = {rad:0};
            CDraw[object].prototype.shapeName = object;
            /*
            CDraw[object].prototype.GCParams = {
                shadow: [0, 0, "transparent", 0],
            }
            */
        })
        this.B = context;
        this.allChildren = [];
        let animFrame = ()=>{
            CDraw.clearCanvas(this.B); 
            this.allChildren.map((child, childIn) =>{
                child.indexInScene = childIn;
                this.B.save();
                CDraw.stylesAndComposites.draw(child, this.B);
                CDraw.rotate(child, this.B);
                child.draw(this.B);
                CDraw.stylesAndComposites.restore(this.B, child);
                this.B.restore();
            });
            requestAnimationFrame(animFrame)
            //console.log("all", this.allChildren)
        }
        animFrame();
        this.add = (child)=>{
            child.indexInScene = this.allChildren.length;
            //Translation should be declared after scene.add().
            child.translation = {x:0, y:0, allow:false};
            this.allChildren.push(child);
        }
        this.remove = (child)=>{
        if(child.indexInScene)this.allChildren.splice(child.indexInScene,1);
        else {}
        }
    }//EO useScene
    static clearCanvas= function(B){
        B.clearRect(0, 0, B.canvas.width, B.canvas.height)
    }

}//EO CDraw
        
        
        
      


















        //alert(CDraw); alert(eruda)
        let logSpace = DOM$._("logSpace");
        logSpace.style.color = "red";
        logger = {
            write: function(v){logSpace.innerText = v;}
        }
        var scoreboard = DOM$._("scoreboard");
        
        
        function MFLR(a){ return Math.floor(a)};
        function MRDM(){ return Math.random()};




function initWorld(){ 
    let a = document.getElementById("canvas");
    let b = a.getContext("2d");
    a.style = (`position: absolute; top: 50%;left: 50%;display: block;margin: 0 auto;transform: translate(-50%,-50%);`);
    return {canvas: a, context: b};
}
function initController(){
    let createController = function(){
        
    }
    
    
    
    
    let events = [];
    function addKeyEvents(){
        document.onkeydown = function(e){
        let kCode = (e.keyCode);       //console.log("kd: "+ kCode);
        events.map((event)=>{        
            if(event.type!=="keydown") return;/*
            if(event.direction=="left"&&kCode==37) event.callback();
            if(event.direction=="right"&&kCode==39) event.callback();
            if(event.direction=="W"&&kCode==87) event.callback();*/
            if(event.direction=="left"&&kCode==37) event.ended = false;
            if(event.direction=="right"&&kCode==39) event.ended = false;
            if(event.direction=="W"&&kCode==87) event.ended = false;
            if(!event.ended) event.callback();
        });
        }
        document.onkeyup = function(e){
        let kCode = (e.keyCode);      //console.log("ku: "+kCode);
        events.map((event)=>{        
            if(event.type=="keydown"){
            if(event.direction=="left"&&kCode==37) event.ended = true;
            if(event.direction=="right"&&kCode==39)  event.ended = true;
            if(event.direction=="W"&&kCode==87)  event.ended = true;
            }//EO event.type
            if(event.type=="keyup"){
            if(event.direction==" "&&kCode==32) event.callback();
            }//EO event.type
        });
        }
    }    
    function addMobileEvents(){
        //
        let ctrR1 = document.querySelector("heroctrls[triangle] contr");
        ctrR1.onselectstart = function(e){ e.preventDefault(); return false};
        ctrR1.ontouchstart = ctrR1.onmousedown = function(e){
            e.preventDefault();
            events.map((event)=>{        
                if(event.type=="mobile"){
                    if(event.direction=="move-clicked")event.callback();
                }//EO event.type
            });
        }
        ctrR1.ontouchend = ctrR1.onmouseup = function(e){
            e.preventDefault();
            events.map((event)=>{        
                if(event.type=="mobile"){
                    if(event.direction=="move-end")event.callback();
                }//EO event.type
            });
        }
        
        
        let ctrR2 = document.querySelector("heroctrls[square] contr");
        ctrR2.onselectstart = function(e){ e.preventDefault(); return false};
        ctrR2.ontouchstart = ctrR1.onmousedown = function(e){
            e.preventDefault();
            events.map((event)=>{
                if(event.type=="mobile"){ 
                    if(event.direction=="shoot-clicked")event.callback();
                }//EO event.type
            });
        }
        ctrR2.ontouchend = ctrR2.onmouseup = function(e){
            e.preventDefault();
            events.map((event)=>{        
                if(event.type=="mobile"){
                    if(event.direction=="shoot-ended")event.callback();
                }//EO event.type
            });
        }
        
        
        
            
        let joystick = document.querySelector("heroctrls[joystick] contr");
        joystick.style.display = "block";
        let joystickDefaultPosition = {
            x: joystick.getBoundingClientRect().left ,
            y: joystick.getBoundingClientRect().top,
            xInPar: -joystick.parentNode.getBoundingClientRect().left + joystick.getBoundingClientRect().left,
            yInPar: -joystick.parentNode.getBoundingClientRect().top + joystick.getBoundingClientRect().top,
        }
        let joystickParent = joystick.parentNode;//CLS("hbto", 0);
        ctx = this;
        this.joystickDeg = -90; 
        this.joystickLeft = joystick.style.left;
        this.joystickTop = joystick.style.top;
        this.joystickHistory = [];
        
        
        joystick.ontouchmove = ev =>{
            ev.preventDefault();
            ePX = ev.touches[0].pageX;
            ePY = ev.touches[0].pageY;
            
            //get degrees of rotation
            oppX = -1*(ePX - joystickDefaultPosition.x );
            adjZ = -1*(ePY - joystickDefaultPosition.y );
            degInRad = Math.atan(oppX/adjZ);
            degInRad = Math.atan2(oppX, adjZ);
            degInRad = Math.atan2(adjZ, oppX); //0 at X>
            degInAng = (degInRad*180/Math.PI);//+( (degInRad < 0)?360:0 );
            this.joystickDeg = -degInAng;
            this.joystickLeft = 
                (joystickDefaultPosition.xInPar+
                ( Math.cos( (180-this.joystickDeg)*Math.PI/180)*joystick.clientHeight)
                )*100/joystickParent.clientWidth;
            this.joystickTop =
                (joystickDefaultPosition.yInPar+
                ( Math.sin( (180-this.joystickDeg)*Math.PI/180)*joystick.clientWidth)
                )*100/joystickParent.clientHeight;
            joystick.style.left = this.joystickLeft+"%";
            joystick.style.top = this.joystickTop+"%";
            this.joystickHistory.push({left: this.joystickLeft, right: this.joystickTop, degInAng});
            this.joystickMove = "neutral";
            if(this.joystickHistory.length >=2){
                let thisIndex = (this.joystickHistory.length-1);
                let thisDegRad = this.joystickHistory[thisIndex].degInAng;
                let lastDegRad = this.joystickHistory[thisIndex-1].degInAng;
                if(thisDegRad<lastDegRad) this.joystickMove = "left";
                if(thisDegRad>lastDegRad) this.joystickMove = "right";
                //console.log(thisIndex, thisDegRad , lastDegRad, event.type, event.direction);
            }
            //SendEvent
            events.map((event)=>{        
            if(event.type == "mJS"){
                if(event.direction == "dgl" && this.joystickMove=="left"){event.callback();}
                if(event.direction == "dgr" && this.joystickMove=="right"){event.callback();}
                if(event.direction == "dga"){event.callback();}
            }
            });
            
            
        }//EO joystick
        joystick.ontouchend = ev =>{
            this.joystickHistory = [];
        }//EO joystick;
        
        
        
        
        
    }    
    
    
    
    
    
    let set = function(type, direction){ console.log(direction);
        let listen = function(callback){ 
            let event = {type, direction, callback, ended: true};       
            if(typeof event.direction == "object"){ 
            for(let i=0; event.direction.length>i; i++){
                    events.push({... event, direction: event.direction[i] });
            }
            }
            else events.push(event);
            addKeyEvents();
            addMobileEvents();
            return event;
        }
        return {listen};
    }
    return {createController, set};
}    
    
    
    
    
    
    
    
    
    
    
    
function constructRooms(Game, scene, CW, CH){
    
    let fogColor1Base = null;
    fogColor1Base = "rgba(100,1060,120,5)";//green
    fogColor1Base = "rgba(100,120,1060,5)";//blue
    //fogColor1Base = "rgba(1060,100,120,5)";//red
    fogColor1Base = "white";
    let bgColor2 = "_#111155";
    bgColor2 = "_#4d4d4d";
    bgColor2 = `_rgba(70, 70, 70, 0.7)`;
    
    
    
    let fogColor1 = Game.context.createLinearGradient(0, 0, 0, CH);
    fogColor1.addColorStop(0, "transparent");
    fogColor1.addColorStop(1, fogColor1Base);
    let bg = 
    {
    shapes: [
        //new CDraw.rect(CW/2, 20, CH/2-60, 60, ["", "rgba(250,200,50,0.5)"]),
        new CDraw.rect(0, CW, 0, CH, ["", "#d4d4d4d4"]),
    ],
    }//EO bg
    scene.add(bg.shapes[0])
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //cemetery-c
    let svgbg = (new CDraw.img("./assets/cemetery-c.svg", 0, CW, 0, CH));
    svgbg.alpha = 0.051;
    scene.add(svgbg)
    
    //createBounds
    let createBounds = function(rect, returnn=false){
        let dm = {left: rect.x, width: rect.lengthX, top: rect.y, height: rect.breadthY, obj: (returnn?rect:{}) };
        rect.left = dm.left; rect.top = dm.top;
        rect.width = dm.width; rect.height = dm.height;
        return dm;
    }
    
    
    //Creating Labyrinth
    //Node linking tbc...
    let GenerateLabyrinth = (function(){
    let n = 12;
    let pickedNodes = [];
    let U = 1;
    let G = 4;
    for(let i=0; n>i; i+= G){ //if(MRDM()>0.95) continue;
        let x = U*i;
    for(let j=0; n>j; j++){
        let y = U*j;
        let limit = 1+MFLR(MRDM()*3); //1-3
    for(let k=0; limit>k; k++){
        pickedNodes.push([x, y]);;
        if(k!=limit-1) x += U*1*[-1,+1][MFLR(MRDM()*2)];
    }
    }   
    }   
        
        
    for(let i=0; n>i; i+= G){ //if(MRDM()>0.95) continue;
        let x = U*i;
    for(let j=0; n>j; j++){
        let y = U*j;
        let limit = 1+MFLR(MRDM()*3);
    for(let k=0; limit>k; k++){
        pickedNodes.push([y, x]);;
        if(k!=limit-1) x += U*1*[-1,+1][MFLR(MRDM()*2)];
    }
    }   
    }   
    
    
    let leftNodes = [];
    for(let i=0; n>i; i+=1){
    for(let j=0; n>j; j+=1){
        let node = [i, j];
        let foundNode = false;
        pickedNodes.map((nd)=>{
            if(nd[0]==node[0]&&nd[1]==node[1]) foundNode = true;
            else{ }
        });
        if(!foundNode) leftNodes.push(node)
        if(false && !foundNode) scene.add(new CDraw.text("+20pt hF", ""+i+":"+j, i*w, j*l, "_white"));
    }
    }
    
    return {Filled: pickedNodes, Empty: leftNodes, Units: n};
    });//GenerateLabyrinth
    
    
    
    Game.cemList = [];
    let Labyrinth = GenerateLabyrinth();
    Labyrinth.area = {w: CW, h: CH};
    Labyrinth.FilledList = [];
    Labyrinth.Empty.map((nd)=>{
        let n = Labyrinth.Units;
        let w = CW/n; let l = CH/n;
        //stand = createStand([-CW/2+nd[0]*w-w/2, 0+7.5/2, 275-CW/2+nd[1]*l-l/2], [w, 7.5/1, l]);
        let cgspace = (new CDraw.rect(nd[0]*w, w, nd[1]*l, l, bgColor2));
        scene.add(cgspace)
        let cgspacebounds = createBounds(cgspace);
        Game.collisionList[`cg${MFLR(MRDM()*1000)}`]=cgspacebounds;
        Game.gfpcollisionList[`gfp${MFLR(MRDM()*1000)}`]=cgspacebounds;
        if(MRDM()>0.8){
            let cg = (new CDraw.img("./assets/cemetery.svg",nd[0]*w, w, nd[1]*l, l));
            cg.alpha = 0.5;
            scene.add(cg);
            Game.cemList.push({cem: cg, pos: nd});
            //let gg = (new CDraw.img("./C-2D/assets/ghost.svg",nd[0]*w, w, nd[1]*l, l));
            //gg.alpha = 0.2;
            //scene.add(gg);
        }else{
            //let cg = (new CDraw.img("./C-2D/assets/cemetery.svg",nd[0]*w, w, nd[1]*l, l));
            //cg.alpha = 0.1;
            //scene.add(cg)
        }
    });
    Labyrinth.Filled.map((nd)=>{
        let n = Labyrinth.Units;
        let CW = 120; let CH = 120;
        let w = CW/n; let l = CH/n;
        stamf = {
            position: {
                x: -CW/2+nd[0]*w-w/2, y: 0+7.5/2, z: 275-CW/2+nd[1]*l-l/2
            }
        };//EO stamf
        Labyrinth.FilledList.push(nd);
    });
    Game.Labyrinth = Labyrinth;
    
    
    
    
    
    
    
    
    
    
    
    
    let n = Game.Labyrinth.Units;
    let a = Game.Labyrinth.area
    let w = a.w/n; let l = a.h/n;
    //SetKeyLocation
    let FList = Game.Labyrinth.FilledList;
    let FListLength = FList.length;
    let keysIndex = [];
    let pInds = [];
    Game.keycontactList = {};
    Game.unpickedkeys = [];
    Game.unpickedkeyslength = 0;
    while (keysIndex.length<13){
        let pInd = MFLR(MRDM()*FListLength);
        if(pInds.find(p=>p==pInd)!==undefined) continue;
        let nd = FList[pInd];
        if(nd[0]<0 || nd[1]<0) continue;
        pInds.push(pInd);
        keysIndex.push(nd);
        console.log(nd)
        let ky = (new CDraw.img("./assets/cemetery-c.svg",nd[0]*w+w/4, w/2, nd[1]*l+l/4, l/2));
        ky.alpha = 0.5;
        //ky.rotation.rad = 90;
        scene.add(ky);
        Game.keycontactList[`ky${MFLR(MRDM()*1000)}`] = 
            createBounds(ky, true);
        Game.unpickedkeys.push(1);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    ///
    let expiredGhostObjs = [];
    let ghostEls = [];
    let triggerGhost = function (x,y, mx, my, follow=false){
        let ghost = {};
        if(expiredGhostObjs.length>0 && false){
            ghost = expiredGhostObjs[0];
            expiredGhostObjs.pop();
        }else{
            ghost = (new CDraw.img(`./assets/ghost-3.svg`, 0, 0, 0, 0));
            ghost.alpha = 1;
            scene.add(ghost);
            ghostEls.push(ghost);
        }    
        ghost.expired = false;
        ghost.x = x
        ghost.y = y
        ghost.my = my
        ghost.mx = mx
        ghost.mlengthX = CW/17;
        ghost.mbreadthY = ghost.mlengthX;
        ghost.lengthX = ghost.mlengthX/50;
        ghost.breadthY = ghost.mbreadthY/50;
        ghost.speedx = 0.25*(1+MRDM()*0.2);
        ghost.speedy = 0.25*(2.5+MRDM()*0.2);
        ghost.follow = follow;
        Game.gfpcollisionList[`gfp${MFLR(MRDM()*1000)}`] = ghost;
        return ghost;
    }//EO triggerGhost
    Game.triggerGhost = triggerGhost;
    
    let mtime = {}
    function moveGhosts(){
        mtime.now = new Date();
        if(mtime.last === null) mtime.last = mtime.now-20000;
        mtime.fps = 1;//1000/(mtime.now-mtime.last);
        mtime.dlt = 1/mtime.fps;
        ghostEls.map((ghost, ind)=>{
            if(ghost.expired) return;
            if(ghost.follow){ghost.mx = ghost.follow.x; ghost.my = ghost.follow.y;}
            if(ghost.y>ghost.my) ghost.y -= 1*0.5*(ghost.speedy);
            if(ghost.y<ghost.my) ghost.y += 1*0.5*(ghost.speedy);
            if(ghost.x>ghost.mx) ghost.x -= 1*0.5*(ghost.speedx);
            if(ghost.x<ghost.mx) ghost.x += 1*0.5*(ghost.speedx);
            
            
            if(ghost.lengthX < ghost.mlengthX) 
                ghost.lengthX += ghost.speedx*0.4*mtime.dlt;
            if(ghost.breadthY < ghost.mbreadthY)
                ghost.breadthY += ghost.speedx*0.4*mtime.dlt;
            //remove expired ghosts
            if(false && ghost.x+ghost.lengthX<0) {
                ghost.expired = true;
                expiredGhostObjs.push(ghost);
            }
        });
        mtime.last = mtime.now;
        requestAnimationFrame(moveGhosts);
    }//EO moveGhosts
    moveGhosts();
    
    
    
    
    
    
    
    
    function getNearestCm(hero){
        Game.cemList = Game.cemList.sort((cem1, cem2)=>{
            if(cem1.used || cem2.used){
                if(cem1.used) return (2-1);
                if(cem2.used) return (1-2);
            }
            return Math.hypot(cem1.cem.x-hero.x, cem1.cem.y-hero.y)
                 - Math.hypot(cem2.cem.x-hero.x, cem2.cem.y-hero.y)
        });
        let cem = Game.cemList[0].cem;
        Game.cemList[0].used = true;
        return cem;
    }
    Game.getNearestCm = getNearestCm;
    
    
    
    
    
    
    
}//EO drawRoom









function drawHero(Game, scene, SX, SY){ CU = CR/3;
    let heroParts = {
        head: new CDraw.arc(SX, SY, CU/160, 0, 6.3, "_red"),
        body: new CDraw.arc(SX, SY, CU/100, 0, 6.3, "_green"),
        head: new CDraw.sLine(SX-CU/57, CU/60, SY, 0, "red", CU/40),
        body: new CDraw.sLine(SX, 0, SY-CU/40, CU/20, "rgba(0,200,0,0.6)",CU/27),
        leg1: new CDraw.sLine(SX, CU/40, SY-CU/57, 0, "yellowgreen", CU/57),
        leg2: new CDraw.sLine(SX, -CU/40, SY+CU/57, 0, "yellow", CU/57),
        arm1: new CDraw.sLine(SX, CU/24, SY-CU/50, 0, "yellowgreen", CU/57),
        arm2: new CDraw.sLine(SX, CU/24, SY+CU/50, 0, "yellow", CU/57),
        hnd1: new CDraw.sLine(SX, CU/22, SY-CU/50, 0, "yellowgreen", CU/66),
        hnd2: new CDraw.sLine(SX, CU/22, SY+CU/50, 0, "yellow", CU/66),
        gun: new CDraw.sLine(SX-CU/57, CU/60, SY, 0, "red", CU/40),
        gfc: new CDraw.sLine(SX-CU/57, CU/60, SY, 0, "black", CU/40),//gun focus
        gfp: new CDraw.rect(CU/57, CU/60, SY, 0, "red"),//gunfocuspoint
    }//EO 
    
    ;["leg1","leg2","body","arm1","arm2","hnd1","hnd2","head","gun","gfc","gfp"].map((e)=>{
        scene.add(heroParts[e]);
    });
    
    
    
    
    
    
    
    
    heroParts.head.props= {lineCap: "round"};
    heroParts.body.props= {lineCap: "round"};
    heroParts.leg1.props= {lineCap: "round"};
    heroParts.leg2.props= {lineCap: "round"};
    heroParts.leg1.dx=0;
    heroParts.leg2.dx=0;
    heroParts.leg1.dy=0;
    heroParts.leg2.dy=0;
    heroParts.arm1.props= {lineCap: "round"};
    heroParts.arm2.props= {lineCap: "round"};
    heroParts.arm1.dx=0;
    heroParts.arm2.dx=0;
    heroParts.arm1.dy=0;
    heroParts.arm2.dy=0;
    heroParts.hnd1.props= {lineCap: "round"};
    heroParts.hnd2.props= {lineCap: "round"};
    
    //setContext
    let ctx = this;
    //
    
    
    
    
    
    /*****
     * 
     * 
     * reanimate
     * 
     * 
     *****/
    let leg1moving =  true;
    let htime = {};
    this.reanimate = function(id=0){
        htime.now = new Date();
        if(htime.last === null) htime.last = htime.now-1000;
        htime.fps = 1;//1000/(htime.now-htime.last)/40.5;
        htime.dlt = 1/htime.fps; //logger.write(htime.dlt)
        /////////////
    hero = ctx;//hero_; 
    //console.log(hero.rot);
    [hero.parts.arm1,hero.parts.arm2,
    hero.parts.leg1,hero.parts.leg2,
    hero.parts.body,hero.parts.head,
    hero.parts.gun, hero.parts.gfc,
    ]
    .map((part)=>{
        part.rotation.about = {x: hero.x, y: hero.y}
        part.rotation.rad = hero.rot;
        part.color = "#bb7777";
        if(hero.majorColor) part.color  = hero.majorColor;
    });
    hero.parts.body.x = hero.x;
    hero.parts.body.y = hero.y-CU/40; 
    hero.parts.head.color = "white";
    hero.parts.head.x = hero.x+CU/100;
    hero.parts.head.y = hero.y;
    //gun
    hero.parts.gun.y = hero.y;
    hero.parts.gun.lengthX = CU/35;
    hero.parts.gun.strokeWidth = hero.parts.hnd2.strokeWidth*0.8;
    hero.parts.gun.color = "brown"
    //gfc
    hero.parts.gfc.y = hero.y;
    hero.parts.gfc.lengthX = CU;
    hero.parts.gfc.strokeWidth = hero.parts.hnd2.strokeWidth*0.1;
    if(!hero.parts.gfc.keepcolor || hero.parts.gfc.keepcolor<=0)
    hero.parts.gfc.color = "black";
    else{hero.parts.gfc.color = "red";  hero.parts.gfc.keepcolor -= 0.1;}
    //gfp
    hero.parts.gfp.y = hero.y;
    hero.parts.gfp.lengthX = CU/30;
    hero.parts.gfp.breadthY = CU/30;
    hero.parts.gfp.color = "rgba(0,0,250,0)"
    
    
    
    
    
    
    
    
    
    
    
    
    let keycD = hero.keycontactDetected(hero);
    if(keycD.yes){
        keycD.obj.obj.x = -300;//disappear
        keycD.obj.contacted = true;
        
        
        Game.unpickedkeys = [];
        let ff = "";
        for(let key in Game.keycontactList){
            if(Game.keycontactList[key].obj.x == -300){ff+=" ded: "}
            else Game.unpickedkeys.push(1);
            //ff+=" "+Game.keycontactList[key].obj.x;
        }
        //logger.write(ff);
        //Game.unpickedkeys.pop();
        Game.unpickedkeyslength = Game.unpickedkeys.length
        
    }
    //logger.write(Game.unpickedkeyslength );
    //
    
    
    
    hero.getFocusLimit();
    if(hero.collisionDetected(hero).yes){ 
        hero.speed *= -1;
        let nearestCm = Game.getNearestCm(hero);
        nearestCm.alpha = 0.1;
        Game.triggerGhost(nearestCm.x, nearestCm.y, hero.x, hero.y, hero);
    }
    hero.walking = true;
    if(hero.speed<0) hero.walking = false;
    if(leg1moving && hero.walking){ 
        hero.parts.leg1.dx -= hero.speed*CU/133*htime.dlt;
        hero.parts.leg2.dx += hero.speed*CU/133*htime.dlt;
    }
    if(hero.parts.leg1.x <= hero.x-CU/40) leg1moving = false;
    if(!leg1moving && hero.walking){
         hero.parts.leg2.dx -= hero.speed*CU/133*htime.dlt;
         hero.parts.leg1.dx += hero.speed*CU/133*htime.dlt;
    }
    if(hero.parts.leg2.x <= hero.x-CU/40) leg1moving = true;
    
    
    
    
 
    hero.parts.leg2.x = hero.x+hero.parts.leg2.dx;
    hero.parts.leg1.x = hero.x+hero.parts.leg1.dx;
    hero.parts.leg2.y = hero.y-CU/57+hero.parts.leg2.dy;
    hero.parts.leg1.y = hero.y+CU/57+hero.parts.leg1.dy;
            
    hero.parts.arm2.x = hero.x+hero.parts.arm2.dx;
    hero.parts.arm1.x = hero.x+hero.parts.arm1.dx;
    hero.parts.arm2.y = hero.y-CU/31+hero.parts.arm2.dy;
    hero.parts.arm1.y = hero.y+CU/31+hero.parts.arm1.dy;
    hero.parts.hnd1.x = hero.parts.arm1.x+ hero.parts.arm1.lengthX*1.23;
    hero.parts.hnd1.y = hero.parts.arm1.y;
    hero.parts.hnd2.x = hero.parts.arm2.x+ hero.parts.arm2.lengthX*1.23;
    hero.parts.hnd2.y = hero.parts.arm2.y;
    hero.parts.hnd1.lengthX = CU/24;
    hero.parts.hnd2.lengthX = CU/24;
    
    
    
    //GUN HOLDING POS
    //hero.parts.A1.breadthY = -8;
    //hero.parts.hnd2.breadthY = +8;
    if(hero.gunHold=="pistol_stretch"){
    hero.parts.hnd1.breadthY = -CU/50*1;
    hero.parts.hnd2.breadthY = +CU/50*1;
    }
    if(hero.gunHold=="gun_pistol_stretch"){
    hero.parts.arm2.lengthX = CU/57;
    hero.parts.arm1.lengthX = CU/57;
    hero.parts.hnd1.x = hero.parts.arm1.x+ hero.parts.arm1.lengthX*1.35;
    hero.parts.hnd1.y = hero.parts.arm1.y;
    hero.parts.hnd2.x = hero.parts.arm2.x+ hero.parts.arm2.lengthX*1.35;
    hero.parts.hnd2.y = hero.parts.arm2.y;
    hero.parts.hnd1.breadthY = -CU/33;
    hero.parts.hnd2.breadthY = CU/100;
    hero.parts.gun.x = hero.parts.hnd2.x+ hero.parts.hnd2.lengthX;
    hero.parts.gfc.x = hero.parts.hnd2.x+ hero.parts.hnd2.lengthX;
    }
    if(hero.gunHold=="gun_none"){
    hero.parts.arm2.lengthX = 0;
    hero.parts.arm1.lengthX = 0;
    hero.parts.hnd1.x = hero.parts.arm1.x+ hero.parts.arm1.lengthX*1.35;
    hero.parts.hnd1.y = hero.parts.arm1.y;
    hero.parts.hnd2.x = hero.parts.arm2.x+ hero.parts.arm2.lengthX*1.35;
    hero.parts.hnd2.y = hero.parts.arm2.y;
    hero.parts.hnd1.lengthX /= 2;
    hero.parts.hnd2.lengthX /= 2;
    hero.parts.hnd1.breadthY = -0;
    hero.parts.hnd2.breadthY = 0;
    }
    
    
    
    
    
    
    hero.parts.hnd1.rotation.rad = hero.parts.arm1.rotation.rad;
    hero.parts.hnd2.rotation.rad = hero.parts.arm2.rotation.rad;
    hero.parts.hnd1.rotation.about = hero.parts.arm1.rotation.about;
    hero.parts.hnd2.rotation.about = hero.parts.arm2.rotation.about;
    hero.parts.hnd1.color = hero.parts.arm1.color;
    hero.parts.hnd2.color = hero.parts.arm2.color;
    
    
    
    //move
    hero.y -= hero.speed*hero.dy*htime.dlt;
    hero.x -= hero.speed*hero.dx*htime.dlt;
    //get bounds
    hero.width = hero.parts.body.breadthY*2;
    hero.left = hero.x-hero.width/2;
    hero.height = hero.parts.body.breadthY*2;
    hero.top = hero.y-hero.height/2;
    
    
    if(hero.speed>0) hero.speed -= 0.01;
    if(hero.speed<0) hero.speed += 0.05;
    if(hero.speed>-0.05 && hero.speed<0.05) hero.speed = 0;
    //console.log(id+" type: ", hero.type)
    
    
    
    
    htime.last = htime.now;
    scoreboard.innerText = `Pick up ${Game.unpickedkeyslength} of 13 crosses without triggering the ghosts`;
    requestAnimationFrame(hero.reanimate);
    }//reanimate
    this.goTo = function(px, py){
        
        this.speed = 0.9;
    }//goTo
    this.collisionDetected = function(thos){
        return this.contactDetected(thos, Game.collisionList);
    }
    this.keycontactDetected = function(thos){
        return this.contactDetected(thos, Game.keycontactList);
    }
    this.contactDetected = function(thos, GCL){
        //if(this.name=="hero") logger.write(thos.name)
        let fps = 1;
        let collisionList = GCL;
        for(let objectdmkey in collisionList){
            let objectdm = collisionList[objectdmkey];
            let thisRight = thos.left + thos.width;
            let thisBottom = thos.top + thos.height;
            let objectdmRight = objectdm.left + objectdm.width;
            let objectdmBottom = objectdm.top + objectdm.height;
            let nextthisBottomEstimate = thisBottom + thos.speed / fps;
            let isSame = (thos.name == objectdmkey);
            if( !isSame &&
                thisRight > objectdm.left && thos.left < objectdmRight &&
                thisBottom > objectdm.top && thos.top < objectdmBottom &&
                true
            )
            {
                //scene.add(new CDraw.rect(this.left, this.width, this.top, this.width, "_rgba(200,0,0,0.5)"));
                //scene.add(new CDraw.rect(objectdm.left, objectdm.width, objectdm.top, objectdm.width, "_rgba(0,0,200,0.5)"));
                //if(this.name=="hero") logger.write(thos.name+" "+objectdmkey)
                //if(this.name=="hero") logger.write(thos.name)
                return {yes: true, obj: objectdm};
            }
        }
        return {yes: false};
    }
    this.getFocusLimit= function(){
        let gfp = this.parts.gfp;
        let gfc = this.parts.gfc;
        //hyp
        let gunabx = this.parts.gun.rotation.about.x;
        let gunaby = this.parts.gun.rotation.about.y;
        let gunhyp = Math.sqrt(
            Math.pow(gunabx-this.parts.gun.x, 2)
           +Math.pow(gunaby-this.parts.gun.y, 2)
           );
        let hyptag =`${MFLR(this.parts.gun.x+this.parts.gun.y+hero.dx+hero.dy)}`;
        if(!gfp.hypobj || !gfp.hypobj[hyptag]){
            gfp.hypobj = {};  
            gfp.hypobj[hyptag] = 0;
            //console.log(hyptag);
        }   
        gfp.hypobj[hyptag]+= gfp.speed; 
        gfp.hyp = gfp.hypobj[hyptag];
        //gfc.lengthX = gfp.hyp;
        gfp.x = gunabx+(gunhyp+gfp.hyp)*hero.dx*-1
        gfp.y = gunaby+(gunhyp+gfp.hyp)*hero.dy*-1;
        //get bounds
        gfp.width = gfp.lengthX
        gfp.left = gfp.x;
        gfp.height = gfp.breadthY
        gfp.top = gfp.y;
        gfp.speed = 10;
        if(this.collisionDetected(gfp, Game.gfpcollisionList).yes){ 
            //if(this.name=="hero") logger.write("yes");
            gfp.speed = 0;gfc.lengthX = gfp.hyp;
        }else{ 
            //if(this.name=="hero") logger.write("noo"); 
        }
    }  
    this.action = {
        focusgun: function(){
            
        },  
        shoot: function(){
            ctx.parts.gfc.color = "red";
            ctx.parts.gfc.keepcolor = 2;
            console.log(ctx.parts.gfc.keepcolor)
        }    
    }    
    Object.assign(this, {
        parts: heroParts, 
        x: SX, y: SY, walking: true, rot: -1.6, speed: 0,
        dx: 0, dy: 1, gunHold: "gun_none"
    })
}    //EO drawHero
function drawOn(Game){
    let {canvas: a, context: b} = Game;
    let wh = 
    (window.screen.width<601?4*90/1.25:(window.screen.width<901?500:690));
    let sw = window.screen.width*0.9;
    let sh = window.screen.height;
    let CW = a.width = sw;
    let CH = a.height = sw;
    let CR = MATH$.resultantOf(CW, CH);
    window.CR = CR;
    let setPixelRatio = function(){
        a.style.width = a.width+"px";
        a.style.height = a.height+"px";
        const dpr = window.devicePixelRatio || 1;
        const rect = a.getBoundingClientRect();
        a.width = rect.width*dpr;
        a.height = rect.height*dpr;
    }
    //setPixelRatio();
    
    
    
    
    
    
    
    let scene = new CDraw.useScene(b);
    let bgRect = new CDraw.rect(0, CW, 0, CH, "_#000817");
    scene.add(bgRect);
    
    constructRooms(Game, scene, CW, CH);
    let hero = new drawHero(Game, scene, CW/2, CH/2);
    hero.type = "hero";
    hero.majorColor = "#232333";
    hero.reanimate(1);
    hero.gunHold = "gun_pistol_stretch";
    hero.action.focusgun();
    hero.name = "hero";
    hero.parts.gfp.name = "hero";
    Game.collisionList["hero"] = hero;
    
    {//
    let n = Game.Labyrinth.Units;
    let a = Game.Labyrinth.area
    let w = a.w/n; let l = a.h/n;
    let FList = Game.Labyrinth.FilledList;
    let FListLength = FList.length;
    function pickindexrand(){
        let pickedIndex = FList[MFLR(MRDM()*FListLength)];
        if(pickedIndex[0]<0 || pickedIndex[1]<0) return pickindexrand();
        return pickedIndex;
    }
    let pickedIndex = pickindexrand();
    hero.x = pickedIndex[0]*w+w/2;
    hero.y = pickedIndex[1]*l+l/2;
    }//
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    Game.controller.set("mobile", "move-clicked").listen(function(){
        hero.speed = 0.9; 
    });
    Game.controller.set("mobile", "move-ended").listen(function(){
        hero.speed = 0; 
    });
    Game.controller.set("mJS", "dgr").listen(function(){
        hero.rot += Math.PI/128;
    });
    Game.controller.set("mJS", "dgl").listen(function(){
        hero.rot -= Math.PI/128;
    });
    Game.controller.set("mJS", "dga").listen(function(){
        hero.dy = -Math.sin(hero.rot);
        hero.dx = -Math.cos(hero.rot); 
    });
    Game.controller.set("mobile", "shoot-clicked").listen(function(){
        hero.action.shoot();
        Game.audioList.shoot.play();
    });
    Game.controller.set("mobile", "shoot-ended").listen(function(){
        
    });
    
    
    
    
    
}   //EO drawOn
















    


class Game{
    constructor(){
        this.controller = initController();
        this.controller.createController("mobile-joystick");
        this.controller.createController("desktop-keyboard");
        let {canvas, context} = this.initWorld();
        this.canvas = canvas;
        this.context = context;
        this.collisionList = {};
        this.gfpcollisionList = {};
        this.hero = new Hero();
        this.initLevel(new Level(1));
        this.audioList = {};
        this.audioList.shoot = new Audio();
        this.audioList.shoot.src = `./assets/gun-shot.mp3`;
    }
    initWorld(){
        return initWorld();
    }
    setLevel(level){
        this.level = level;
    }
    getLevel(){
        return this.level;
    }
    initLevel(level){
        this.setLevel(level);
        this.initUi();
    }
    setPlaystate(state){
        this.playstate = state;
    }
    setLastCheckPoint(checkPoint){
        this.lastCheckPoint = checkPoint;
    }
    getLastCheckPoint(){
        return this.lastCheckPoint;
    }
    initUi(){
        drawOn(this);
    }
}
class Level{
    constructor(index){
        this.setProps([
        {
            name: "shootout",
            difficulty: 1,
            index: 1,
        },
        {
            name: "defense",
            difficulty: 2,
            index: 2,
        },
        ][index-1]);
        return this;
    }
    setProps(props){
        for(let key in props){ this[key] = props[key] };
    }
}
class Hero{
    constructor(){
        this.health = 100;
        this.active = false;
    }
    
}

let G = new Game(); 
console.log(G.hero);
console.log(G.level)

