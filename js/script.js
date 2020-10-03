var chartFilter = false;
var colors = [
    '#008FFB',
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0"
]
var labelIndex = 6;
var colorIndex = 0;
var labelsOriginal = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
]
var iniDataOriginal = [
    {
        data: [44, 55, 41, 37, 22, 43],
        backgroundColor: "#008FFB",
        label: 'Marine Sprite'
    },
    {
        data: [53, 32, 33, 52, 13, 43],
        backgroundColor: "#00E396",
        label: 'Tank Picture'
    },
    {
        data: [12, 17, 11, 59, 16, 11],
        backgroundColor: "#FEB019",
        label: 'Striking Car'
    },
    {
        data: [11, 24, 16, 76, 62, 91],
        backgroundColor: "#FF4560",
        label: "Bucket Slope",
    },
    {
        data: [25, 12, 19, 32, 25, 24],
        backgroundColor: "#775DD0",
        label: "Rebom Kid"
    }
];
var labels = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni'
]
var labelData = [
    'Marine Sprite',
    'Tank Picture',
    'Striking Car',
    'Bucket Slope',
    'Rebom Kid'
]
var colorData = [
    '#008FFB',
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0"
]
var iniData = [
    {
        data: [44, 55, 41, 37, 22, 43],
        backgroundColor: "#008FFB",
        label: 'Marine Sprite'
    },
    {
        data: [53, 32, 33, 52, 13, 43],
        backgroundColor: "#00E396",
        label: 'Tank Picture'
    },
    {
        data: [12, 17, 11, 59, 16, 11],
        backgroundColor: "#FEB019",
        label: 'Striking Car'
    },
    {
        data: [11, 24, 16, 76, 62, 91],
        backgroundColor: "#FF4560",
        label: "Bucket Slope",
    },
    {
        data: [25, 12, 19, 32, 25, 24],
        backgroundColor: "#775DD0",
        label: "Rebom Kid"
    }
];
var barOptions_stacked = {
    tooltips: {
        enabled: true
    },
    hover: {
        animationDuration: 0
    },
    scales: {
        xAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize: 11
                },
                scaleLabel: {
                    display: false
                },
                gridLines: {
                    drawOnChartArea: false,
                    color: "black",
                    zeroLineColor: "black"
                },
                stacked: true
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                    color: "black",
                    zeroLineColor: "#fff",
                    zeroLineWidth: 0
                },
                ticks: {
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize: 11
                },
                stacked: true
            }
        ]
    },
    legend: {
        display: true
    },

    animation: {
        onComplete: function() {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.fillStyle = "#fff";

            Chart.helpers.each(
                this.data.datasets.forEach(function(dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                Chart.helpers.each(
                    meta.data.forEach(function(bar, index) {
                        data = dataset.data[index];
                        ctx.fillText(data, bar._model.x - 25, bar._model.y + 4);
                    }),
                    this
                );
                }),
                this
            );
        }
    },
    pointLabelFontFamily: "Quadon Extra Bold",
    scaleFontFamily: "Quadon Extra Bold"
};
var myData = {
    type: "horizontalBar",
    data: {
        labels: labels,
        datasets: iniData
    },
    options: barOptions_stacked
}
var ctx = document.getElementById("canvas");
window.myChart = new Chart(ctx, myData);
document.getElementById('addDataset').addEventListener('click', function() {
    if (!chartFilter) {
        var colorName = colors[colorIndex];
        var newLabel = 'Data ke-' + (myData.data.datasets.length + 1);
        var newDataset = {
            data: [
                randomInt(), 
                randomInt(), 
                randomInt(), 
                randomInt(), 
                randomInt(), 
                randomInt(), 
                randomInt(),
                randomInt(), 
                randomInt(), 
                randomInt(), 
                randomInt(),
                ],
            backgroundColor: colorName,
            label: newLabel
        };

        myData.data.datasets.push(newDataset);
        iniData.push(newDataset);
        labelData.push(newLabel)
        colorData.push(colorName)
        window.myChart.update();

        if(colorIndex < 4){
            colorIndex = colorIndex + 1;
        } else {
            colorIndex = 0;
        }   
    } else {
        alert("Can't add data set chart when filter active")
    }
});
document.getElementById('removeDataset').addEventListener('click', function() {
    if(!chartFilter){
        myData.data.datasets.pop();
        labelData.pop()
        colorData.pop()
        window.myChart.update();
    } else {
        alert("Can't remove data set chart when filter active")
    }
});
document.getElementById('addData').addEventListener('click', function() {
    if(!chartFilter){
        if(labelIndex < 12){
            if (myData.data.datasets.length > 0) {
                var label = labelsOriginal[labelIndex];
                myData.data.labels.push(label)
    
                for (var index = 0; index < myData.data.datasets.length; ++index) {
                    myData.data.datasets[index].data.push(randomInt())
                }
    
                showSelectOption()
                window.myChart.update();
                labelIndex = labelIndex + 1;
            }
        } else {
            alert("You can't add data anymore!!");
        }
    } else {
        alert("Can't add data when filter active")
    }
});
document.getElementById('removeData').addEventListener('click', function() {
    if(!chartFilter){
        myData.data.labels.splice(-1, 1); // remove the label first

        myData.data.datasets.forEach(function(dataset) {
            dataset.data.pop();
        });

        window.myChart.update();
        showSelectOption()
    } else {
        alert("Can't remove data when filter active")
    }
});
document.getElementById('resetChart').addEventListener('click', function() {
    window.myChart.update();
})
window.randomInt = function(){
    return Math.floor(Math.random() * 100); 
}
// window.setInterval(function(){
//     window.myChart.update()
// }, 5000);
window.showSelectOption = function(){
    let select = document.getElementById('select');
    select.innerHTML = '';
    initSelect()
    myData.data.labels.map(item => {
        var option = document.createElement("option");
        option.text = item;
        option.value = item;
        select.appendChild(option);
    })
}
window.initSelect = function () {
    let select = document.getElementById('select');
    var option = document.createElement('option');
    option.text = 'Filter Chart';
    option.value = '';
    option.disabled = true;
    option.selected = true;
    select.insertBefore(option, select.firstChild)
}
window.showResetOption = function () {
    let select = document.getElementById('select');
    var option = document.createElement('option');
    option.text = 'Reset Filter';
    option.value = 'RESET';
    select.insertBefore(option, select.firstChild)
}
window.changeLabel = function () {
    
    let value = document.getElementById('select').value;
    if(value != 'RESET'){
        chartFilter = true;
        let index = labelsOriginal.indexOf(value)
        let dataLength = iniData.length;
        let newData = [];
        let newLabel = [];
        let dataChart = [];

        for (let i = 0; i < dataLength; i++) {
            dataChart.push(iniData[i].data[index]);
            newLabel.push(iniData[i].label)
        }

        newData.push({
            data: dataChart,
            backgroundColor: colorData[index],
            label: labelsOriginal[index]
        })

        myData.data.datasets = newData;
        myData.data.labels = newLabel;
        window.myChart.update()
        let select = document.getElementById('select');
        select.removeChild(select.childNodes[0])
        showResetOption()
    } else {
        chartFilter = false;
        myData.data.datasets = iniData;
        myData.data.labels = labels;
        showSelectOption()
        window.myChart.update()
    }
}
showSelectOption();