(function () {
    var margin = { top: 0, left: 0, right: 0, bottom: 0 },
        height = 800 - margin.top - margin.bottom,
        width = 1200 - margin.left - margin.right;

    // creating the svg container for the map
    var svg = d3.select("#map")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // tool tip setup for displaying details on click
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "10px")
        .style("display", "none");
    
    // for search bar to work we need to globaly define states
    let states;

    // loading json and shooting csv data
    d3.queue()
        .defer(d3.json, "us.json") 
        .defer(d3.csv, "updated_with_coordinates.csv")
        .await(ready);


    // define the map projection
    var projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2])
        .scale(1500);

    // define path generator using the projection above
    var path = d3.geoPath().projection(projection);

    // created constants to map the json id to the state names 
    const fipsToState = {
        "01": "Alabama",
        "02": "Alaska",
        "04": "Arizona",
        "05": "Arkansas",
        "06": "California",
        "08": "Colorado",
        "09": "Connecticut",
        "10": "Delaware",
        "11": "District of Columbia",
        "12": "Florida",
        "13": "Georgia",
        "15": "Hawaii",
        "16": "Idaho",
        "17": "Illinois",
        "18": "Indiana",
        "19": "Iowa",
        "20": "Kansas",
        "21": "Kentucky",
        "22": "Louisiana",
        "23": "Maine",
        "24": "Maryland",
        "25": "Massachusetts",
        "26": "Michigan",
        "27": "Minnesota",
        "28": "Mississippi",
        "29": "Missouri",
        "30": "Montana",
        "31": "Nebraska",
        "32": "Nevada",
        "33": "New Hampshire",
        "34": "New Jersey",
        "35": "New Mexico",
        "36": "New York",
        "37": "North Carolina",
        "38": "North Dakota",
        "39": "Ohio",
        "40": "Oklahoma",
        "41": "Oregon",
        "42": "Pennsylvania",
        "44": "Rhode Island",
        "45": "South Carolina",
        "46": "South Dakota",
        "47": "Tennessee",
        "48": "Texas",
        "49": "Utah",
        "50": "Vermont",
        "51": "Virginia",
        "53": "Washington",
        "54": "West Virginia",
        "55": "Wisconsin",
        "56": "Wyoming",
        "72": "Puerto Rico",
        "78": "U.S. Virgin Islands"
    };

    // created constants for the state names to their abbreviations to map abbreviations 
    const stateAbbreviations = {
        "Alabama": "AL",
        "Alaska": "AK",
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "District of Columbia": "DC",
        "Florida": "FL",
        "Georgia": "GA",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Pennsylvania": "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virginia": "VA",
        "Washington": "WA",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY",
        "Puerto Rico": "PR",
        "U.S. Virgin Islands": "VI"
    };
    
    // funciton for handling our data
    function ready(error, data, massShootings) {
        if (error) throw error;

        // conver json data for counties and states
        var counties = topojson.feature(data, data.objects.counties).features;
        states = topojson.feature(data, data.objects.states).features;

        // loop over states to map names
        states.forEach(state => {
            const stateName = fipsToState[String(state.id).padStart(2, "0")];
        });


        // process shooting data with meaningful names
        var massShootings = massShootings.map(row => ({
            IncidentID: row["Incident ID"],
            IncidentDate: row["Incident Date"],
            State: row["State"],
            CityCounty: row["City Or County"],
            Address: row["Address"],
            VictimsKilled: +row["Victims Killed"],
            VictimsInjured: +row["Victims Injured"],
            SuspectsKilled: +row["Suspects Killed"],
            SuspectsInjured: +row["Suspects Injured"],
            SuspectsArrested: +row["Suspects Arrested"],
            Latitude: +row["Latitude"],
            Longitude: +row["Longitude"],
            CoordinatesFound: row["Coordinates_Found"]
        }));

        // getting count for shootings per state
        var stateCounts = d3.nest()
            .key(d => d.State)
            .rollup(v => v.length)
            .map(massShootings);

        // cleaing state counts since they had a $ in front of each state name
        var cleanStateCounts = {};
        Object.keys(stateCounts).forEach(state => {
            cleanStateCounts[state.replace(/^\$/, "")] = stateCounts[state];
        });

        // defining color scale, using a green scale from colorbrew
        var colorScale = d3.scaleThreshold()
            .domain([0, 6, 12, 18, 24, 32]) // Bin thresholds, max is 32
            .range(["#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#2ca25f", "#006d2c"]);

        // render the counties to aid visualization of states
        svg.selectAll(".county")
            .data(counties)
            .enter().append("path")
            .attr("class", "county")
            .attr("d", path)
            .attr("fill", "#e3e3e3")
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5);

        //render the states on the map
        svg.selectAll(".state")
            .data(states)
            .enter().append("path")
            .attr("class", "state")
            .attr("d", path)
            .attr("fill", function (d) {
                const stateName = fipsToState[String(d.id).padStart(2, "0")];
                const count = cleanStateCounts[stateName] || 0;
                return count > 0 ? colorScale(count) : "#e3e3e3";
            })
            .attr("opacity", 0.7)
            .attr("stroke", "#333")
            .attr("stroke-width", 1.5);

        // constants for the legend height and width
        const legendWidth = 200;
        const legendHeight = 300;
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${20}, ${20})`);
        
        // getting data for the legend
        var legendData = colorScale.range().map((color, i) => {
            return {
                color: color,
                label: i === 0
                    ? `< ${colorScale.domain()[i]}`
                    : `${colorScale.domain()[i - 1]} - ${colorScale.domain()[i] || "+"}`
            };
        });

        // title of legend
        legend.append("text")
            .attr("x", 0) 
            .attr("y", -10) 
            .text("Number of Shootings")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .style("fill", "#333");

        // adding color boxes for the legend
        legend.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("x", 0)
            .attr("y", (d, i) => i * 25)
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", d => d.color);

        // creating text labels for legend
        legend.selectAll("text.legend-label")
            .data(legendData)
            .enter().append("text")
            .attr("class", "legend-label")
            .attr("x", 30)
            .attr("y", (d, i) => i * 25 + 15)
            .text(d => d.label)
            .style("font-size", "12px")
            .style("fill", "#333");


        // used to highlight each incident when clicked 
        d3.select("body").on("click", function () {
            tooltip.style("display", "none");
            svg.selectAll(".massShooting").attr("fill", "red");
        });
        
        // creating the labels for each state from my constant state abbreviations 
        svg.selectAll(".state-label")
            .data(states)
            .enter()
            .append("text")
            .attr("class", "state-label")
            .attr("x", d => {
                const centroid = path.centroid(d);
                return centroid[0];
            })
            .attr("y", d => {
                const centroid = path.centroid(d);
                return centroid[1];
            })
            .text(d => {
                const stateName = fipsToState[String(d.id).padStart(2, "0")];
                return stateAbbreviations[stateName] || ""; // Use abbreviations or fallback to empty string
            })
            .attr("font-size", "10px") 
            .attr("text-anchor", "middle")
            .attr("fill", "#333"); 

        // drawing the points of each mass shooting 
        svg.selectAll(".massShooting")
            .data(massShootings)
            .enter().append("circle")
            .attr("class", "massShooting")
            .attr("r", 3)
            .attr("fill", "red")
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .attr("cx", function (d) {
                var coords = projection([d.Longitude, d.Latitude]);
                return coords ? coords[0] : null;
            })
            .attr("cy", function (d) {
                var coords = projection([d.Longitude, d.Latitude]);
                return coords ? coords[1] : null;
            })
            .on("click", function (event) {
                d3.event.stopPropagation();
                const d = this.__data__;

                svg.selectAll(".massShooting").attr("fill", "red");

                d3.select(this).attr("fill", "blue");

                tooltip.style("display", "block")
                    .style("left", (event.pageX + 15) + "px")
                    .style("top", (event.pageY - 15) + "px")
                    .html(`
                        <h3>Mass Shooting Details</h3>
                        <strong>Incident ID:</strong> ${d.IncidentID}<br>
                        <strong>Date:</strong> ${d.IncidentDate}<br>
                        <strong>State:</strong> ${d.State}<br>
                        <strong>City/County:</strong> ${d.CityCounty}<br>
                        <strong>Victims Killed:</strong> ${d.VictimsKilled}<br>
                        <strong>Victims Injured:</strong> ${d.VictimsInjured}<br>
                        <strong>Suspects Killed:</strong> ${d.SuspectsKilled}<br>
                        <strong>Suspects Injured:</strong> ${d.SuspectsInjured}<br>
                        <strong>Suspects Arrested:</strong> ${d.SuspectsArrested}
                    `);
            });
    }

    // getting search button to work by state abbreviation instead of state name 
    document.getElementById("searchButton").addEventListener("click", function () {
        const searchAbbreviation = document.getElementById("stateSearch").value.trim().toUpperCase();
    
        // Reset functionality when typing "reset"
        if (searchAbbreviation === "RESET") {
            resetZoom();
            return;
        }
    
        // Get the state name from the abbreviation
        const stateName = Object.keys(stateAbbreviations).find(
            key => stateAbbreviations[key] === searchAbbreviation
        );
    
        if (!stateName) {
            alert("Invalid state abbreviation. Please try again.");
            return;
        }
    
        // Find the target state using the state name
        const targetState = states.find(state => {
            const name = fipsToState[String(state.id).padStart(2, "0")];
            return name === stateName;
        });
    
        if (!targetState) {
            alert("State not found. Please check the abbreviation and try again.");
            return;
        }

        // Zoom into the selected state
        const bounds = path.bounds(targetState);
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;
        const scale = Math.min(8, 0.9 / Math.max(dx / width, dy / height));
        const translate = [width / 2 - scale * x, height / 2 - scale * y];
    
        svg.transition()
            .duration(750)
            .attr("transform", `translate(${translate})scale(${scale})`);
    
        svg.selectAll(".massShooting")
            .attr("display", d => d.State === stateName ? "block" : "none");
    });
    
    // Reset zoom function (refreshes the page)
    function resetZoom() {
        location.reload(); // Refresh the page
    }    
})();