import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

// eslint-disable-next-line react/prop-types
const GraphComponent = ({ a, c }) => {
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    // Define the Cassini oval equation
    const equation = (x) =>
      Math.sqrt(Math.sqrt(a ** 4 + 4 * c ** 2 * x ** 2) - x ** 2 - c ** 2);

    // Generate data points for the plot
    const data = [];
    for (let x = -a - 1; x <= a + 1; x += 0.01) {
      const y = Math.sqrt(equation(x));

      data.push({ x, y });
    }
    for (let x = -a - 1; x <= a + 1; x += 0.1) {
      const y = -Math.sqrt(equation(x));

      data.push({ x, y });
    }

    setPlotData(data);
  }, [a, c]);

  return (
    <Plot
      data={[
        {
          type: "scatter",
          mode: "lines",
          x: plotData.map((point) => point.x),
          y: plotData.map((point) => point.y),
        },
      ]}
      layout={{
        width: 600,
        height: 400,
        title: "Cassini Oval",
        xaxis: { title: "X-axis" },
        yaxis: { title: "Y-axis" },
      }}
    />
  );
};

export default GraphComponent;
