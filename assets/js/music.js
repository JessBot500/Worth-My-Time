// lastfm API
var apiKey = "79fdfd2b7dc1438e52917deee02db68d"

var getAlbums = function(album) {
    var apiUrl = "http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + album + "&api_key=" + apiKey + "&format=json";
    
    fetch(apiUrl).then(function(response) {
        // request successful 
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        }
    })
}

getAlbums("frozen");