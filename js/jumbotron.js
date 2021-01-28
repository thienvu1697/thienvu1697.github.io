

		var canvasLogo = document.getElementById("myLogo");
		gsap.registerPlugin(PixiPlugin);

		const app = new PIXI.Application({ view: canvasLogo, transparent: true, antialias: true});
		app.renderer.view.style.width = canvasLogo.style.width + 'px';
		app.renderer.view.style.height = canvasLogo.style.height + 'px';
		app.renderer.view.style.pointerEvents = "none";

		const logo = new PIXI.Container();
		logo.x = app.screen.width / 2;
		logo.y = app.screen.height / 2;
		const textfore = new PIXI.Container();
		const textback = new PIXI.Container();
		const background = new PIXI.Container();
		const foreground = new PIXI.Container();

		app.stage.addChild(background);
		app.stage.addChild(textback);
		app.stage.addChild(logo);
		app.stage.addChild(foreground);
		app.stage.addChild(textfore);

		app.loader
			.add('js/EscherStar3D.json')
			.load(onAssetsLoaded);

		function onAssetsLoaded() {
			// create an array of textures from an image path
			const frames = [];

		for (let i = 1; i < 97; i++){ 
				const val = i < 10 ? `0${i}` : i;

				// magically works since the spritesheet was loaded with the pixi loader
				frames.push(PIXI.Texture.from(`EscherStar3D.00${val}.png`));
			}

			// create an AnimatedSprite (brings back memories from the days of Flash, right ?)
			const anim = new PIXI.AnimatedSprite(frames);

			/*
			 * An AnimatedSprite inherits all the properties of a PIXI sprite
			 * so you can change its position, its anchor, mask it, etc
			 */
			anim.anchor.set(0.5);
			anim.animationSpeed = 0.5;
			anim.height = app.screen.height * 0.9;
			anim.width = anim.height * 16 / 9;
			anim.play();

			logo.addChild(anim);
		}

		// Texts

		// --- define textstyle

		const stlfore = new PIXI.TextStyle({fontFamily: 'Arial',fontSize: app.screen.height / 8,fontWeight: 'bold',fill: 'black',});
		const stlback = new PIXI.TextStyle({fontFamily: 'Arial',fontSize: app.screen.height / 8 * 0.85,fontWeight: 'bold',fill: 'transparent',stroke: 'black',strokeThickness: 1,});

		// --- define arrays

		const texts = [];
		const textposdefaultx = [];
		const textposdefaulty = [];
		const textcontent = ["TANG","タン","THIEN","ティーン","VU","ヴ"];
		const textposy = [1,2,3];
		const textstyle = [stlfore,stlback];

		// --- applying text to array

		for (let i = 0; i < 10; i++){
			var text = new PIXI.Text(textcontent[i],textstyle[i%2]);
			text.x = app.screen.width / 2;
			if (i % 2 == 0){
				if (i % 4 == 0){text.anchor.set(1,0.5);} else {text.anchor.set(0,0.5);}
				text.y = app.screen.height / 10 * textposy[i/2] + app.screen.height / 3;
				textfore.addChild(text);
			} else {
				if ((i-1)%4 == 0){text.anchor.set(0,0.5);} else {text.anchor.set(1,0.5);}
				text.y = app.screen.height / 10 * textposy[(i-1)/2] + app.screen.height / 3;
				textback.addChild(text);
			}
			textposdefaultx.push(text.x);
			textposdefaulty.push(text.y);
			texts.push(text);
		};

		// --- Shapes

		const bgshape = new PIXI.Graphics();
		bgshape.x = app.screen.width / 2;
		bgshape.y = app.screen.height / 2;

		bgshape.lineStyle(1, 0x000000, 1);
		bgshape.moveTo(0, -app.screen.height / 4 - 75);
		bgshape.lineTo(app.screen.height / 4 + 75, 0);
		bgshape.lineTo(0, app.screen.height / 4 + 75);
		bgshape.lineTo(-app.screen.height / 4 - 75, 0);
		bgshape.closePath();
		bgshape.endFill();

		bgshape.lineStyle(0);
		bgshape.beginFill(0xdfe33f);
		bgshape.drawRect(0,-app.screen.height / 4,app.screen.height / 4,app.screen.height / 2);
		bgshape.endFill();

		const frshape = new PIXI.Graphics();
		frshape.x = app.screen.width / 2;
		frshape.y = app.screen.height / 2;

		frshape.lineStyle(0);
		frshape.beginFill(0xA81576);
		frshape.moveTo(0, app.screen.height / 4);
		frshape.lineTo(-app.screen.height / 4, app.screen.height / 4);
		frshape.lineTo(-app.screen.height / 4, 0);
		frshape.closePath();
		frshape.endFill();

		frshape.lineStyle(1, 0x000000, 1);
		frshape.moveTo(0, -app.screen.height / 4 - 75);
		frshape.lineTo(-app.screen.height / 4 - 75, 0);
		frshape.lineTo(0, app.screen.height / 4 + 75);
		frshape.endFill();

		background.addChild(bgshape);
		foreground.addChild(frshape);

		// Button

		const selectBtn = new PIXI.Graphics();

		selectBtn.x = app.screen.width / 2;
		selectBtn.y = app.screen.height / 2;

		selectBtn.beginFill(0x000000, 0.1);
		selectBtn.moveTo(0, -app.screen.height / 4 - 60);
		selectBtn.lineTo(app.screen.height / 4 + 60, 0);
		selectBtn.lineTo(0, app.screen.height / 4 + 60);
		selectBtn.lineTo(-app.screen.height / 4 - 60, 0);
		selectBtn.closePath();
		selectBtn.endFill();
		selectBtn.scale = 0;

		app.stage.addChild(selectBtn);

		// Animated 

		var mousePosition = app.renderer.plugins.interaction.mouse.global;

		app.ticker.add(() => {
			let coordx = mousePosition.x - app.screen.width / 2 ;
			let coordy = mousePosition.y - app.screen.height / 2 ;
			let dvct = Math.sqrt(Math.pow(Math.abs(coordx), 2) + Math.pow(Math.abs(coordy), 2));
			let scrnvct = Math.sqrt(Math.pow(app.screen.width / 2, 2) + Math.pow(app.screen.height / 2, 2));
			let dratiox = coordx / app.screen.width * 2;
			let dratioy = coordy / app.screen.height * 2;
			let dvctratio = dvct / scrnvct;

			if (Math.abs(mousePosition.x) > app.screen.width && Math.abs(mousePosition.y) > app.screen.height){
				textfore.x = 0;
				textfore.y = 0;
				textback.x = 0;
				textback.y = 0;
			}

			else{

			textfore.x = dratiox * 25;
			textfore.y = dratioy * 25;
			textback.x = dratiox * -25;
			textback.y = dratioy * -25;}


			let textoffsety = [-2,-2,-1,-1,0,0,1,1,2,2]
			let textoffsetx = [-1,1,2,-2,-4,4,2,-2,-1,1]

			for (let i = 0; i < 10; i++){

			if (dvctratio < 0.25){
				gsap.to(texts[i], 0.25, {pixi:{y: textposdefaulty[i] + textoffsety[i] * 40, x: textposdefaultx[i] + textoffsetx[i] * 40}});
				gsap.to(selectBtn, 2, {pixi:{scale: 1, transparent: 1}});
				gsap.to("#myCTA",0.25,{css:{}});
			}

			else {
				gsap.to(texts[i], 0.2, {pixi:{y: textposdefaulty[i], x: textposdefaultx[i]}});;
				gsap.to(selectBtn, 2, {pixi:{scale: 0}});
		}
				}})