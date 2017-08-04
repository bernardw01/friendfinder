/* 
 Bernard Williams

 */

var matches = [];

$(document).ready(function () {

    //Submit survey data to back end

    //Find potential matches

//Todo finish this code

    function getMatches(sex) {

        var url = "/api/get_matches?gender=" + sex;

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (response) {
            console.log(response);
            for (var i = 0; i<response.length; i++){
                matches.push(response[i]);
            }

            //Once the document is loaded check the config file and add a media object for each player in the config file
            for (var index = 0; index < matches.length; index++) {
                var match = matches[index];
                console.log("------------------------------------");
                console.log(match);

                //Create a new media object for each character in the config file
                var newMatchElement = $("<div>");
                newMatchElement.addClass("media player");
                newMatchElement.attr("id", matches[index].number);

                var newMediaLeft = $("<div>");
                newMediaLeft.addClass("media-left");

                var newMediaImage = $("<img>");
                newMediaImage.addClass("media-object media-image");
                newMediaImage.attr("src", "images/" + matches[index].image);

                var newMediaBody = $("<div>");
                newMediaBody.addClass("media-body");

                //Generate heading
                var newMediaHeading = $("<h5>");
                newMediaHeading.addClass("media-heading");
                newMediaHeading.text(matches[index].givenname + ' ' + matches[index].surname);
                var hpLabel = $("<span id='hpbadge'>");
                hpLabel.addClass("badge healthPoints badge-success");
                hpLabel.text('Age: ' + matches[index].age);
                newMediaHeading.append(hpLabel);

                var newMediaText = $("<p>");
                newMediaText.text(matches[index].city +', ' + matches[index].statefull );

                newMediaLeft.append(newMediaImage);
                newMediaBody.append(newMediaHeading);
                newMediaBody.append(newMediaText);
                newMatchElement.append(newMediaLeft);
                newMatchElement.append(newMediaBody);

                $("#topMatches").append(newMatchElement);

                //Put a border around the character panel
                $("#topMatches").addClass("panelBorder");

            }
        });

    }
    $('#submitSurvey').on('click', function(){
        event.preventDefault();
        console.log('I have been selected');
        getMatches('female');
        
        
    })


});

