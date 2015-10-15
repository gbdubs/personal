        var SQUARE_SIZE = 100;
        var GUTTER = 10;
        var CENTER_COLOR = "red";
        
        var colors  = ["blue", "red", "green", "yellow"];
        
        function setupLoadingScreen(){
            
            window.scrollTo(0,0);
            
            // REGISTERS HOW MANY SQUARES WE WILL BE ALLOWED ACROSS.
            var width = window.innerWidth;
            var height = window.innerHeight;
            var squaresWide = Math.ceil((width - ((SQUARE_SIZE + GUTTER) / 2)) / (Math.sqrt(2) * (SQUARE_SIZE + GUTTER)));
            var squaresHigh = Math.ceil(height / (Math.sqrt(8) * (SQUARE_SIZE + GUTTER))) + 2;
            
            var bottomLeft = [0,0];
            var topLeft = [squaresHigh, squaresHigh];
            var topRight = [squaresHigh + squaresWide, squaresHigh - squaresWide];
            var bottomRight = [squaresWide, 0-squaresWide];
            console.log(bottomLeft);
            console.log(topLeft);
            console.log(topRight);
            console.log(bottomRight);
            
            var maxSquareDim = Math.max(squaresHigh, squaresWide);
            
            var middleX = Math.floor(topRight[0] / 2);
            var middleY = Math.floor(topRight[1] / 2);
            console.log(middleX + "-" + middleY);
            
            // Utility Functions
            function randomColorClass(){ return "bg-" + colors[Math.floor(colors.length * Math.random())]; }
            
            // Places a square in the appropriate grid location before roation
            function placeElementInGridLocation(x, y, element){
                element.style.cssText = "bottom:" + ((SQUARE_SIZE + GUTTER) * y) + "px;left:" + ((SQUARE_SIZE + GUTTER) * x) + "px;";
            }
            
            function createDecorativeSquareAtGridLocation(x, y, center){
                var centralSquare = document.getElementById("square-template");
                var newSquare = centralSquare.cloneNode(true);
                newSquare.className = "square opacity-0 decoration " + randomColorClass(); 
                if (center){
                    newSquare.className = "square opacity-1 decoration bg-" + CENTER_COLOR;
                    newSquare.id = "center-square";
                } else {
                    newSquare.id = "grid-"+x+"-"+y;
                }
                placeElementInGridLocation(x, y, newSquare);
                document.getElementById("square-container").appendChild(newSquare);
                return newSquare;
            }
            
            // Shuffling funciton, minimized for simplicity and concice-ness
            function shuffle(a) {var c=a.length,t,r;while(0!==c){r = Math.floor(Math.random()*c);c-=1;t=a[c];a[c]=a[r];a[r]=t;}return a;}
        
            // SQUARE INSTANTIATION
            function createSquares() {
                function calculateTriangleArea(a, b, c){
                    var dist1 = Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
                    var dist2 = Math.sqrt(Math.pow(b[0] - c[0], 2) + Math.pow(b[1] - c[1], 2));
                    var dist3 = Math.sqrt(Math.pow(c[0] - a[0], 2) + Math.pow(c[1] - a[1], 2));
                    if (dist1 == 0 || dist2 == 0 || dist3 == 0){
                        return 0;
                    } else {
                        var semiperim = (dist1 + dist2 + dist3)/2;
                        var hero = Math.max(semiperim * (semiperim - dist1) * (semiperim - dist2) * (semiperim - dist3), 0);
                        var result = .5 * Math.sqrt(hero);
                        return result;
                    }
                }
                
                var squares = [];
                for (var i = -maxSquareDim; i <= squaresHigh + squaresWide; i++){
                    for (var j = -maxSquareDim; j <= squaresHigh + squaresWide; j++){
                        var areaA = calculateTriangleArea(bottomLeft, topLeft, [i,j]);
                        var areaB = calculateTriangleArea(topLeft, topRight, [i,j]);
                        var areaC = calculateTriangleArea(topRight, bottomRight, [i,j]);
                        var areaD = calculateTriangleArea(bottomRight, bottomLeft, [i,j]);
                        var totalActual = areaA + areaB + areaC + areaD;
                        var totalExpected = squaresWide * squaresHigh;
                        if (Math.abs(totalActual - totalExpected) < 2){
                            var isCenter = (i == middleX && j == middleY);
                            var square = createDecorativeSquareAtGridLocation(i,j,isCenter);
                            squares.push(square);
                        }
                    }
                }
                return squares;
            }

            
            var squares = createSquares();
            
            window.scrollTo(0,0);
            
            var nSquares = squares.length;
            shuffle(squares);
            var nextShownSquare = 0;
            
            function showNSquares(n){
                for (var i = 0; i < n; i++){
                    var squareToChange = nextShownSquare++;
                    if (squareToChange < squares.length){
                        setTimeout(makeVisible, i * 100, squares[squareToChange]);
                    }
                }
            }
            
            var totalNumFiles = 8;
            var waitingOnNFiles = 8;

            function decrementWaitingOnFiles(executeOnFinish){
                waitingOnNFiles--;
                if (waitingOnNFiles == 0){
                    showNSquares(nSquares / totalNumFiles);
                    showNSquares(nSquares);
                    setTimeout(function(){ document.getElementById("center-square").className += " no-animation"; }, 1000);
                    setTimeout(function(){ document.getElementById("center-square").className += " expanding"; }, 2600);
                    setTimeout(function(){ setBackgroundColor(CENTER_COLOR);}, 3900);
                    setTimeout(function(){ 
                        var decoration = document.getElementById("square-container");
                        decoration.parentNode.removeChild(decoration);
                    }, 4000);
                    setTimeout(executeOnFinish, 4100);
                } else {
                    showNSquares(nSquares / totalNumFiles);
                }
            }
            
            return decrementWaitingOnFiles;
        }
        
        var runWhenFileComesIn = setupLoadingScreen();
       
        for (var i = 0; i <= 4500; i += 570){
        //for (var i = 0; i < 1000; i+= 100){
            setTimeout(runWhenFileComesIn, i, function(){
                makeVisibleById("home-screen");
            });
        }
        
        
        
        
        
        
        var screens = ["home", "about", "projects", "contact"];
        
        function getRidOfHiddenOnScreen(screenElement){
            screenElement.classList.remove("hidden");
        }
        
        function makeScreenVisible(screenElement){
            var screenName = screenElement.id.substring(0, screenElement.id.indexOf("-"));
            for (var screen in screens){
                if (screens[screen] == screenName){
                    makeVisibleById(screens[screen]+"-screen");
                } else {
                    makeInvisibleById(screens[screen]+"-screen");
                }
            }
        }
        
        function makeVisible(element){
            element.classList.remove("opacity-0");
            element.classList.remove("hidden");
            if (!element.classList.contains("opacity-1")){
                element.classList.add("opacity-1");
            }
        }
        
        function makeVisibleById(id){
            var element = document.getElementById(id);
            makeVisible(element);
        }
        
        function makeInvisibleById(id){
            var element = document.getElementById(id);
            element.classList.remove("opacity-1");
            if (!element.classList.contains("hidden")){
                element.classList.add("hidden");
            }
            if (!element.classList.contains("opacity-0")){
                element.classList.add("opacity-0");
            }
            setTimeout(function(){ element.classList.add("hidden"); }, 1000);
        }
                
        
        

        
        function setBackgroundColor(bg){
            var background = document.getElementById("body");
            for (var c in colors){
                background.classList.remove("bg-" + colors[c]);
            }
            background.classList.remove("bg-white");
            background.classList.add("bg-"+bg);
        };

        
        
    
        
        function expandOutButton(btn) {
            var clone = btn.cloneNode();
            clone.classList.add("expanding"); 
            btn.parentNode.appendChild(clone);
            
            var rect = btn.getBoundingClientRect();
            var currY = rect.top;
            var currX = rect.left;
            
            clone.style.height = "100px";
            clone.style.width = "100px";
            clone.style.top = currY + "px";
            clone.style.left = currX + "px";
            
            setTimeout(function(){
                clone.style.top = 0;
                clone.style.left = 0;
                clone.style.height = "100vh";
                clone.style.width = "100vw";
            }, 10);
            
            setTimeout(function(){
                clone.parentNode.removeChild(clone);
            }, 810);
        }
        
        function navigateFromButton(btn) {
        
            expandOutButton(btn);
            
            var newPage = document.getElementById(btn.getAttribute("data-page-link") + "-screen");
            
            var color = newPage.getAttribute("data-color");
            
            getRidOfHiddenOnScreen(newPage);
            
            setTimeout(function(){
                setBackgroundColor(color);
                window.scrollTo(0,0);
                makeScreenVisible(newPage);
            }, 810);
            
        };
        
        
        for (var from in screens){
            for (var to in screens){
                if (from != to){
                    var element = document.getElementById(screens[from] + "-" + screens[to]);
                    element.addEventListener("click", function(){ navigateFromButton(this); });
                }
            }
        }
        