/* 
 Bernard Williams

 */

var matches = [];
var currentUser = {};

$(document).ready(function () {

    //Submit survey data to back end

    //Find potential matches

//Todo finish this code

    function getMatches(sex) {

        var url = "/api/get_matches?gender=" + sex;

        $.ajax({
            url: url,
            method: 'GET',
        })
            .done(function (response) {
                console.log(response);

                //Clear the main screen
                $('#topMatches').empty();
                matches.length = 0;

                for (var i = 0; i < response.length; i++) {
                    var match = {};
                    match.index = i;
                    match.id = response[i].number;
                    match.fullName = response[i].title + " " + response[i].givenname + " " + response[i].surname;
                    match.age = response[i].age;
                    match.city = response[i].city;
                    match.questions = [];
                    match.questions[0] = response[i].q1;
                    match.questions[1] = response[i].q2;
                    match.questions[2] = response[i].q3;
                    match.questions[3] = response[i].q4;
                    match.questions[4] = response[i].q5;
                    match.questions[5] = response[i].q6;
                    match.questions[6] = response[i].q7;
                    match.questions[7] = response[i].q8;
                    match.questions[8] = response[i].q9;
                    match.questions[9] = response[i].q10;
                    match.image = response[i].image;
                    matches.push(match);
                    matches[i].compatability = calcCompatability(i);
                    matches[i].rank = ((matches[i].compatability/50) * 100)
                }

                //sort the matches array
                matches.sort(function(a,b){
                    return parseInt(b.compatability) - parseInt(a.compatability);
                });

                //Once the document is loaded check the config file and add a media object for each player in the config file
                for (var index = 0; index < matches.length; index++) {
                    var match = matches[index];
                    //console.log("------------------------------------");
                    //console.log(match);

                    //Create a new media object for each character in the config file
                    var newMatchElement = $("<div>");
                    newMatchElement.addClass("media player");
                    newMatchElement.attr("id", matches[index].id);

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
                    newMediaHeading.text(matches[index].fullName);
                    var hpLabel = $("<span id='hpbadge'>");
                    hpLabel.addClass("badge healthPoints badge-success");
                    hpLabel.text('Age: ' + matches[index].age);
                    newMediaHeading.append(hpLabel);

                    var newMediaText = $("<p>");
                    newMediaText.html("City: " + matches[index].city + " <br/>Compatibility Ranking: " + matches[index].rank + "%");

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

    //This function uses the currently populated match array
    function calcCompatability(potentialMatchIndex) {

        //loop through each potential match and calculate the variation between questions
        //Order the potential matches by total variation descending

        totVariance = 0;
        for (var i = 0; i < currentUser.questions.length; i++) {
            totVariance += Math.abs(currentUser.questions[i] - matches[potentialMatchIndex].questions[i]);
        }
        return totVariance;
    }

    $('#submitSurvey').on('click', function () {
        event.preventDefault();
        console.log('Saving the survey data');
        //store the survey data locally
        currentUser.name = $('#userName').val().trim();
        currentUser.genderInterest = $('#genderInterest').val().trim();
        currentUser.questions = [];
        currentUser.questions[0] = parseInt($('#q1').val());
        currentUser.questions[1] = parseInt($('#q2').val());
        currentUser.questions[2] = parseInt($('#q3').val());
        currentUser.questions[3] = parseInt($('#q4').val());
        currentUser.questions[4] = parseInt($('#q5').val());
        currentUser.questions[5] = parseInt($('#q6').val());
        currentUser.questions[6] = parseInt($('#q7').val());
        currentUser.questions[7] = parseInt($('#q8').val());
        currentUser.questions[8] = parseInt($('#q9').val());
        currentUser.questions[9] = parseInt($('#q10').val());
        $('#myModal .close').click();
        console.log(currentUser);

    });

    $('#findMatches').on('click', function () {
        event.preventDefault();
        console.log("------- Gender Interest = " + $('#genderInterest').val());
        getMatches($('#genderInterest').val());
    });

    //This function checks the value selected and sets it to 3 if left blank
    function validateSurveyItem(itemVal) {
        //todo Add code here
    }
});

