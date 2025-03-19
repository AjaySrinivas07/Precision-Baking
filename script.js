$(document).ready(function () {
    let densities = {};
    let currentSystem = "US"; // Default to US measurements

    // Load ingredient densities from CSV
    $.get("Densities.csv", function (data) {
        let lines = data.split("\n");
        $("#ingredient").empty().append('<option value="">Select Ingredient</option>');

        for (let i = 1; i < lines.length; i++) {
            let parts = lines[i].split(",");
            if (parts.length === 2) {
                let ingredient = parts[0].trim();
                let density = parseFloat(parts[1].trim());
                densities[ingredient] = density;
                $("#ingredient").append(`<option value="${ingredient}">${ingredient}</option>`);
            }
        }
    });

    // Conversion factors for US and UK measurement systems
    const conversionFactors = {
        "US": {
            "cup": 236.588,
            "tbsp": 14.79,
            "tsp": 4.93,
            "ml": 1
        },
        "UK": {
            "cup": 284.13,
            "tbsp": 17.76,
            "tsp": 5.92,
            "ml": 1
        }
    };

    // Toggle between US and UK measurements
    $("#toggle-system").click(function () {
        currentSystem = currentSystem === "US" ? "UK" : "US";
        $("#current-system").html(`Using: <strong>${currentSystem}</strong> Measurements`);
        $("#toggle-system").text(`Switch to ${currentSystem === "US" ? "UK" : "US"}`);
    });

    // Update density display when ingredient changes
    $("#ingredient").change(function () {
        let selectedIngredient = $(this).val();
        let density = densities[selectedIngredient] || "--";
        $("#density-display span").text(density + " g/mL");
    });

    $("#convert").click(function () {
        let ingredient = $("#ingredient").val();
        let quantity = parseFloat($("#quantity").val());
        let unit = $("#unit").val();

        if (!ingredient || isNaN(quantity)) {
            $("#result").text("Please enter a valid quantity and select an ingredient.");
            return;
        }

        let mlValue = quantity * conversionFactors[currentSystem][unit]; // Convert input to ml
        let grams = mlValue * (densities[ingredient] || 0);

        $("#result").text(`Result: ${grams.toFixed(2)} grams (${currentSystem} System)`);
    });
});
