//EReader
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const book = urlParams.get("b");

if (book == null || book == ""){
    window.location.href = "?b=1";
}else{
    $.getJSON("bible/t_asv.json", (data) => {
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
        console.log("Done loading ("+(Date.now()-startTime)+" ms)")
    });
}



//Book chooser
$.getJSON("bible/key_english.json", (data) => {
    $("#booksList").append("<li class='list-group-item'>Old Testament</li>");
    var ot = true;
    $.each(data.resultset.keys, (key, x) => { 
        if (x.t == "NT" && ot) {
            $("#booksList").append("<li class='list-group-item'>New Testament</li>");
            ot = false;
        }
         $("#booksList").append("<li class='list-group-item'><a href='?b="+x.b+"'>"+x.n+"<a/></li>");
    });
});