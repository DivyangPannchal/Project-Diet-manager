let navbarDiv = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
        navbarDiv.classList.add('navbar-cng');
    } else {
        navbarDiv.classList.remove('navbar-cng');
    }
});


const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
// show navbar
navbarShowBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw');
});

// hide side bar
navbarCloseBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
});

document.addEventListener('click', (e) => {
    if(e.target.id != "navbar-collapse" && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn"){
        navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
    }
});

// stop transition and animatino during window resizing
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('caloriesChart').getContext('2d');

    // Retrieve saved data from localStorage or initialize to zeros
    let caloriesData = JSON.parse(localStorage.getItem('caloriesData')) || [0, 0, 0, 0, 0, 0, 0];

    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Calories Intake',
            data: caloriesData,
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth: 1,
            
          
        }]
    };

    const options = {
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: 'black', 
                  font: {
                      weight: 'bold' // Set Y-axis labels to be bold
                  }
              }
          },
          x: {
              ticks: {
                  color: 'black',font: {
                    weight: 'bold' // Set Y-axis labels to be bold
                }
                   // Font color of X-axis labels
              }
          }
      },
      plugins: {
          legend: {
              labels: {
                  font: {
                      color: 'black' // Font color of legend
                  }
              }
          },
         
         
          layout: {
              padding: {
                  left: 10,
                  right: 10,
                  top: 10,
                  bottom: 10
              }
          },
          border: {
              borderColor: 'black', // Border color
              borderWidth: 3 // Border thickness
          }
      }
  };
  

    const caloriesChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    function updateChart() {
        caloriesData = [
            parseInt(document.getElementById('monday').value),
            parseInt(document.getElementById('tuesday').value),
            parseInt(document.getElementById('wednesday').value),
            parseInt(document.getElementById('thursday').value),
            parseInt(document.getElementById('friday').value),
            parseInt(document.getElementById('saturday').value),
            parseInt(document.getElementById('sunday').value)
        ];
        caloriesChart.data.datasets[0].data = caloriesData;
        caloriesChart.update();

        // Save the updated data to localStorage
        localStorage.setItem('caloriesData', JSON.stringify(caloriesData));
    }

    // Populate input fields with saved data
    document.getElementById('monday').value = caloriesData[0];
    document.getElementById('tuesday').value = caloriesData[1];
    document.getElementById('wednesday').value = caloriesData[2];
    document.getElementById('thursday').value = caloriesData[3];
    document.getElementById('friday').value = caloriesData[4];
    document.getElementById('saturday').value = caloriesData[5];
    document.getElementById('sunday').value = caloriesData[6];

    // Automatically update chart as user types
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', updateChart);
    });
});

  
let allSearchedItems = [];

