
function initWorld(){ 
    let a = document.getElementById("canvas");
    let b = a.getContext("2d");
    a.style = (`position: absolute; 
    top: 50%;
    left: 50%;
    display: block;
    margin: 0 auto;
    transform: translate(-50%,-50%);`);
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
            if(event.type == "mobile-JS"){
                if(event.direction == "drag-left" && this.joystickMove=="left"){event.callback();}
                if(event.direction == "drag-right" && this.joystickMove=="right"){event.callback();}
                if(event.direction == "drag-any"){event.callback();}
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
    for(let i=0; n>i; i+= G){ //if(Math.random()>0.95) continue;
        let x = U*i;
    for(let j=0; n>j; j++){
        let y = U*j;
        let limit = 1+Math.floor(Math.random()*3); //1-3
    for(let k=0; limit>k; k++){
        pickedNodes.push([x, y]);;
        if(k!=limit-1) x += U*1*[-1,+1][Math.floor(Math.random()*2)];
    }
    }   
    }   
        
        
    for(let i=0; n>i; i+= G){ //if(Math.random()>0.95) continue;
        let x = U*i;
    for(let j=0; n>j; j++){
        let y = U*j;
        let limit = 1+Math.floor(Math.random()*3);
    for(let k=0; limit>k; k++){
        pickedNodes.push([y, x]);;
        if(k!=limit-1) x += U*1*[-1,+1][Math.floor(Math.random()*2)];
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
        Game.collisionList[`cg${Math.floor(Math.random()*1000)}`]=cgspacebounds;
        Game.gfpcollisionList[`gfp${Math.floor(Math.random()*1000)}`]=cgspacebounds;
        if(Math.random()>0.8){
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
        let pInd = Math.floor(Math.random()*FListLength);
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
        Game.keycontactList[`ky${Math.floor(Math.random()*1000)}`] = 
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
        ghost.speedx = 0.25*(1+Math.random()*0.2);
        ghost.speedy = 0.25*(2.5+Math.random()*0.2);
        ghost.follow = follow;
        Game.gfpcollisionList[`gfp${Math.floor(Math.random()*1000)}`] = ghost;
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
    scene.add(heroParts.leg1);
    scene.add(heroParts.leg2);
    scene.add(heroParts.body);
    scene.add(heroParts.arm1);
    scene.add(heroParts.arm2);
    scene.add(heroParts.hnd1);
    scene.add(heroParts.hnd2);
    scene.add(heroParts.head);
    scene.add(heroParts.gun);
    scene.add(heroParts.gfc);
    scene.add(heroParts.gfp);
    
    
    
    
    
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
        let hyptag =`${Math.floor(this.parts.gun.x+this.parts.gun.y+hero.dx+hero.dy)}`;
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
        let pickedIndex = FList[Math.floor(Math.random()*FListLength)];
        if(pickedIndex[0]<0 || pickedIndex[1]<0) return pickindexrand();
        return pickedIndex;
    }
    let pickedIndex = pickindexrand();
    hero.x = pickedIndex[0]*w+w/2;
    hero.y = pickedIndex[1]*l+l/2;
    }//
    
    
    
    
    
    
    
    
    
    
    
    
    
    




    console.log("...", hero);
    console.log(Game)
    Game.controller.set("keydown", "left").listen(function(){
        hero.rot -= Math.PI/32; console.log(hero.rot);
    })
    Game.controller.set("keydown", "right").listen(function(){
        hero.rot += Math.PI/32;
    });
    Game.controller.set("keydown", ["right", "left"]).listen(function(){
        hero.dy = -Math.sin(hero.rot);
        hero.dx = -Math.cos(hero.rot); 
    });
    Game.controller.set("keydown", "W").listen(function(){
        hero.speed = 0.6; 
    });
    Game.controller.set("keyup", " ").listen(function(){
        hero.action.shoot();
        Game.audioList.shoot.play();
    });
    
    
    Game.controller.set("mobile", "move-clicked").listen(function(){
        hero.speed = 0.9; 
    });
    Game.controller.set("mobile", "move-ended").listen(function(){
        hero.speed = 0; 
    });
    Game.controller.set("mobile-JS", "drag-right").listen(function(){
        hero.rot += Math.PI/128;
    });
    Game.controller.set("mobile-JS", "drag-left").listen(function(){
        hero.rot -= Math.PI/128;
    });
    Game.controller.set("mobile-JS", "drag-any").listen(function(){
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

