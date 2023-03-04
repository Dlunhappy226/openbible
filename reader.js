//EReader
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const book = urlParams.get("b");

if (book == null || book == "") {
    const visit = localStorage.getItem("history");
    if (visit) {
        location.href = visit;
    }else{
        location.href = "?b=1";
    }
}else{
    $.getJSON("bible/t_kjv.json", (data) => {
        const startTime = Date.now();
        $("#reader").html("");
        $.each(data.resultset.row, (key, x) => {
            if (x.field[1] == book){
                const verse = x.field[2] + ":" + x.field[3];
                $("#reader").append("<p id='" + verse + "'><a href='#" + verse+"'>" + "[" + verse + "]</a> " + x.field[4] + "</p>");
            }
        });
        if (window.location.hash != ""){
            window.location = window.location.hash;
        }
        localStorage.setItem("history", location.search + location.hash);
        console.log("Done loading (" + (Date.now()-startTime) + " ms)");
    });
}



//Book chooser
$.getJSON("bible/key_english.json", (data) => {
    var ot = true;
    $("#booksList").append("<li><a class='dropdown-item disabled'>Old Testament<a/></li>");
    $.each(data.resultset.keys, (key, x) => { 
        if (x.t == "NT" && ot) {
            $("#booksList").append("<li><hr class='dropdown-divider'></li>");
            $("#booksList").append("<li><a class='dropdown-item disabled'>New Testament<a/></li>");
            ot = false;
        }
        if(book == x.b) {
            $("#booksSelect").html(x.n)
            $("#booksList").append("<li><a href='?b=" + x.b + "' class='dropdown-item active'>" + x.n + "<a/></li>");
        }else{
            $("#booksList").append("<li><a href='?b=" + x.b + "' class='dropdown-item'>" + x.n + "<a/></li>");
        }
    });
});


//Service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}


//History record
window.addEventListener("popstate", (event) => { 
    localStorage.setItem("history", location.search + location.hash);
});


//Back to top button
$("#top").click(event => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    localStorage.setItem("history", location.search);
});

window.addEventListener("scroll", event => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $("#top").css("display", "block");
    } else {
        $("#top").css("display", "none");
    }
});

//Install button
let deferredPrompt;

window.addEventListener("beforeinstallprompt", event => {
    deferredPrompt = event
    if (!$("#install").length){
        $("#github").after("&emsp;<a href='javascript:installPWA();' id='install'>Install</a>");
    }
});

async function installPWA() {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            deferredPrompt = null;
        }
    }
}
