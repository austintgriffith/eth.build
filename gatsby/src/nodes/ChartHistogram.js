import Chart from 'chart.js';

function ChartHistogram() {
  this.addInput("", 0, { label: "" });
  this.value = "";
  this.size = [320, 240];
  this.properties = {
    bars: 64,
    backgroundColor:'rgba(128, 128, 128, 0.5)',
    borderColor: 'rgba(196, 196, 196, 1)'
  }
}

ChartHistogram.title = "Chart Histogram"
ChartHistogram.menu = "chart/histogram"

ChartHistogram.prototype.onAdded = function() {
  console.log("ADDED")
  this.chart = {
    labels: [],
    datasets:[{
      label: '',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  }
  for(let b=0;b<this.properties.bars;b++){
    this.chart.labels.push(b)
    this.chart.datasets[0].data.push(0)
    this.chart.datasets[0].backgroundColor.push(this.properties.backgroundColor)
    this.chart.datasets[0].borderColor.push(this.properties.borderColor)
  }
  this.render()
}

ChartHistogram.prototype.render = function() {
  var canvas = document.getElementById('chart')
  var myChart = new Chart(canvas, {
    type: 'bar',
    data: this.chart,
    options: {
      animation: {duration: 0},
      responsiveAnimationDuration: 0,
      scales: {
         yAxes: [{
             ticks: {
                 beginAtZero: true
             }
         }]
     }
    }
  });
  var image = new Image();
  image.onload = ()=>{
    this.image = image
  };
  image.src = myChart.toBase64Image()
}

ChartHistogram.prototype.addData = function(newValue) {
  console.log("NEWVALUE",newValue)
  let bar = newValue % this.properties.bars
  console.log("it will go in bar",bar,newValue,this.properties.bars)
  this.chart.datasets[0].data[bar]++
  this.render()
}

ChartHistogram.prototype.onExecute = function() {
  if (this.inputs[0]) {
    if(this.value!==this.getInputData(0)){
      this.value = this.getInputData(0);
      this.addData(this.value)
    }
  }
};

ChartHistogram.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.inputs[0].label;
  }
  return this.title;
};

ChartHistogram.prototype.onDrawForeground = function(ctx) {
  //show the current value
  this.inputs[0].label = this.value;
  if(this.image){
    ctx.drawImage(this.image, 0, 0, this.size[0], this.size[1])
  }

};

export default ChartHistogram
