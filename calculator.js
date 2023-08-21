// This calculator made for HeatGuard (heatguard.ua) //

document.addEventListener("DOMContentLoaded", function() {

let calc_expences = document.getElementById("calc_expences");
let rangeLabel = document.getElementById("calc-label");
let fueltype_coefficient = 0.36;
let heatguard_expences = calc_expences.value * fueltype_coefficient;
let minChartValue = 100;
let economy = document.getElementById("economy");
let fueltype_text_content = "Електричний котел";
let elektro_img = document.getElementById("elektro_img");
let gas_img = document.getElementById("gas_img");
let tverdo_img = document.getElementById("tverdo_img");
let aspect = 10;
let fontsize_value = 12;
let horizontalBarChart;

economy.innerHTML = (calc_expences.value - heatguard_expences);


// --------------------------------------------------------          adaptiv chart ------------------------------------------------
function resizeChart() {
if (window.screen.width <= 550) { 
  aspect = 2;
  fontsize_value = 10;
} else if (window.screen.width <= 850 && window.screen.width > 550) { 
  aspect = 3;
  fontsize_value = 14;
} else if (window.screen.width <= 1100 && window.screen.width > 850) { 
  aspect = 4;
} ;
};
resizeChart();

// --------------------------------------------------------          adaptiv chart End --------------------------------------------- 



// --------------------------------------------------------          charts  --------------------------------------------------

function getChart() {
renderNewChart();

var ctx = document.getElementById('horizontalBarChartCanvas').getContext("2d");

var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
  gradientFill.addColorStop(0, "rgba(21,17,17,1)");
  gradientFill.addColorStop(1, "rgba(21,17,17,1)");

var gradientFillHG = ctx.createLinearGradient(500, 0, 100, 0);
  gradientFillHG.addColorStop(0, "rgba(249,204,0,1)");
  gradientFillHG.addColorStop(1, "rgba(249,204,0,1)"); 


//Chart.defaults.global.defaultFontFamily = "Choose your font Family";

horizontalBarChart = new Chart(ctx, {

   type: 'horizontalBar',
   data: {
      labels: [['Тепловий насос'], `${fueltype_text_content}`],
      datasets: [
        {
          label: `Тепловий насос`,
          backgroundColor: gradientFillHG, 
          data: [heatguard_expences],
        },
        {
          label: ` ${fueltype_text_content}`,
          backgroundColor: gradientFill,
          data: [calc_expences.value]
        }
       ]
   },
   
   options: {
/*      title: {
        text: "Порівняння вартості опалення",
        fontColor: 'black',
        fontSize: fontsize_value,
        display: true
      },*/
      aspectRatio: 10,
      /*
      tooltips: {
       enabled: true
      },
      */
      events: [],
      responsive: true,
      // надписи знизу чи зверху щодо данних на графіках
      legend: false,
      /*
      legend: {
         display: true,
         position: 'bottom',
         fullWidth: true,
         labels: {
           lineHeight: 2
         }
      },
      */
      scales: {
         yAxes: [{
           barPercentage: 0.8,
           gridLines: {
             display: false,
           },
           // надпис зліва від бару
           ticks: {
             fontColor: 'black',
             //fontFamily: 'Choose your font Family',
             fontSize: fontsize_value,
           }
            
         }],
         xAxes: [{
             gridLines: {
               display: true,
               drawTicks: false,
               tickMarkLength: 5,
               drawBorder: false
             },
           ticks: {
             min: minChartValue,
             //suggestedMax: 1000,
             /*padding: 5,*/
             fontColor: 'darkgrey',
             //fontFamily: 'Choose your font Family',
             fontSize: fontsize_value,
             /*callback: function(label) {
              return (`${label} ₴`) ;
             }*/
               
           },
            scaleLabel: {
              display: true,

              /*padding: 0,*/
              //fontFamily: 'Choose your font Family',
              fontSize: fontsize_value,
              /*fontStyle: 700,*/
            },
           
         }]
      },

// --------------------------------------------------------          chart values on bar  --------------------------------------------------
      animation: {
        duration: 500,
        easing: "easeOutQuart",
        onComplete: function () {
            var ctx = this.chart.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset) {
                for (var i = 0; i < dataset.data.length; i++) {
                    var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                        scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                    ctx.fillStyle = 'white';
                    var y_pos = model.y*1.1;
                    var x_pos = model.x*0.9;
                    var bar_label = ` ${dataset.data[i]} ₴`;
                    ctx.fillText(bar_label, x_pos, y_pos);
                }
            });
        }
    }
// --------------------------------------------------------          chart values on bar  End --------------------------------------------------
   }
   
});

};

