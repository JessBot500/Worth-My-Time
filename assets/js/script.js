var prevSearchObj = {
    Type: "Both",
    Genre: "Action",
    Actor: "None",
    RunningTime: 120,
    Rating: 75
}

function loadPrevSearch(){
    if(prevSearchObj.Type === "Both"){
        document.getElementById("prevType").innerHTML = "Movie / Show";
    }
    else{
        document.getElementById("prevType").innerHTML = prevSearchObj.Type;
    }
    document.getElementById("prevGenre").innerHTML = prevSearchObj.Genre;
    document.getElementById("prevActor").innerHTML = prevSearchObj.Actor;
    document.getElementById("prevTime").innerHTML = prevSearchObj.RunningTime + " mins";
    document.getElementById("prevRating").innerHTML = prevSearchObj.Rating + "%";
}

function requiredChecbox(){

    var requiredCheckboxes = $(':checkbox[required]');

    requiredCheckboxes.change(function(){

        if(requiredCheckboxes.is(':checked')) {
            requiredCheckboxes.removeAttr('required');
        }

        else {
            requiredCheckboxes.attr('required', 'required');
        }
    });
}

requiredChecbox();
loadPrevSearch();