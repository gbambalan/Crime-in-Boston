var margin = {top: 20, right: 20, bottom: 50, left: 160},
    svgWidth = +d3.select("#chart").attr("width"),
    svgHeight = +d3.select("#chart").attr("height"),
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#chart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("boston-crime.csv").then(function(data) {
    let filteredData = data.filter(function(d) {
        return d.STREET != null && d.STREET.trim() !== "";
    });

    let frequencyByStreet = d3.nest()
        .key(function(d) { return d.STREET; })
        .rollup(function(v) { return v.length; })
        .entries(filteredData)
        .map(function(group) {
            return { STREET: group.key, Frequency: group.value };
        });

    frequencyByStreet.sort(function(a, b) {
        return b.Frequency - a.Frequency;
    });
    let topStreets = frequencyByStreet.slice(0, 10);

    var y = d3.scaleBand()
              .range([0, height])
              .padding(0.1)
              .domain(topStreets.map(function(d) { return d.STREET; }));
    var x = d3.scaleLinear()
              .range([0, width])
              .domain([0, d3.max(topStreets, function(d) { return d.Frequency; })]);

    svg.selectAll(".bar")
        .data(topStreets)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", function(d) { return y(d.STREET); })
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", function(d) { return x(d.Frequency); })
        .on('click', function(event, d) {
            d3.select(this).classed('highlighted', !d3.select(this).classed('highlighted'));
        });

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Street Name")

    svg.append("text")             
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom / 1.5) + ")")
        .style("text-anchor", "middle")
        .text("Frequency")
        .attr("class", "x-axis-label");
});
