import React, {useRef, useEffect, useState} from 'react';
import {select, line, curveCardinal, axisBottom, axisLeft, scaleLinear, text} from 'd3';
import './App.css';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear().domain([0, data.length - 1]).range([0, 300]);
    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    const myLine = line().x((val, index)=> xScale(index)).y(yScale).curve(curveCardinal);

    svg.selectAll(".line")
    .data([data])
    .join("path")
    .attr("class", "line")
    .attr("d", myLine)
    .attr("fill", "none")
    .attr("stroke", "blue");

    svg.select(".axis-labels").append("text").attr("class", "title").text("Some Title").attr("x", 100).attr("y", -25);
    svg.select(".axis-labels").append("text").text("Qty").attr("x", 280).attr("y", 190);
    svg.select(".axis-labels").append("text").text("Price").attr("x", -70).attr("y", -40).attr("transform", "rotate(-90)");
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="axis-labels"></g>
        <g className="x-axis" />
        <g className="y-axis"/>
      </svg>
      <br />
      <div className="buttons">
      <button onClick={()=>setData(data.map(val => val + 5))}>Update data</button>
      <button onClick={()=>setData(data.filter(val => val < 35))}>Filter data</button>
      </div>
    </React.Fragment>
  );
}

export default App;
