import React from "react";

import {
  defaults,
  Bar,
  Line,
  Doughnut,
  Scatter,
  Pie,
  Radar,
  Polar,
} from "react-chartjs-2";

// Disable animating charts by default.
defaults.global.animation = false;

function Charts() {
  this.addInput("component type", "string");
  this.addInput("data", "array,object");
  this.value = "";
  this.size = [600, 532];

  this.properties = {
    name: "Charts Display",
  };

  this.data = [];
}

Charts.title = "Charts Display";
Charts.title_color = "#e91e63";

Charts.prototype.getTitle = function () {
  return this.properties.title;
};

Charts.prototype.onExecute = function () {
  if (this.inputs[0] && this.getInputData(0)) {
    try {
      this.onDrawBackgroun();
    } catch (error) {
      console.log("error ", error);
    }
  }
};

Charts.prototype.onDrawBackgroun = function (ctx) {
  this.render(
    <div
      style={{
        marginLeft: -20,
        marginTop: 50,
        width: this.size[0],
        height: this.size[1] - 120,
      }}
    >
      {this.getInputData(0) === "bar" && this.BarChart()}
      {this.getInputData(0) === "doughnut" && this.DoughnutChart()}
      {this.getInputData(0) === "scatter" && this.ScatterChart()}
      {this.getInputData(0) === "pie" && this.PieChart()}
      {this.getInputData(0) === "radar" && this.RadarChart()}
      {this.getInputData(0) === "polar" && this.PolarChart()}
    </div>
  );
};

Charts.prototype.LineChart = function () {
  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={this.data} />
    </div>
  );
};
// Charts.prototype.AreaChart = function () {};
// Charts.prototype.Column = function () {};
Charts.prototype.DoughnutChart = function () {
  return (
    <div>
      <h2>Doughnut Chart</h2>
      <Doughnut
        data={this.data}
        width={400}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
Charts.prototype.ScatterChart = function () {
  return (
    <div>
      <h2>Scatter Chart</h2>
      <Scatter
        data={this.data}
        width={400}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
Charts.prototype.PieChart = function () {
  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie
        data={this.data}
        width={400}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
Charts.prototype.PolarChart = function () {
  return (
    <div>
      <h2>Polar Chart</h2>
      <Polar
        data={this.data}
        width={400}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
Charts.prototype.RadarChart = function () {
  return (
    <div>
      <h2>Radar Chart</h2>
      <Radar
        data={this.data}
        width={400}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

Charts.prototype.BarChart = function () {
  return (
    <>
      <h2>Bar</h2>
      <Bar
        data={this.data}
        width={400}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </>
  );
};

export default Charts;
