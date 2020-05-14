import React, { useRef, useEffect, useState } from "react";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";
import "./App.css";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    
    const xScale = scaleBand()
      .domain(data.map((val, idx) => idx))
      .range([0, 300])
      .padding(0.5);
    
    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const colorScale = scaleLinear().domain([75, 100, 150]).range(["green", "orange", "red"]).clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    
    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (val, idx) => xScale(idx))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", colorScale)
      .attr("height", val => 150 - yScale(val))

    select(svgRef.current)
      .select(".axis-labels")
      .append("text")
      .attr("class", "title")
      .text("Some Title")
      .attr("x", 100)
      .attr("y", -25);
    select(svgRef.current)
      .select(".axis-labels")
      .append("text")
      .text("Qty")
      .attr("x", 280)
      .attr("y", 190);
    select(svgRef.current)
      .select(".axis-labels")
      .append("text")
      .text("Price")
      .attr("x", -70)
      .attr("y", -40)
      .attr("transform", "rotate(-90)");
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="axis-labels"></g>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <div className="buttons">
        <button onClick={() => setData(data.map((val) => val + 5))}>
          Update data
        </button>
        <button onClick={() => setData(data.filter((val) => val < 35))}>
          Filter data
        </button>
      </div>
    </React.Fragment>
  );
}

export default App;
