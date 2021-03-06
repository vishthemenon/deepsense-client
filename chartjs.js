var ctx = document.getElementById("radarChart").getContext("2d");
var cty = document.getElementById("linearChart").getContext("2d");

Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.point.radius = 0;

var data = {
    labels: ["Happy", "Relaxed", "Sad", "Tense"],
    datasets: [{
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        data: [alpha, beta, gamma, theta],
    }, ]
};

var data2 = {
    labels: ["Happy", "Relaxed", "Sad", "Tense"],
    datasets: [{
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        data: [],
    },
    {
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        data: [],
    },
    {
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        data: [],
    },
    {
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        data: [],
    }]
};

var linearGraph = new Chart(cty, {
    type: "line",
    data: data2,
    options: {
        backgroundColor: '#fff',
        animation: {
            duration: 500
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        maintainAspectRatio: true,
        responsive: true,
    }
});

var radarChart = new Chart(ctx, {
    type: "radar",
    data: data,
    options: {
        backgroundColor: '#fff',
        animation: {
            duration: 500
        },
        maintainAspectRatio: true,
        responsive: true,
        scale: {
            display: true,
            ticks: {
                beginAtZero: true,
            }
        },
    }
});

$(function() {
    setInterval(function() {
        $.ajax({
                url: "http://deepsense.herokuapp.com/realtime",
                cache: false
            })
            .done(function(raw) {
                linearGraph.data.datasets[0].data.push(raw.alpha);
                linearGraph.data.datasets[1].data.push(raw.beta);
                linearGraph.data.datasets[2].data.push(raw.gamma);
                linearGraph.data.datasets[3].data.push(raw.theta);
                console.log(  linearGraph.data.datasets[0])
                linearGraph.update();
            });
    }, 1000)
});

$(function() {
    setInterval(function() {
        $.ajax({
                url: "http://deepsense.herokuapp.com/realtime",
                cache: false
            })
            .done(function(raw) {
                radarChart.data.datasets[0].data = [raw.alpha, raw.beta, raw.gamma, raw.theta];
                radarChart.update();
            });
    }, 1000)
});

ctx.width = parent.offsetWidth;
ctx.height = parent.offsetHeight;
cty.width = parent.offsetWidth;
cty.height = parent.offsetHeight;

var alpha = 0;
var beta = 0;
var gamma = 0;
var theta = 0;
