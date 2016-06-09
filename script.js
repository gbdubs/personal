$(function(){
	var wrapper = $(".title-wrapper").first();
	$(".menu > .item").each(function(index, element){
		if ($(element).attr("href")){

		} else {
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

$(function(){
        function reachedTheTop(element){
          return $(element).hasClass(".dm-wrapper") || $(element).prop("tagName") == "HTML";
        }

        function generalRecursiveFind(lookingFor, defaultResult){
          var thisFun = function (element){
            if (element.className){
              var index = element.className.indexOf(lookingFor);
              if (index == -1){
                if (reachedTheTop(element)){
                  return defaultResult;
                } else {
                  return thisFun($(element).parent()[0]);
                }
              } else {
                var first = index + lookingFor.length;
                var cName = element.className;
                var last = cName.indexOf(" ", first);
                if (last == -1){
                  last = cName.length;
                }
                return cName.substring(first, last);
              }
            } else {
              if (reachedTheTop(element)){
                return defaultResult;
              } else {
                return thisFun($(element).parent()[0]);
              }
            }
          }
          return thisFun;
        }

        
        var findRotationDirection = function(element){
          var cname = element.className;
          if (cname.indexOf("dm-ccw-") >= 0){
            return "ccw";
          } else if (cname.indexOf("dm-cw-") >= 0){
            return "cw";
          }
          return "NONE";
        }

        var findEdges = function (element){
          var cname = element.className;
          var root = "dm-"+findRotationDirection(element)+"-";
          var start = cname.indexOf(root) + root.length
          var end = cname.indexOf(" ", start);
          if (end == -1){
            end = cname.length;
          }
          return cname.substring(start, end);
        }

        var findBorderWidth = generalRecursiveFind("dm-border-width-", "1");
        var findBorderStyle = generalRecursiveFind("dm-border-style-", "solid");
        var findBorderColor = generalRecursiveFind("dm-border-color-", "black");
        var findDelay = generalRecursiveFind("dm-delay-", "0-00");
        var findDuration = generalRecursiveFind("dm-duration-", "1-00");
        var findAnimationTiming = generalRecursiveFind("dm-animation-timing-", "linear");
        var findFade = generalRecursiveFind("dm-fade-", "transparent-transparent-transparent-black");

        var allData = "";
        $(".dm").each(function(index, element){
          var rotationDirection = findRotationDirection(element);
          var edges = findEdges(element);
          var borderWidth = findBorderWidth(element);
          var borderStyle = findBorderStyle(element);
          var borderColor = findBorderColor(element);
          var delay = findDelay(element).replace("-","");
          var duration = findDuration(element).replace("-","");
          var animationTiming = findAnimationTiming(element);
          var fade = findFade(element);
          var shouldFade = 1;
          if (fade == "none"){
            shouldFade = 0;
          }
          fade = fade.replace(/-/g," ");

          var elementSummaryString = rotationDirection+" "+edges+" "+borderWidth+
            " "+borderStyle+" "+borderColor+" "+delay+" "+duration+
            " "+animationTiming+" "+fade+" "+shouldFade;
          console.log(elementSummaryString);
          allData += "\n" + elementSummaryString;
        });
        console.log(allData.substring(1));
      });