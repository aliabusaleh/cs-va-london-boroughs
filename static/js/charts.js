let originalData = [];

currentRegion = null;
currentRegion = null;

d3.csv("static/data/Final_data_Regional_Level.csv", d => {
	return {
		Region_Name: d.Region,
		Nationality: d.Nationality,
		Population: parseInt(d['population aged 16-64 yearsstimate'].replace(/,/g, ''), 10),
		Employment_Population: parseInt(d['In employment'].replace(/,/g, ''), 10),
		Job_density: parseInt(d['Job density %'].replace(/,/g, ''), 10),
		Sector_Agriculture: parseInt(d["Agriculture, forestry and fishing"].replace(/,/g, ''), 10),
		Sector_Energy: parseInt(d["Energy and water"].replace(/,/g, ''), 10),
		Sector_Manufacturing: parseInt(d["Manufacturing"].replace(/,/g, ''), 10),
		Sector_Construction: parseInt(d["Construction"].replace(/,/g, ''), 10),
		Sector_WholesaleRetail: parseInt(d["Wholesale and retail trade, hotels and restaurants"].replace(/,/g, ''), 10),
		Sector_TransportCommunication: parseInt(d["Transport and communication"].replace(/,/g, ''), 10),
		Sector_FinancialBusiness: parseInt(d["Financial and business services"].replace(/,/g, ''), 10),
		Sector_PublicAdmin: parseInt(d["Public admin, education and health"].replace(/,/g, ''), 10),
		Sector_OtherServices: parseInt(d["Other services"].replace(/,/g, ''), 10),
		Occupation_Managers: parseInt(d["Managers, Directors And Senior Officials"].replace(/,/g, ''), 10),
		Occupation_Professional: parseInt(d["Professional Occupations"].replace(/,/g, ''), 10),
		Occupation_AssociateProfessional: parseInt(d["Associate Professional And Technical Occupations"].replace(/,/g, ''), 10),
		Occupation_AdminSecretarial: parseInt(d["Administrative And Secretarial Occupations"].replace(/,/g, ''), 10),
		Occupation_SkilledTrades: parseInt(d["Skilled Trades Occupations"].replace(/,/g, ''), 10),
		Occupation_CaringLeisure: parseInt(d["Caring, Leisure And Other Service Occupations"].replace(/,/g, ''), 10),
		Occupation_SalesCustomerService: parseInt(d["Sales And Customer Service Occupations"].replace(/,/g, ''), 10),
		Occupation_PlantMachineOperatives: parseInt(d["Process, Plant And Machine Operatives"].replace(/,/g, ''), 10),
		Occupation_Elementary: parseInt(d["Elementary Occupations"].replace(/,/g, ''), 10),
		Employee: parseInt(d["Employee"].replace(/,/g, ''), 10),
		Self_Employed: parseInt(d["Self-Employed"].replace(/,/g, ''), 10),
		Education_DegreeOrEquivalent: parseInt(d["Degree or equivalent"].replace(/,/g, ''), 10),
		Education_Higher: parseInt(d["Higher education"].replace(/,/g, ''), 10),
		Education_GCE_A_Level: parseInt(d["GCE A level or equivalent"].replace(/,/g, ''), 10),
		Education_GCSE_A_C: parseInt(d["GCSE grades A*-C or equivalent"].replace(/,/g, ''), 10),
		Education_OtherQualification: parseInt(d["Other qualification"].replace(/,/g, ''), 10),
		Education_NoQualification: parseInt(d["No qualification"].replace(/,/g, ''), 10),
		Education_DontKnow: parseInt(d["Don't know"].replace(/,/g, ''), 10)
	}
}).then(data => {
	originalData = data;
	makeCharts(data)
});


function filterdatabyRegion(region) {
	console.log("hello from charts!");
	console.log(originalData);
	console.log(region);
}



