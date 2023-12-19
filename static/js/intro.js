// intro.js dashboard intructions
$(".intro").on("click", function startIntro(){

    // stop reset link being pushed out of position by info.js message box
    $(".reset").css({right:"2rem", top: ".2rem"});

    var intro = introJs();
        intro.setOptions({
        steps: [
            {
                element: '#population',
                intro: "This Showes the Population of Employment Ages (16-64) in UK"
            },
            {
            element: '#born-abroad',
            intro: "This Shows the Number of Employed People as Both UK Born and Born Abroad"
            },
            {
            element: '#avg-house-prc',
            intro: "Filter here for your own sector",
            position: 'auto'
            },
            {
            element: '#avg-pay',
            intro: "Filter by your Level of Education",
            position: 'auto'
            },
            {
                element: '#migrant-by-birth',
                intro: 'This Bar Chart shows the distribution of emplyment sectors for UK Born and Born Abroad,  Click on it for filtering the data according to your own Sector.'
            },
            {
                element: '#gender-pay',
                intro: 'This Spider chart shows the distribution of emplyment occupation for UK Born and Born Abroad. Click on it for filtering the data according to your own occupation.'
            },
            {
                element: '#obesity',
                intro: 'This Line chart shows the relation between the Level of education and the number of People employed. Click on it for filtering the data according to your level of education.'
            },
            {
                element: '#avg-house',
                intro: 'This pie chart shows the propotion of self-employeed against the employees in the filterd data. Click on it for filtering the data according to your own intrests.'
            },
            {
                element: '#crimes',
                intro: 'This Map shows the region of UK and the job density on each region. Click on it for filtering the data according to your own intrests.'
            },
            {
            element: '.fa-info-circle',
            intro: 'The info button will provide some background about the project'
            },
            {
            element: '.fa-question-circle',
            intro: 'The question button will take you through these steps again.'
            },
            {
            intro: 'This completes the tour'
            }
        ]
        });

    // Set reset link back in normal position after info.js message box has gone 
        intro.onexit(function() {
            $(".reset").css({right:"2rem", top: "8.5rem"});
          });

        intro.start();        
});
