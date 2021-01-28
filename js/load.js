gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(TextPlugin);

function myScrollTo(myTarget){
	gsap.to(window, {duration: 1.5, scrollTo: myTarget, ease: "power2.inOut"});
	console.log("abc")
};

gsap.to("#myBgTxtBio", {
	scrollTrigger: {
		trigger: "#myBio",
		scrub: "true",
	},
	x: "-200%",
	ease: "none",
});

gsap.from("#myBackgroundSub", {
	scrollTrigger: {
		trigger: "#myBio",
		scrub: "true",
		end: "0%",
	},
	x: "-100%",
	duration: 1,
	ease: "none",
});

gsap.from("#myBackgroundSub2", {
	scrollTrigger: {
		trigger: "#mySakuhin",
		scrub: "true",
		end: "0%",
	},
	x: "-100%",
	duration: 1,
	ease: "none",
});

document.addEventListener('DOMContentLoaded', function(event) {
	setTimeout( function(){ // wait 1s, then change URL
		gsap.to("body",{opacity: 1, duration: 0.25, ease: Power1.out})
		gsap.from("#mySakuhinImg",{scale: 1, duration: 1.5, ease: Power1.out})
		gsap.from("#myLogo",{scale: 1, duration: 1, ease: Power1.out})
		gsap.from("#myNameL",{x: '10%', duration: 1, ease: Power1.out})
		gsap.from("#myNameR",{x: '-10%', duration: 1, ease: Power1.out})
	}, 500)
});

function link(href){
	gsap.to($("body *:not(#mySakuhinImg)"),{opacity: 0, duration: 0.5, ease: Power1.out})
	gsap.to("#mySakuhinImg",{scale: 1, duration: 1, ease: Power1.out})
	setTimeout( function(){ // wait 1s, then change URL
		document.location = href;
	}, 500)
}