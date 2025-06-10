//jsondata  link:https://data.cityofnewyork.us/resource/jb7j-dtam.json

let data, json;

async function init(genCharts = false) {
    data = await fetch("https://data.cityofnewyork.us/resource/jb7j-dtam.json");
    json = await data.json();

    if (genCharts == true) {
        generateCharts();
    }
}

function filterdata() {
    let build = "";
    let query = document.getElementById("search").value;
    let output = document.getElementById("output");

    for (let i = 0; i < json.length; i++) {
       let death = json[i];
       let title = `${death.leading_cause} - ${death.year}`

       if (title.toLowerCase().includes(query.toLowerCase())) {
        build += `
        <div class="card">
        <h1>${title}</h1>
        <h2>Deaths: ${death.deaths}</h2>
        <p>Gender: ${death.sex}</p>
        <p>Race: ${death.race_ethnicity}</p>
        <p>Death Rate: ${death.death_rate}</p>
        <p>Age Adjusted: ${death.age_adjusted_death_rate}</p>
        </div>
        `
       }
    }

    output.innerHTML = build;
}

function generateCharts() {
    let y2007 = y2008 = y2009 = y2010 = y2011 = y2012 = y2013 = y2014 = 0;
    let male = female = 0;
    let black = white = asian = hispanic = other = unknown = 0;

    for (let i = 0; i < json.length; i++) {
        let death = json[i];
        
        if (death.year == 2007) {
            y2007 += 1
        } else if (death.year == 2008) {
            y2008 += 1
        } else if (death.year == 2009) {
            y2009 += 1
        } else if (death.year == 2010) {
            y2010 += 1
        } else if (death.year == 2011) {
            y2011 += 1
        } else if (death.year == 2012) {
            y2012 += 1
        } else if (death.year == 2013) {
            y2013 += 1
        } else if (death.year == 2014) {
            y2014 += 1
        } 

        if(death.sex == "M") {
            male += 1;
        } else {
            female += 1;
        }

        if (death.race_ethnicity == "Black Non-Hispanic") {
            black += 1;
        } else if (death.race_ethnicity == "White Non-Hispanic") {
            white += 1;
        } else if (death.race_ethnicity == "Asian and Pacific Islander") {
            asian += 1;
        } else if (death.race_ethnicity == "Hispanic") {
            hispanic += 1;
        } else if (death.race_ethnicity == "Not Stated/Unknown") {
            unknown += 1;
        } else {
            other += 1;
        }

    }

    let yearData = [
        ["2007", y2007],
        ["2008", y2008],
        ["2009", y2009],
        ["2010", y2010],
        ["2011", y2011],
        ["2012", y2012],
        ["2013", y2013],
        ["2014", y2014],
    ];

    let gendData = [
        ["Male", male],
        ["Female", female],
    ];

    let raceData = [
        ["Black", black],
        ["White", white],
        ["Asian", asian],
        ["Latino", hispanic],
        ["Unknown", unknown],
        ["Other Races", other]
    ]


    displayChart(yearData, "yearChart", "pie")
    displayChart(gendData, "gendChart", "pie")
    displayChart(raceData, "raceChart", "pie")
}