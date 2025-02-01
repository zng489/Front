d3.csv('data.csv').then(function(data) {
    // Criação de um gráfico de barras simples
    var svg = d3.select("#chart1").append("svg")
        .attr("width", 500)
        .attr("height", 300);

    var x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, 500])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.value)])
        .nice()
        .range([300, 0]);

    svg.append("g")
        .selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", d => x(d.category))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => 300 - y(d.value))
        .attr("fill", "steelblue");

    svg.append("g")
        .attr("transform", "translate(0,300)")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));
});
