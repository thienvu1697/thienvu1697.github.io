var sakuhinThumbnail = $(".ourSakuhinThumbnail");
sakuhinThumbnail.css("height", sakuhinThumbnail.width());

$(function() {
	$('.ourSakuhinThumbnail')
		.mouseover(function(e) {
			gsap.to($(this), 0.5, {background: "rgba(0,0,0,0.8)", color: "#fff"});
			gsap.to($("#mySakuhinImg div"), 0.2, {opacity: "1", height: "100%"});
			var imgurl = $(this).children(".sakuhinImg").text();
			$("#mySakuhinImg div").css("background-image",imgurl);
		})
		.mouseleave(function(e) {
			gsap.to($(this), 0.5, {background: "none", color: "#000"});
			gsap.to($("#mySakuhinImg div"), 0.2, {opacity: "0.5", height: "0"})
			$("#mySakuhinImg div").css("background-image","");
		});
});