// ==== main makeCharts function to render all charts
function makeCharts(regionalCsv, region) {

	// Move the color scale and regions array outside of the function to make them accessible to other charts
	const regions = Array.from(new Set(regionalCsv.map(d => d.Region_Name))).sort();
	const colors = d3.scale.ordinal()
		.domain(regions)
		.range(d3.quantize(d3.interpolateRainbow, regions.length));



	// get the population summation from regionalCsv
	const populationSum = region ? regionalCsv.filter(data => data.Region_Name === region).reduce((sum, data) => sum + data.Population, 0) : regionalCsv.reduce((sum, data) => sum + data.Population, 0);
	// all charts
	PopulationText(populationSum);
	// get the employment population summation from regionalCsv
	const employmentPopulationSum = region ? regionalCsv.filter(data => data.Region_Name === region).reduce((sum, data) => sum + data.Employment_Population, 0): regionalCsv.reduce((sum, data) => sum + data.Employment_Population, 0);
	console.log(employmentPopulationSum);
	EmploymentPopulationText(employmentPopulationSum);

	// TODO: make filters here
	// avgHousePrcNd(cf, housePriceGroup, GB);
	// annualPayNd(cf, avgPayGroup, GB);

	//SectorDataBarChart
	SectorDataBarChart(regionalCsv);

	// OccupationSpiderChart
	OccupationSpiderChart(regionalCsv);

	//EducationalLevelLineChart
	EducationalLevelLineChart(regionalCsv, colors, region);

	// ```
	// Entrepreneur chart Start
	// ```
	Entrepreneur_Data = Calculate_entrepreneur(regionalCsv, region);
	//EntrepreneurPieChart
	EntrepreneurPieChart(Entrepreneur_Data, colors);

	// ```
	// Entrepreneur chart End
	// ```

	// MapChart
	RegionsMapChart(regionalCsv);

}

function Calculate_entrepreneur(regionalCsv, region) {

	filteredData = [];
	// general view ( no region)
	if (region == null) {
		filteredData = regionalCsv
	}
	// TODO: calculate for the region
	else {
		filteredData = regionalCsv.filter(d => d.Region_Name === region)

	}

	const employeeSum = filteredData.reduce((sum, data) => sum + data.Employee, 0);
	const selfEmployeeSum = filteredData.reduce((sum, data) => sum + data.Self_Employed, 0);
	const return_data = [
		{ label: "Employee", value: employeeSum },
		{ label: "Self_Employed", value: selfEmployeeSum }
	];
	return return_data

}

// ==== total population number display
function PopulationText(data) {
	// delete old text 
	d3.select("#nd-population").selectAll("span").remove();
	// send text to the population
	d3.select("#nd-population")
		.append("span")
		.text(data)
}

// ==== % population born abroad number display 
function EmploymentPopulationText(data) {
	// delete old text
	d3.select("#nd-born-abroad").selectAll("span").remove();
	// send text to employement population
	d3.select("#nd-born-abroad")
		.append("span")
		.text(data)
}



// ==== Sectors 
function SectorDataBarChart(regionalCsv) {
	d3.select("#barchart-sector-data")
}

// ==== Regions maps
function RegionsMapChart(regionalCsv) {
	d3.select("#map-crimes");

}


function updatecharts(region = null, nationality = null, sector = null, occupation = null, education = null, entrepreneur = null) {
	
	console.log("hello from updatecharts!");
	console.log(region);
	console.log(nationality);
	// # TODO handle the issue of the map
	d3.selectAll("svg").remove();

	newData = originalData;
	// filter data for specific region if region is not null if null, then newData = originalData
	if (region != null) {
		newData = newData.filter(d => d.Region_Name === region);
	}
	// filter data for specific nationality if nationality is not null
	if(nationality != null){
		newData = newData.filter(d => d.Nationality === nationality);
	}
	// filter data for specific sector if sector is not null
	if(sector != null){
		newData = newData.filter(d => d.Sector === sector);
	}
	// filter data for specific occupation if occupation is not null
	if(occupation != null){
		newData = newData.filter(d => d.Occupation === occupation);
	}
	// filter data for specific education if education is not null
	if(education != null){
		newData = newData.filter(d => d.Education === education);
	}
	// filter data for specific entrepreneur if entrepreneur is not null
	if(entrepreneur != null){
		newData = newData.filter(d => d.Entrepreneur === entrepreneur);
	}
	// call makeCharts with the new data
	console.log(newData);
	makeCharts(newData, currentRegion);
}

