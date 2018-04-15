let svg = d3.select("svg");
let margin = {top: 20, bottom: 20, right:20, left: 20};
const width = 1200;
const height = 500;

d3.csv("atlanta.csv", (d) => {
  //extents
  let yExtent = d3.extent(d,(d) => parseFloat(d["Max.TemperatureF"]) );
  let xExtent = d3.extent(d,(d) => d3.timeParse("%Y-%m-%d")(d.Date) )
  //scales

  let xScale = d3.scaleLinear().domain(xExtent).range([margin.left, width - margin.right]);
  let yScale = d3.scaleLinear().domain(yExtent).range([height, 0] );
   //axis
   let yAxis = d3.axisLeft(yScale);  

   let xAxis = d3.axisBottom(xScale).tickFormat((d) =>
   d3.timeFormat("%b %Y ")(new Date(d)) ) ;
   svg.append("g") 
    .attr("transform", `translate(${margin.left - 1}  , 0)`)
    .call(yAxis);
   svg.append("g")
   .attr("transform", `translate(0, ${height})`)
   .call(xAxis);

  let line = d3.line()
  .x((data) =>  xScale(d3.timeParse("%Y-%m-%d")(data.Date))  )
  .y((data) => yScale( data["Max.TemperatureF"]) );
  svg.attr("height", height)
  .attr("width", width)
  .append("path")
    .datum(d)
    .attr("d", line) 
    .attr("fill", "transparent")
    .attr("stroke-width", 2)
    .attr("stroke", "#000")
    console.log( yScale(50));

})
