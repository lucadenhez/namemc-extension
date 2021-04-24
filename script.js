console.log("[NameMC Extension] Detected profile page, waiting for load of DOM elements...")

var i = 0;

var t = setInterval(function () {
    var group = document.getElementsByClassName("card-body py-1");
    if (group.length > 0) { 
        clearInterval(t);
        console.log("[NameMC Extension] Found grouping box!");
        var username = document.getElementsByTagName('h1');

        if (username.length > 0) {
            username = document.getElementsByTagName('h1')[0].innerHTML;

            console.log("[NameMC Extension] Found username: " + username);
            console.log("[NameMC Extension] Getting creation date...");
    
            var viewsElement = document.getElementsByClassName("row no-gutters")[4];
            var clonedElement = viewsElement.cloneNode(true);
            document.getElementsByClassName("card-body py-1")[0].appendChild(clonedElement);
            viewsElement.innerHTML = "<strong>Creation Date<strong>";
            var viewsElement2 = document.getElementsByClassName("col-auto")[3];
            var clonedElement2 = viewsElement2.cloneNode(true);
            viewsElement.appendChild(clonedElement2);
            clonedElement2.style.marginRight = "1000px";

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var rjson = JSON.parse(xhr.responseText);
                    var date = rjson.created_at;
                    if (date != null) {
                        clonedElement2.innerHTML = date;
                    }
                    else {
                        clonedElement2.innerHTML = "Not Available";
                    }
                    
                }
                else if (this.readyState == 4 && this.status != 200) {
                    console.log("[NameMC Extension] Couldn't find date.");
                    clonedElement2.innerHTML = "Not Available";
                }
            };
            xhr.open("GET", "https://api.ashcon.app/mojang/v2/user/" + username, true);
            xhr.send();
        }
        else {
            console.log("[NameMC Extension] Couldn't find username. ");
            clonedElement2.innerHTML = "Not Available";
        }
    }
    else {
        i++;
        console.log("[NameMC Extension] [" + i.toString() + "] Can't find grouping box. Retrying...");
    }
  }, 100);