function searchFood() {
    const searchInput = document.getElementById('searchInput').value;

    const foodData = [
{ name: 'Apple', calories: 95, iron: 0.12, calcium: 6, protein: 0.5, fiber: 2.4, carbohydrates: 25, fat: 0 },
{ name: 'Banana', calories: 105, iron: 0.26, calcium: 5, protein: 1.3, fiber: 3.1, carbohydrates: 28, fat: 0 },
{ name: 'Chicken Curry', calories: 300, iron: 1.2, calcium: 40, protein: 20, fiber: 3, carbohydrates: 10, fat: 18 },
{ name: 'Carrot', calories: 41, iron: 0.2, calcium: 42, protein: 0.9, fiber: 2.8, carbohydrates: 0, fat: 0 },
{ name: 'Chicken Tikka Masala', calories: 400, iron: 0.002, calcium: 0.1, protein: 30, fiber: 4, carbohydrates: 20, fat: 20 },
{ name: 'Palak Paneer', calories: 380, iron: 0.002, calcium: 0.15, protein: 15, fiber: 2, carbohydrates: 5, fat: 100 },
{ name: 'Dosa', calories: 200, iron: 0.002, calcium: 0.03, protein: 15, fiber: 2, carbohydrates: 15, fat: 10 },
{ name: 'Idli', calories: 180, iron: 0.002, calcium: 0.03, protein: 15, fiber: 2, carbohydrates: 25, fat: 8 },
{ name: 'Sambar', calories: 100, iron: 0.002, calcium: 0.002, protein: 10, fiber: 2, carbohydrates: 10, fat: 3 },
{ name: 'Rasam', calories: 200, iron: 0.002, calcium: 0.03, protein: 15, fiber: 2, carbohydrates: 10, fat: 10 },
{ name: 'Vada', calories: 150, iron: 0.002, calcium: 0.02, protein: 10, fiber: 2, carbohydrates: 10, fat: 10 },
{ name: 'veg sandwich', calories: 250, iron: 0.002, calcium: 0.1, protein: 15, fiber: 4, carbohydrates: 25, fat: 10 },
{ name: 'Pongal', calories: 150, iron: 0.002, calcium: 0.03, protein: 5, fiber: 2, carbohydrates: 25, fat: 4 },
{ name: 'Masala Dosa', calories: 350, iron: 0.002, calcium: 0.15, protein: 8, fiber: 3, carbohydrates: 60, fat: 10 },
{ name: 'Uttapam', calories: 250, iron: 0.002, calcium: 0.1, protein: 6, fiber: 2, carbohydrates: 25, fat: 10 },
{ name: 'Bhajji', calories: 200, iron: 0.002, calcium: 0.03, protein: 4, fiber: 2, carbohydrates: 15, fat: 12 },
{ name: 'Masala Bonda', calories: 300, iron: 0.003, calcium: 0.05, protein: 8, fiber: 3, carbohydrates: 25, fat: 20 },
{ name: 'Puliyodarai', calories: 200, iron: 0.002, calcium: 0.03, protein: 4, fiber: 2, carbohydrates: 30, fat: 10 },
{ name: 'Chapati', calories: 200, iron: 0.002, calcium: 0.03, protein: 8, fiber: 3, carbohydrates: 35, fat: 8 },
{ name: 'Paratha', calories: 350, iron: 0.003, calcium: 0.15, protein: 10, fiber: 3, carbohydrates: 50, fat: 15 },
{ name: 'Paniyaram', calories: 200, iron: 0.002, calcium: 0.1, protein: 5, fiber: 2, carbohydrates: 25, fat: 8 },
{ name: 'Murukku', calories: 140, iron: 0.002, calcium: 0.01, protein: 3, fiber: 1, carbohydrates: 20, fat: 8 },
{ name: 'pizza', calories: 300, iron: 0.001, calcium: 0.2, protein: 15, fiber: 2, carbohydrates: 30, fat: 20 },
{ name: 'Burger', calories: 400, iron: 0.004, calcium: 0.2, protein: 15, fiber: 5, carbohydrates: 40, fat: 20 },
{ name: 'corn', calories: 96, iron: 0.0009, calcium: 0.003, protein: 3.4, fiber: 2.6, carbohydrates: 19, fat: 1.2 },
{ name: 'Milk', calories: 90, iron: 0.0005, calcium: 0.15, protein: 3, fiber: 0.5, carbohydrates: 10, fat: 4 },
{ name: 'Ice cream', calories: 207, iron: 0.0001, calcium: 0.119, protein: 3.6, fiber: 0, carbohydrates: 23.6, fat: 11.1 },
{ name: 'strawberry Milkshake', calories: 300, iron: 0.001, calcium: 0.25, protein: 8, fiber: 1, carbohydrates: 40, fat: 15 },
{ name: 'french fries', calories: 312, iron: 0.00066, calcium: 0.003, protein: 3, fiber: 3, carbohydrates: 34, fat: 19 },
{ name: 'momos', calories: 130, iron: 0.002, calcium: 0.03, protein: 10, fiber: 2, carbohydrates: 20, fat: 5 },
{ name: 'idiyappam', calories: 160, iron: 0.002, calcium: 0.03, protein: 2, fiber: 2, carbohydrates: 35, fat: 2 },
{ name: 'chicken rice', calories: 200, iron: 0.002, calcium: 0.02, protein: 15, fiber: 2, carbohydrates: 20, fat: 10 },
{ name: 'Mutton briyani', calories: 350, iron: 0.004, calcium: 0.02, protein: 20, fiber: 3, carbohydrates: 40, fat: 5 },
{ name: 'upma', calories: 200, iron: 0.002, calcium: 0.02, protein: 6, fiber: 2, carbohydrates: 35, fat: 5 },
{ name: 'appam', calories: 180, iron: 0.002, calcium: 0.02, protein: 3, fiber: 2, carbohydrates: 25, fat: 7 },
{ name: 'poori', calories: 350, iron: 0.002, calcium: 0.03, protein: 7, fiber: 1, carbohydrates: 35, fat: 20 },
{ name: 'pani puri', calories: 40, iron: 0.0004, calcium: 0.006, protein: 1, fiber: 0.5, carbohydrates: 6, fat: 2 },
{ name: 'coconut chutney', calories: 250, iron: 0.003, calcium: 0.05, protein: 3, fiber: 2, carbohydrates: 12, fat: 25 },
{ name: 'paneer tikka', calories: 265, iron: 0.002, calcium: 0.2, protein: 20, fiber: 2, carbohydrates: 15, fat: 20 },
{ name: 'mushroom gravy', calories: 70, iron: 0.0015, calcium: 0.015, protein: 3, fiber: 1.5, carbohydrates: 6, fat: 4 },
{ name: 'fish fry', calories: 250, iron: 0.002, calcium: 0.0002, protein: 20, fiber: 1, carbohydrates: 15, fat: 15 },
{ name: 'Egg curry', calories: 250, iron: 0.002, calcium: 0.1, protein: 15, fiber: 2, carbohydrates: 10, fat: 15 },
{ name: 'prawn curry', calories: 150, iron: 0.002, calcium: 0.05, protein: 15, fiber: 2, carbohydrates: 5, fat: 8 },
{ name: 'vegetable briyani', calories: 150, iron: 0.002, calcium: 0.03, protein: 4, fiber: 2, carbohydrates: 25, fat: 4 },
{ name: 'chicken korma', calories: 250, iron: 0.002, calcium: 0.04, protein: 20, fiber: 3, carbohydrates: 15, fat: 15 },
{ name: 'rava dosa', calories: 250, iron: 0.003, calcium: 0.1, protein: 6, fiber: 2, carbohydrates: 25, fat: 10 },
{ name: 'mutton curry', calories: 250, iron: 0.003, calcium: 0.03, protein: 20, fiber: 2, carbohydrates: 10, fat: 15 },
{ name: 'fish curry', calories: 150, iron: 0.002, calcium: 0.03, protein: 20, fiber: 3, carbohydrates: 15, fat: 15 },
{ name: 'bhel puri', calories: 250, iron: 0.003, calcium: 0.05, protein: 6, fiber: 3, carbohydrates: 40, fat: 10 },
{ name: 'rasgulla', calories: 186, iron: 0.00019, calcium: 0.106, protein: 2.6, fiber: 0.1, carbohydrates: 41, fat: 1 },
{ name: 'gulab jamun', calories: 200, iron: 0.0015, calcium: 0.05, protein: 3, fiber: 1, carbohydrates: 25, fat: 12 },
{ name: 'jalebi', calories: 459, iron: 0.0012, calcium: 5, protein: 5, fiber: 0.5, carbohydrates: 70, fat: 18 },
{ name: 'masala chai', calories: 60, iron: 0.0005, calcium: 0.05, protein: 1, fiber: 1, carbohydrates: 15, fat: 1 },
{ name: 'coffee', calories: 2, iron: 0.0002, calcium: 0.0072, protein: 0.3, fiber: 0, carbohydrates: 0.2, fat: 0 },
{ name: 'fresh juice', calories: 60, iron: 0.0006, calcium: 0.02, protein: 1.5, fiber: 1.5, carbohydrates: 15, fat: 0.5 },
{ name: 'avial', calories: 120, iron: 0.002, calcium: 0.04, protein: 3, fiber: 3, carbohydrates: 10, fat: 0.5 },
{ name: 'cake', calories: 4000, iron: 0.002, calcium: 0.03, protein: 5, fiber: 2, carbohydrates: 60, fat: 20 },
{ name: 'white chocolate', calories: 539, iron: 0.00031, calcium: 0.254, protein: 74, fiber: 0, carbohydrates: 59, fat: 30 },
{ name: 'dark chocolate', calories: 650, iron: 0.011, calcium: 0.07, protein: 10, fiber: 11, carbohydrates: 60, fat: 60 },
{ name: 'bread', calories: 80, iron: 0.0015, calcium: 0.03, protein: 3, fiber: 2, carbohydrates: 15, fat: 2 },
{ name: 'milk chocolate', calories: 535, iron: 0.002, calcium: 0.19, protein: 8, fiber: 3, carbohydrates: 60, fat: 30 },
{ name: 'fruit salad', calories: 70, iron: 0.0008, calcium: 0.012, protein: 1.5, fiber: 2, carbohydrates: 18, fat: 0.5 },
{ name: 'puttu', calories: 192, iron: 0.0019, calcium: 0.01, protein: 3.5, fiber: 1.8, carbohydrates: 40, fat: 1 },
{ name: 'white rice', calories: 130, iron: 0.0004, calcium: 0.01, protein: 2.7, fiber: 0.4, carbohydrates: 28, fat: 0.2 },
{ name: 'omelette', calories: 154, iron: 0.001, calcium: 0.05, protein: 13, fiber: 11, carbohydrates: 1, fat: 11 }
];

    const result = foodData.filter(food => food.name.toLowerCase().includes(searchInput.toLowerCase()));

    allSearchedItems = allSearchedItems.concat(result);
    displayResults();
}

function displayResults() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (allSearchedItems.length > 0) {
        const table = document.createElement('table');

        // Table header
        const headerRow = table.insertRow(0);
        Object.keys(allSearchedItems[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            headerRow.appendChild(th);
        });

        // Table body
        allSearchedItems.forEach(food => {
            const row = table.insertRow();
            Object.values(food).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });
        });

        // Calculate and display total values
        const totalRow = table.insertRow();
        const totalCellLabel = totalRow.insertCell();
        totalCellLabel.textContent = 'Total';

        const nutrientKeys = ['calories', 'iron', 'calcium', 'protein', 'fiber', 'carbohydrates', 'fat'];
        nutrientKeys.forEach(key => {
            const totalCellValue = totalRow.insertCell();
            const total = allSearchedItems.reduce((acc, food) => acc + food[key], 0);
            totalCellValue.textContent = total.toFixed(2);
        });

        resultDiv.appendChild(table);
    }

    // Display message if no results are found
    else {
        resultDiv.innerHTML = '<p>No results found. The food item is not in the database.</p>';
    }
}