// correlation between obesity rates and areas of greenspace(parks)
function EducationalLevelLineChart(regionalCsv, color, region) {

	// Specify the chart’s dimensions.
	const width = window.screen.width / 4.5;
	const height = window.screen.height / 4.5;
	const marginTop = 2;
	const marginRight = 1;
	const marginBottom = 30;
	const marginLeft = 80;
	const educationLevels = ["Degree or equivalent", "Higher education", "GCE A level or equivalent", "GCSE grades A*-C or equivalent", "Other qualification", "No qualification", "Don't know"];
	const educationalLevelsLabels = [
		'Education_DegreeOrEquivalent',
		'Education_Higher',
		'Education_GCE_A_Level',
		'Education_GCSE_A_C',
		'Education_OtherQualification',
		'Education_NoQualification',
		'Education_DontKnow'
	  ];
	  

	filteredData = regionalCsv;
	aggregatedData = filteredData
	if (region != null) {
		// filter data for specific region 
	filteredData = regionalCsv.filter(d => d.Region_Name === region);
	}
	else {
	// get the total of all regions of the educationals levels by nationality by level of education
	  
	  const aggregatedData = [{
		"Region_Name": "Aggregated",
		"Nationality": "Immigrants", // Update with your specific label for nationality
		...educationalLevelsLabels.reduce((acc, level) => ({ ...acc, [level]: 0 }), {})
	  }];
	  
	  filteredData.forEach(entry => {
		const nationality = entry.Nationality;
	  
		const existingEntry = aggregatedData.find(item => item.Nationality === nationality);
	  
		if (existingEntry) {
		  educationalLevelsLabels.forEach(level => {
			existingEntry[level] += +entry[level];
		  });
		} else {
		  const newEntry = {
			"Region_Name": "Aggregated",
			"Nationality": nationality,
			...educationalLevelsLabels.reduce((acc, level) => ({ ...acc, [level]: +entry[level] }), {})
		  };
		  aggregatedData.push(newEntry);
		}
	  });
	  filteredData = aggregatedData;
	}
	
	const svg = d3.select("#line-educational-level").append("svg")
		.attr("width", width)
		.attr("height", height);

	const xScale = d3.scaleBand()
		.domain(educationLevels)
		.range([marginLeft, width - marginRight])
		.paddingInner(1) // edit the inner padding value in [0,1]
		.paddingOuter(0.5) // edit the outer padding value in [0,1]

	const yScale = d3.scaleLinear()
		.domain([0, d3.max(filteredData, d => d3.max(educationalLevelsLabels.map(key => +d[key])))])
		.range([height - marginBottom, marginTop]);

	const line = d3.line()
		.x((_, i) => xScale(educationLevels[i]))
		.y(d => yScale(+d));

	const colors = d3.scaleOrdinal()
		.domain(filteredData.map(d => d.Nationality))
		.range(d3.schemeCategory10); // Use a categorical color scheme

	filteredData.forEach(d => {
		svg.append("path")
			.datum(educationalLevelsLabels.map(level => d[level]))
			.attr("fill", "none")
			.attr("stroke", colors(d.Nationality))
			.attr("stroke-width", 2)
			.attr("d", line)
			// add class with nationality name
			.attr("class", d.Nationality)
			.on("mouseover", function (d) {
				d3.select(this)
					.attr("stroke-width", 5)
					.style("cursor", "pointer");
			})
			.on("mouseout", function (d) {
				d3.select(this)
					.attr("stroke-width", 2)
					.style("cursor", "default");
			})
						// add on click event to the line
			.on("click", function (d) {
				console.log(this.className.baseVal);
				updatecharts(region=currentRegion, nationality=this.className.baseVal);
			})
	});

	// Add axes
	svg.append("g")
		.attr("transform", `translate(0,${height - marginBottom})`)
		.call(d3.axisBottom(xScale))
		.selectAll("text")
		.attr("transform", "rotate(-90)")
		.attr("dy", "-0.5em")
		.attr("dx", "-0.7em")
		.style("text-anchor", "end");

	svg.append("g")
		.attr("transform", `translate(${marginLeft},0)`)
		.call(d3.axisLeft(yScale));


	// Add legend colors
	const legend = svg.append("g")
		.attr("transform", `translate(${width - marginRight - 100}, ${marginTop})`);

	const legendColors = legend.selectAll(".legend-color")
		.data(filteredData.map(d => d.Nationality))
		.enter()
		.append("g")
		.attr("class", "legend-color")
		.attr("transform", (d, i) => `translate(0, ${i * 20})`);

	legendColors.append("rect")
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", colors);

	legendColors.append("text")
		.attr("x", 15)
		.attr("y", 8)
		.text(d => d);




}

