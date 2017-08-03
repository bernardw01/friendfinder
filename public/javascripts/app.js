/* 
 Bernard Williams

 */

var trainSched = [];

$(document).ready(function () {

    //Submit survey data to back end

    //Find potential matches

//Todo finish this code

    function getMatches(sex) {

        var url = "/api/get_matches?gender=" + sex;

        return $.ajax({
            url: url,
            method: 'GET',
        }).done(function (response) {
            console.log(response.response);
        });

    }
    $('#submitSurvey').on('click', function(){
        console.log('I have been selected');
        getMatches('female');
    })


});

