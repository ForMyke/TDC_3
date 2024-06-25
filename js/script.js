document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("myChart").getContext("2d");

  const data = {
    datasets: [
      {
        tree: [
          {
            name: "Raíz",
            children: [
              { name: "Hijo 1", value: 1 },
              {
                name: "Hijo 2",
                children: [
                  {
                    name: "Nieto 1",
                    children: [
                      { name: "Subnieto 1", value: 4 },
                      { name: "Subnieto 2", value: 5 },
                      { name: "Subnieto 3", value: 6 },
                    ],
                  },
                  { name: "Nieto 2", value: 7 },
                ],
              },
            ],
          },
        ],
        key: "name",
        groups: [
          "Raíz",
          "Hijo 1",
          "Hijo 2",
          "Nieto 1",
          "Nieto 2",
          "Subnieto 1",
          "Subnieto 2",
          "Subnieto 3",
        ],
        backgroundColor: function (context) {
          const colors = ["#c6aae8", "#a389c4", "#c5c5c5"];
          return colors[context.dataIndex % colors.length];
        },
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const config = {
    type: "treemap",
    data: data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.raw.name;
            },
          },
        },
      },
    },
  };

  const myChart = new Chart(ctx, config);
});
