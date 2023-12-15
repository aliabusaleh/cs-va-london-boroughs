/*jshint esversion: 6 */

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
	makeCharts(data)
});

// ==== main makeCharts function to render all charts
function makeCharts(regionalCsv) {


	// Move the color scale and regions array outside of the function to make them accessible to other charts
	const regions = Array.from(new Set(regionalCsv.map(d => d.Region_Name))).sort();
	const colors = d3.scale.ordinal()
		.domain(regions)
		.range(d3.quantize(d3.interpolateRainbow, regions.length));

	// all charts
	PopulationText("199999");
	EmploymentPopulationText("199999");

	// TODO: make filters here
	// avgHousePrcNd(cf, housePriceGroup, GB);
	// annualPayNd(cf, avgPayGroup, GB);

	//SectorDataBarChart
	SectorDataBarChart(regionalCsv);

	// OccupationSpiderChart
	OccupationSpiderChart(regionalCsv);

	//EducationalLevelLineChart
	EducationalLevelLineChart(regionalCsv);

	// ```
	// Entrepreneur chart Start
	// ```
	Entrepreneur_Data = Calculate_entrepreneur(regionalCsv,null);
	//EntrepreneurPieChart
	EntrepreneurPieChart(Entrepreneur_Data, colors);

	// ```
	// Entrepreneur chart End
	// ```

	// MapChart
	RegionsMapChart(regionalCsv);

}

function Calculate_entrepreneur(regionalCsv, region){

	// general view ( no region)
	if (region == null){
	const employeeSum = regionalCsv.reduce((sum, data) => sum + data.Employee, 0);
	const selfEmployeeSum = regionalCsv.reduce((sum, data) => sum + data.Self_Employed, 0);
	const return_data = [
		{ label: "Employee", value: employeeSum},
		{ label: "Self_Employed", value: selfEmployeeSum}
	];
	return return_data

	}
// TODO: calculate for the region 

}

// ==== total population number display
function PopulationText(data) {
	// send text to the population
	d3.select("#nd-population")
		.append("span")
		.text(data)
}

// ==== % population born abroad number display 
function EmploymentPopulationText(data) {
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


// correlation between obesity rates and areas of greenspace(parks)
function EducationalLevelLineChart(regionalCsv) {
	d3.select("#line-educational-level");

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
		.text(highest_label === "Employee" ? "More Employees are hired than Self-Employeed" : "This Region has more Self-Employeed! It's a to-go for entrepreneurnship!")
		.style("color", color(highest_label))
		.style("font-weight", "bold")
		.style("font-size", "1.2em")
		.style("text-transform", "capitalize")
		.style("margin-left", "1em");

	console.log(highest_label);
}

// proportion of working age people with a degree row chart
function OccupationSpiderChart(regionalCsv) {

	d3.select("#spider_occupation_chart")



}