$(function(){
	var wrapper = $(".title-wrapper").first();
	$(".menu > .item").each(function(index, element){
		if (! $(element).attr("href")){
			var name = $(element).text().toLowerCase();
			var corresponding = $("#"+name+"-wrapper");
			var lines = $("#"+name+"-lines");
			$(element).click(function(){
				if ($(element).hasClass("selected")){
					$(element).removeClass("selected");
					$(lines).removeClass("selected");
					$(corresponding).removeClass("selected");
					$(wrapper).removeClass("menu-open").addClass("menu-opened");
				} else if ($(wrapper).hasClass("menu-open")){
					$(".selected").removeClass("selected");
					$(element).addClass("selected");
					$(lines).addClass("selected");
					$(corresponding).addClass("selected");
				} else {
					$(element).addClass("selected");
					$(lines).addClass("selected");
					$(corresponding).addClass("selected");
					$(wrapper).addClass("menu-open");
				}
			});
		}
	});
});