// --------------------------------------------------------          clear old chart and render new --------------------------------------------------
function renderNewChart() {

  let element = document.getElementById('chart-container');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  };

  const canvas = document.createElement("canvas");
  canvas.id = "horizontalBarChartCanvas";
  document.getElementById('chart-container').append(canvas);
}
// --------------------------------------------------------          clear old chart and render new End --------------------------------------------------

getChart();


// --------------------------------------------------------          charts  End -----------------------------------------------

addEventListener("resize", () => {
  resizeChart();
  getChart();
});

// --------------------------------------------------------          Switch fuel type   -----------------------------------------------

document.getElementById("electrokotel").addEventListener("click", function() {
  fueltype_coefficient = 0.36;
  document.getElementById("fueltype_img").src = "img/elektro_kotel.png";
  document.getElementsByClassName('li_elektro')[0].style.display = "none";
  document.getElementsByClassName('li_elektro')[1].style.display = "none";
  document.getElementsByClassName('li_tverdo')[0].style.display = "block";
  fueltype_text_content = "Електро котел";
  elektro_img.classList.remove("grayscale");
  gas_img.classList.add("grayscale");
  tverdo_img.classList.add("grayscale");
  heatguard_expences = Math.round((calc_expences.value * fueltype_coefficient));
  //horizontalBarChart.data.labels[1] = `Ваші витрати на опаленя Електрокотлом`;
  economy.innerHTML = (calc_expences.value - heatguard_expences);
  
  getChart();
});

document.getElementById("gaskotel").addEventListener("click", function() {
  fueltype_coefficient = 0.83973215;
  document.getElementById("fueltype_img").src = "img/gas_kotel.png";
  document.getElementsByClassName('li_tverdo')[0].style.display = "block";
  document.getElementsByClassName('li_elektro')[0].style.display = "block";
  document.getElementsByClassName('li_elektro')[1].style.display = "block";
  fueltype_text_content = "Газовий котел";
  gas_img.classList.remove("grayscale");
  elektro_img.classList.add("grayscale");
  tverdo_img.classList.add("grayscale");
  heatguard_expences = Math.round((calc_expences.value * fueltype_coefficient));
  //horizontalBarChart.data.labels[1] = `Ваші витрати на опаленя Газовим котлом`;
  economy.innerHTML = (calc_expences.value - heatguard_expences);
  
  getChart();
});

document.getElementById("tverdotoplkotel").addEventListener("click", function() {
  fueltype_coefficient = 0.3928;
  document.getElementById("fueltype_img").src = "img/tverdo_kotel.png";
  document.getElementsByClassName('li_tverdo')[0].style.display = "none";
  document.getElementsByClassName('li_elektro')[0].style.display = "block";
  document.getElementsByClassName('li_elektro')[1].style.display = "block";
  fueltype_text_content = "Твердопаливний котел";
  tverdo_img.classList.remove("grayscale");
  elektro_img.classList.add("grayscale");
  gas_img.classList.add("grayscale");
  heatguard_expences = Math.round((calc_expences.value * fueltype_coefficient));
  //horizontalBarChart.data.labels[1] = `Ваші витрати на опаленя Твердопаливним котлом`;
  economy.innerHTML = (calc_expences.value - heatguard_expences);
  
  getChart();
});

// --------------------------------------------------------          Switch fuel type End  -----------------------------------------------


// --------------------------------------------------------          Expences slider  -----------------------------------------------
calc_expences.addEventListener("input", showSliderValue, false);

function showSliderValue() {

  rangeLabel.innerHTML = calc_expences.value;
  heatguard_expences = Math.round((calc_expences.value * fueltype_coefficient));
  economy.innerHTML = (calc_expences.value - heatguard_expences);

renderNewChart();
getChart();
}
// --------------------------------------------------------          Expences slider End -----------------------------------------------

});