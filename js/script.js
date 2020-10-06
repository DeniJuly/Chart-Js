var chartFilter = false;
var colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
var labelIndex = 6;
var colorIndex = 0;
var filterIndex = 0;
var filterLabel = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];
var barOptions_stacked = {
	tooltips: {
		enabled: true,
	},
	hover: {
		animationDuration: 0,
	},
	scales: {
		xAxes: [
			{
				ticks: {
					beginAtZero: true,
					fontFamily: "'Open Sans Bold', sans-serif",
					fontSize: 11,
				},
				scaleLabel: {
					display: false,
				},
				gridLines: {
					drawOnChartArea: false,
					color: "black",
					zeroLineColor: "black",
				},
				stacked: true,
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
					color: "black",
					zeroLineColor: "#fff",
					zeroLineWidth: 0,
				},
				ticks: {
					fontFamily: "'Open Sans Bold', sans-serif",
					fontSize: 11,
				},
				stacked: true,
			},
		],
	},
	legend: {
		display: true,
	},

	animation: {
		onComplete: function () {
			var chartInstance = this.chart;
			var ctx = chartInstance.ctx;
			ctx.fillStyle = "#fff";

			Chart.helpers.each(
				this.data.datasets.forEach(function (dataset, i) {
					var meta = chartInstance.controller.getDatasetMeta(i);
					Chart.helpers.each(
						meta.data.forEach(function (bar, index) {
							data = dataset.data[index];
							ctx.fillText(data, bar._model.x - 25, bar._model.y + 4);
						}),
						this
					);
				}),
				this
			);
		},
	},
	pointLabelFontFamily: "Quadon Extra Bold",
	scaleFontFamily: "Quadon Extra Bold",
};

Object.size = function (obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};
var dataset = [];

var myData = {
	type: "horizontalBar",
	data: {
		labels: [],
		datasets: [],
	},
	options: barOptions_stacked,
};

window.setData = function (index) {
	filterIndex = index;
	let month = filterLabel[index];
	dataset = dataChart[month].dataset;
	myData.data.labels = dataChart[month].label;
	myData.data.datasets = dataset;
};

setData(11);

var ctx = document.getElementById("canvas");
window.myChart = new Chart(ctx, myData);

// document.getElementById("addDataset").addEventListener("click", function () {
// 	if (!chartFilter) {
// 		var colorName = colors[colorIndex];
// 		var newLabel = "Label " + (myData.data.datasets.length + 1);
// 		var newDataset = {
// 			data: [randomInt(), randomInt(), randomInt(), randomInt()],
// 			backgroundColor: colorName,
// 			label: newLabel,
// 		};

// 		myData.data.datasets.push(newDataset);

// 		window.myChart.update();

// 		if (colorIndex < 4) {
// 			colorIndex = colorIndex + 1;
// 		} else {
// 			colorIndex = 0;
// 		}
// 	} else {
// 		alert("Can't add data set chart when filter active");
// 	}
// });
// document.getElementById("removeDataset").addEventListener("click", function () {
// 	if (!chartFilter) {
// 		myData.data.datasets.pop();
// 		labelData.pop();
// 		colorData.pop();
// 		window.myChart.update();
// 	} else {
// 		alert("Can't remove data set chart when filter active");
// 	}
// });
document.getElementById("addData").addEventListener("click", function () {
	if (myData.data.datasets.length > 0) {
		let month = filterLabel[filterIndex];
		var label = "Label " + (dataChart[month].label.length + 1);
		dataChart[month].label.push(label);

		for (var i = 0; i < myData.data.datasets.length; ++i) {
			let quantity = randomInt(20, 100);
			dataChart[month].dataset[i].data.push(quantity);
		}
		setData(filterIndex);
		window.myChart.update();
	}
});

document.getElementById("removeData").addEventListener("click", function () {
	let month = filterLabel[filterIndex];
	dataChart[month].label.splice(-1, 1);

	dataChart[month].dataset.forEach(function (dataset) {
		dataset.data.pop;
	});

	setData(filterIndex);
	window.myChart.update();
});

document.getElementById("resetChart").addEventListener("click", function () {
	window.myChart.update();
});

window.setInterval(function () {
	window.myChart.update();
}, 5000);
window.showSelectOption = function () {
	let select = document.getElementById("select");
	select.innerHTML = "";
	filterLabel.map((item, i) => {
		var option = document.createElement("option");
		option.text = item;
		option.value = i;
		option.selected = i == filterIndex ? "selected" : false;
		select.appendChild(option);
	});
};
window.changeLabel = function () {
	let value = document.getElementById("select").value;
	let index = value;

	setData(index);

	window.myChart.update();
};
showSelectOption();
