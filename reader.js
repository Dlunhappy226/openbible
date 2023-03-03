//EReader
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const book = urlParams.get("b");

if (book == null || book == "") {
    visit = localStorage.getItem("history");
    if (visit) {
        location.href = visit
    }else{
        location.href = "?b=1"
    }
}else{
    $.getJSON("bible/t_kjv.json", (data) => {
        const startTime = Date.now();
        $("#reader").html("");
        $.each(data.resultset.row, (key, x) => {
            if (x.field[1] == book){
                const verse = x.field[2]+":"+x.field[3];
                $("#reader").append("<p id='"+verse+"'><a href='#"+verse+"'>"+"["+verse+"]</a> "+x.field[4]+"</p>");
            }
        });
        if (window.location.hash != ""){
            window.location = window.location.hash;
        }
        localStorage.setItem("history", location.search + location.hash)
        console.log("Done loading ("+(Date.now()-startTime)+" ms)")
    });
}



//Book chooser
$.getJSON("bible/key_english.json", (data) => {
    var ot = true;
    $.each(data.resultset.keys, (key, x) => { 
        if (x.t == "NT" && ot) {
            $("#booksList").append("<li><hr class='dropdown-divider'></li>");
            ot = false;
        }
         $("#booksList").append("<li'><a href='?b="+x.b+"'class='dropdown-item' >"+x.n+"<a/></li>");
    });
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
}

window.addEventListener("popstate", (event) => { 
    localStorage.setItem("history", location.search + location.hash)
});