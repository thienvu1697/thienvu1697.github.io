	var canvasCursor = document.getElementById("myCursor");
	gsap.registerPlugin(PixiPlugin);
	gsap.registerPlugin(ScrollTrigger);

	const appbg = new PIXI.Application({ view: canvasCursor, transparent: true, antialias: true, width: window.innerWidth, height: window.innerHeight});
	appbg.renderer.autoResize = true;
	appbg.renderer.view.style.pointerEvents = "none";

	var cursorDot = new PIXI.Graphics();
	cursorDot.beginFill(0xFFFFFF);
	cursorDot.drawCircle(0,0,2);
	cursorDot.endFill;

	var cursor = new PIXI.Graphics();
	cursor.lineStyle(1, 0x000000, 1);
	cursor.moveTo(0,-20);
	cursor.lineTo(20,0);
	cursor.lineTo(0,20);
	cursor.lineTo(-20,0);
	cursor.closePath();
	var cursorFill = new PIXI.Graphics();
	cursorFill.beginFill(0x000000, 0.2);
	cursorFill.moveTo(0,-20);
	cursorFill.lineTo(20,0);
	cursorFill.lineTo(0,20);
	cursorFill.lineTo(-20,0);
	cursorFill.endFill;
	cursorFill.scale = 0;

	appbg.stage.addChild(cursor);
	appbg.stage.addChild(cursorFill);
	appbg.stage.addChild(cursorDot);
		
	// Background shapes - extra

	gsap.from("#myCursor", {
		scrollTrigger: {
			trigger: "#mySakuhin",
		},
		css:{position: "absolute"},
		ease: "none",
	})

	//get mouse position

	var getMousePositionBg = () =>
	{
		return appbg.renderer.plugins.interaction.mouse.global
	};

	let mousePositionBg = getMousePositionBg()	

	var mouseStatusCTA = false;
	var mouseStatus = false;

	function mouseOver(x){
		mouseStatus = x;
	}

	function mouseOverCTA(y){
		mouseStatusCTA = y;
	}

	let colorMatrix = new PIXI.filters.ColorMatrixFilter();
	cursorDot.filters = [colorMatrix];

	appbg.ticker.add(() =>	{
		mousePositionBg = getMousePositionBg();;
		cursorDot.x = mousePositionBg.x;
		cursorDot.y = mousePositionBg.y;

		if (mouseStatusCTA == true){
			gsap.to(cursor,0.5,{pixi:{x: mousePositionBg.x, y: mousePositionBg.y, scale: 4,}});
			gsap.to(cursorFill,0.5,{pixi:{x: mousePositionBg.x, y: mousePositionBg.y, scale: 4 }});
			gsap.to("#myCTA h2",0.5,{css:{opacity: 1,}});
			colorMatrix.brightness(1);
		} else if (mouseStatus == true) {
			gsap.to(cursor,0.25,{pixi:{x: mousePositionBg.x, y: mousePositionBg.y, scale: 1.5, ease: "bounce"}});
			gsap.to(cursorFill,0.25,{pixi:{x: mousePositionBg.x, y: mousePositionBg.y, scale: 1}});
			colorMatrix.brightness(1);
		} else {
			gsap.to(cursor,0.1,{pixi:{x: mousePositionBg.x, y: mousePositionBg.y, scale: 1	}});
			gsap.to(cursorFill,0.1,{pixi:{x: mousePositionBg.x, y: mousePositionBg.y, scale: 0}});
			gsap.to("#myCTA h2",0.5,{opacity: 0,});
			colorMatrix.brightness(0);
		}


		console.log(mouseStatus)

	});