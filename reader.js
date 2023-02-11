//EReader
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const book = urlParams.get("b")

if (book == null || book == ""){
    window.location.href = "?b=1"
}



//Book chooser
$.getJSON("bible/key_english.json", (data) => {
    $.each(data.resultset.keys, (key, x) => { 
         $("#booksList").append("<li class='list-group-item'><a href='?b="+x.b+"'>"+x.n+"<a/></li>");
    });
});