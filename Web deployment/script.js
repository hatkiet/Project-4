document.addEventListener('DOMContentLoaded', function () {
    // Fetch json data
    fetch('data.json')
        .then(response => response.json())
        // data processing
        .then(data => {
            // Initialize counts
            let heartAttackCounts = {
                Male: { Yes: 0, No: 0 },
                Female: { Yes: 0, No: 0 }
            };

            // Process each record
            data.forEach(record => {
                const sex = record.Sex;
                const heartAttack = record.HeartAttack;

                if (sex in heartAttackCounts) {
                    if (heartAttack in heartAttackCounts[sex]) {
                        heartAttackCounts[sex][heartAttack]++;
                    } else {
                        heartAttackCounts[sex][heartAttack] = 1;
                    }
                } else {
                    heartAttackCounts[sex] = { Yes: 0, No: 0 };
                    heartAttackCounts[sex][heartAttack] = 1;
                }
            });

            // Prepare data for Plotly
            const maleData = [heartAttackCounts.Male.Yes, heartAttackCounts.Male.No];
            const femaleData = [heartAttackCounts.Female.Yes, heartAttackCounts.Female.No];

            const trace1 = {
                x: ['Yes', 'No'],
                y: maleData,
                name: 'Male',
                type: 'bar'
            };

            const trace2 = {
                x: ['Yes', 'No'],
                y: femaleData,
                name: 'Female',
                type: 'bar'
            };

            const layout = {
                title: 'Heart Attack - Yes/No by Sex',
                barmode: 'group'
            };

            const data = [trace1, trace2];

            // Create the Plotly chart
            Plotly.newPlot('heartAttackChart', data, layout);
        })
    .catch(error => console.error('Error fetching data:', error))

/*
    function displayData(data) {
        const container = document.getElementById('data-container');
        data.forEach(record => {
            const recordElement = document.createElement('div');
            recordElement.textContent = JSON.stringify(record, null, 2);
            container.appendChild(recordElement);
        });
    }
*/
   
    // Function to show the plot in the modal
    window.showPlot = function (plotId) {
        var modal = document.getElementById('plotModal');
        var plots = document.getElementsByClassName('plot');
        for (var i = 0; i < plots.length; i++) {
            plots[i].style.display = 'none';
        }
        document.getElementById(plotId).style.display = 'block';
        modal.style.display = 'block';
    }

    // Function to close the modal
    window.closePlot = function () {
        var modal = document.getElementById('plotModal');
        modal.style.display = 'none';
    }

    // Setup variables



    // Example of creating a plot with Plotly
/*    Plotly.newPlot('sexPlot', [{
        x: ['Male', 'Female'],
        y: [10, 15],
        type: 'bar'
    }], {
        title: 'Heart Attack Risk by Sex'
    });
*/
    Plotly.newPlot('generalHealthPlot', [{
        x: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
        y: [5, 10, 15, 20, 25],
        type: 'bar'
    }], {
        title: 'Heart Attack Risk by General Health'
    });

    // Custom age ranges and data
    var ageCategories = ['Age 18 to 24', 'Age 25 to 29', 'Age 30 to 34', 'Age 35 to 39', 'Age 40 to 44', 'Age 45 to 49', 'Age 50 to 54', 'Age 55 to 59', 'Age 60 to 64', 'Age 65 to 69', 'Age 70 to 74', 'Age 75 to 79', 'Age 80 or older'];
    var maleCounts = [10512, 8193, 8941, 9779, 10011, 9696, 11217, 12507, 14428, 15626, 14209, 9677, 8868];
    var femaleCounts = [7979, 6987, 8493, 9928, 10863, 10279, 12232, 13297, 16324, 17100, 15464, 11574, 12168];


    // Create the stacked bar plot using Plotly
    var traceMale = {
        x: ageCategories,
        y: maleCounts,
        name: 'Male',
        type: 'bar',
        marker: { color: 'skyblue' }
    };

    var traceFemale = {
        x: ageCategories,
        y: femaleCounts,
        name: 'Female',
        type: 'bar',
        marker: { color: 'salmon' }
    };

    var dataTraces = [traceMale, traceFemale];

    var layout = {
        title: 'Heart Attack Count by Age Category and Sex',
        xaxis: { title: 'Age Category' },
        yaxis: { title: 'Count' },
        barmode: 'stack',
        width: 800,  // Adjusted size
        height: 600  // Adjusted size
    };

    Plotly.newPlot('agePlot', dataTraces, layout);

    // Add other plots similarly...

    // Create a chart with Chart.js

});