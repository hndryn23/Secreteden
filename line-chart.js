google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawLineChart() {
        var data = google.visualization.arrayToDataTable([
          ['Month', 'Sales', 'Expenses'],
          ['JAN',  1000,      400],
          ['FEB',  1170,      460],
          ['MAR',  660,       1120],
          ['APR',  1030,      540],
          ['MAY',  1000,      400],
          ['JUN',  1170,      460],
          ['JUL',  660,       1120],
          ['AUG',  1030,      540],
          ['SEP',  1000,      400],
          ['OCT',  1170,      460],
          ['NOV',  660,       1120],
          ['DEC',  1030,      540],
        ]);

        var options = {
          title: "Secret Eden's Performance",
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_values'));

        chart.draw(data, options);
      }