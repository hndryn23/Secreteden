google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawPieChart() {

        var data = google.visualization.arrayToDataTable([
          ['Type', 'Percentage'],
          ['New Customer',     11],
          ['Non-Registered Customer',     11],
          ['Registered Customer',    7]
        ]);

        var options = {
          title: 'Customer Data'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_values'));

        chart.draw(data, options);
      }