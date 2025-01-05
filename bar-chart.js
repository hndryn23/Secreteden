google.charts.load("current", { packages: ["corechart"] });

google.charts.setOnLoadCallback(drawChart);

function drawBarChart()
  {
    var data = google.visualization.arrayToDataTable([
      ["Item Type", "Amount", { role: "style" }],
      ["Flowers", 8.94, "color: #b87333"],
      ["Pots", 10.49, "color: silver"],
      ["Fertilizier", 19.30, "color: gold"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([
      0,
      1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation"
      },
      2
    ]);

    var options = {
      title: "Product Type Sold",
      width: 600,
      height: 400,
      bar: { groupWidth: "95%" },
      legend: { position: "none" }
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById("chart_values")
    );
    chart.draw(view, options);
  }


