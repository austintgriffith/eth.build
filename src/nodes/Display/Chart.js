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
  this.addInput("labels", "array,object");
  this.addInput("data", "array,object");
  this.value = "";
  this.size = [600, 532];

  this.properties = {
    name: "Charts Display",
  };

  this.data = [];
  this.labels = [];
}

Charts.title = "Charts Display";
Charts.title_color = "#e91e63";

Charts.prototype.getTitle = function () {
  return this.properties.title;
};

Charts.prototype.onExecute = function () {
  if (this.inputs[0] && this.getInputData(0)) {
    try {
    if (this.getInputData(1)) {
        this.labels = this.getInputData(1).split(",")
    }
      if (this.getInputData(2)) {
        this.data = this.getInputData(2).split(",")
      }
      this.onDrawBackground();
    } catch (error) {
      console.log("error ", error);
    }
  }
};

Charts.prototype.onDrawBackground = function (ctx) {
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
  const data = {
    labels: this.labels,
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.data,
      },
    ],
  };
  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={data} />
    </div>
  );
};
// Charts.prototype.AreaChart = function () {};
// Charts.prototype.Column = function () {};
Charts.prototype.DoughnutChart = function () {
  const data = {
    labels: this.labels,
    datasets: [
      {
        data: this.data,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div>
      <h2>Doughnut Chart</h2>
      <Doughnut
        data={data}
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
  let data = {
    labels: this.labels,
    datasets: [
      {
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.data,
      },
    ],
  };
  return (
    <div>
      <h2>Scatter Chart</h2>
      <Scatter
        data={data}
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
  const data = {
    labels: this.labels,
    datasets: [
      {
        data: this.data,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie
        data={data}
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
  const data = {
    datasets: [
      {
        data: this.data,
        backgroundColor: [
          "#FF6384",
          "#4BC0C0",
          "#FFCE56",
          "#E7E9ED",
          "#36A2EB",
        ],
        label: "My dataset", // for legend
      },
    ],
    labels: this.labels,
  };
  return (
    <div>
      <h2>Polar Chart</h2>
      <Polar
        data={data}
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
  const data = {
    labels: this.labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: this.data,
      },
    ],
  };
  return (
    <div>
      <h2>Radar Chart</h2>
      <Radar
        data={data}
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
  const data = {
    labels: this.labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: this.data,
      },
    ],
  };
  return (
    <>
      <h2>Bar</h2>
      <Bar
        data={data}
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