// Pie Chart for 2 columns of the data
function EntrepreneurPieChart(data, color) {

	const width = 200;
	const height = 170;
	const outerRadius = Math.min(width, height) / 2 - 10;

	// Create the pie layout and arc generator.
	const pie = d3.pie()
		.sort(null)
		.value(d => d.value);

	const arc = d3.arc()
		.innerRadius(0)
		.outerRadius(outerRadius);

	const labelRadius = arc.outerRadius()() * 0.8;

	// A separate arc generator for labels.
	const arcLabel = d3.arc()
		.innerRadius(labelRadius)
		.outerRadius(labelRadius);



	const arcs = pie(data);

	// pie_cart = d3.select("#pie-chart-entrepreneur");
	// Create the SVG container.
	const svg = d3.select("#pie-chart-entrepreneur").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", [-width / 2, -height / 2, width, height])
		.attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

	// Add a sector path for each value.
	svg.append("g")
		.attr("stroke", "white")
		.selectAll()
		.data(arcs)
		.join("path")
		.attr("class", d => d.data.label)
		.attr("fill", d => color(d.data.label))
		.attr("d", arc)
		.append("title")
		.text(d => `${d.data.label.toLocaleString("en-US")}: ${d.data.value}: `);

	// Create a new arc generator to place a label close to the edge.
	// The label shows the value if there is enough room.
	svg.append("g")
		.attr("text-anchor", "middle")
		.selectAll()
		.data(arcs)
		.join("text")
		.attr("transform", d => `translate(${arcLabel.centroid(d)})`)
		.call(text => text.append("tspan")
			.attr("y", "-0.4em")
			.attr("font-weight", "bold")
			.text(d => d.data.label))
		.call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
			.attr("x", 0)
			.attr("y", "0.7em")
			.attr("fill-opacity", 0.7)
			.text(d => d.data.value.toLocaleString("en-US")));

	// extract which is the highest value and add it to html id id="pie-chart-entrepreneur-text"
	var highest = 0;
	var highest_label = "";
	for (var i = 0; i < data.length; i++) {
		if (data[i].value > highest) {
			highest = data[i].value;
			highest_label = data[i].label;
		}
	}
	d3.select("#pie-chart-entrepreneur-text")
		.append("span")
		// .text(highest_label === "Employee" ? "More Employees are hired than Self-Employeed" : "This Region has more Self-Employeed! It's a to-go for entrepreneurnship!")
		.style("color", color(highest_label))
		.style("font-weight", "bold")
		.style("font-size", "1.2em")
		.style("text-transform", "capitalize")
		.style("margin-left", "1em");

}

// proportion of working age people with a degree row chart
function OccupationSpiderChart(regionalCsv) {

	d3.select("#spider_occupation_chart")



}