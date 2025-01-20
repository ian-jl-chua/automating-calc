// Power Calculations
document.getElementById("power-calculate-btn").addEventListener("click", function () {
  // Fetch input values
  const fixedCharge = parseFloat(document.getElementById("fixed-charge").value) || 0;
  const variableCharge = parseFloat(document.getElementById("variable-charge").value) || 0;
  const totalKwh = parseFloat(document.getElementById("total-kwh").value) || 0;
  const backKwh = parseFloat(document.getElementById("back-house-kwh").value) || 0;
  const frontKwh = parseFloat(document.getElementById("front-house-kwh").value) || 0;

  // Calculations
  const fixedChargeSplit = fixedCharge / 2;

  const backVariablePercentage = backKwh / totalKwh;
  const backVariableCharge = variableCharge * backVariablePercentage;
  const backGst = (fixedChargeSplit + backVariableCharge) * 0.15;
  const backTotalPower = fixedChargeSplit + backVariableCharge + backGst;

  const frontVariablePercentage = frontKwh / totalKwh;
  const frontVariableCharge = variableCharge * frontVariablePercentage;
  const frontGst = (fixedChargeSplit + frontVariableCharge) * 0.15;
  const frontTotalPower = fixedChargeSplit + frontVariableCharge + frontGst;

  // Update output fields
  // document.getElementById("fixed-charge-result").textContent = `Fixed daily charge is halved between the front and back, so they each come to $${fixedChargeSplit.toFixed(2)}`;
  // document.getElementById("variable-charge-result").textContent = `Variable charge was discounted and the total is $${variableCharge.toFixed(2)}`;

  // document.getElementById("back-house-fixed-result").textContent = `Back house would pay a fixed of $${fixedChargeSplit.toFixed(2)}`;
  // document.getElementById("back-house-variable-result").textContent = `Back house variable charge with discount applied is, $${variableCharge.toFixed(2)} x (${backKwh.toFixed(2)}kWh/${totalKwh.toFixed(2)}kWh)% = $${backVariableCharge.toFixed(2)}`;
  // document.getElementById("back-house-gst-result").textContent = `Back house GST is, ($${fixedChargeSplit.toFixed(2)}+$${backVariableCharge.toFixed(2)}) x 15% = $${backGst.toFixed(2)}`;
  // document.getElementById("back-house-total-power").textContent = `Total for back house $${backTotal.toFixed(2)}`;

  // document.getElementById("front-house-fixed-result").textContent = `Front house would pay a fixed of $${fixedChargeSplit.toFixed(2)}`;
  // document.getElementById("front-house-variable-result").textContent = `Front house variable charge with discount applied is, $${variableCharge.toFixed(2)} x (${frontKwh.toFixed(2)}kWh/${totalKwh.toFixed(2)}kWh)% = $${frontVariableCharge.toFixed(2)}`;
  // document.getElementById("front-house-gst-result").textContent = `Front house GST is, ($${fixedChargeSplit.toFixed(2)}+$${frontVariableCharge.toFixed(2)}) x 15% = $${frontGst.toFixed(2)}`;
  // document.getElementById("front-house-total-power").textContent = `Total for front house $${frontTotal.toFixed(2)}`;

  // TO BE REVISED ^
});

// Clear functionality for Power Calculations
document.getElementById("power-clear-btn").addEventListener("click", function () {
  // Clear input values
  document.getElementById("fixed-charge").value = "";
  document.getElementById("variable-charge").value = "";
  document.getElementById("total-kwh").value = "";
  document.getElementById("back-house-kwh").value = "";
  document.getElementById("front-house-kwh").value = "";

  // Clear output fields
  // document.getElementById("fixed-charge-result").textContent = "";
  // document.getElementById("variable-charge-result").textContent = "";
  // document.getElementById("back-house-fixed-result").textContent = "";
  // document.getElementById("back-house-variable-result").textContent = "";
  // document.getElementById("back-house-gst-result").textContent = "";
  // document.getElementById("back-house-total-result").textContent = "";
  // document.getElementById("front-house-fixed-result").textContent = "";
  // document.getElementById("front-house-variable-result").textContent = "";
  // document.getElementById("front-house-gst-result").textContent = "";
  // document.getElementById("front-house-total-result").textContent = "";

  // TO BE REVISED ^

  // Optionally clear cache or memory references
});

// Water Calculations
document.getElementById("water-calculate-btn").addEventListener("click", function () {
  // Fetch input values
  const totalWater = parseFloat(document.getElementById("total-water").value) || 0;
  const totalWastewater = parseFloat(document.getElementById("total-wastewater").value) || 0;
  const waterRate = parseFloat(document.getElementById("water-unit-rate").value) || 0;
  const wastewaterRate = parseFloat(document.getElementById("wastewater-unit-rate").value) || 0;
  const backWater = parseFloat(document.getElementById("back-house-water").value) || 0;
  const frontWater = parseFloat(document.getElementById("front-house-water").value) || 0;

  // Calculations
  const backWaterCharge = backWater * waterRate;
  const backWastewaterPercentage = backWater / totalWater;
  const backWastewaterCharge = backWastewaterPercentage * totalWastewater * wastewaterRate;
  const backTotalWater = backWaterCharge + backWastewaterCharge;

  const frontWaterCharge = frontWater * waterRate;
  const frontWastewaterPercentage = frontWater / totalWater;
  const frontWastewaterCharge = frontWastewaterPercentage * totalWastewater * wastewaterRate;
  const frontTotalWater = frontWaterCharge + frontWastewaterCharge;

  // // Update output fields
  // document.getElementById("total-water-result").textContent = `Total water use is ${totalWater.toFixed(2)} kL, wastewater is ${totalWastewater.toFixed(2)} kL`;

  // document.getElementById("back-house-water-result").textContent = `Back house water: ${backWater.toFixed(2)} kL rate at $${waterRate.toFixed(2)}/kL = $${backWaterCharge.toFixed(2)}`;
  // document.getElementById("back-house-wastewater-result").textContent = `Back house wastewater: ${(backWastewaterPercentage * 100).toFixed(2)}% of ${totalWastewater.toFixed(2)} kL at rate of $${wastewaterRate.toFixed(2)}/kL = $${backWastewaterCharge.toFixed(2)}`;
  // document.getElementById("back-house-total-result").textContent = `Total pay for Back house: $${backTotal.toFixed(2)}`;

  // document.getElementById("front-house-water-result").textContent = `Front house water: ${frontWater.toFixed(2)} kL rate at $${waterRate.toFixed(2)}/kL = $${frontWaterCharge.toFixed(2)}`;
  // document.getElementById("front-house-wastewater-result").textContent = `Front house wastewater: ${(frontWastewaterPercentage * 100).toFixed(2)}% of ${totalWastewater.toFixed(2)} kL at rate of $${wastewaterRate.toFixed(2)}/kL = $${frontWastewaterCharge.toFixed(2)}`;
  // document.getElementById("front-house-total-result").textContent = `Total pay for Front house: $${frontTotal.toFixed(2)}`;

  // TO BE REVISED ^
});

// Clear functionality for Water Calculations
document.getElementById("water-clear-btn").addEventListener("click", function () {
  // Clear input values
  document.getElementById("total-water").value = "";
  document.getElementById("total-wastewater").value = "";
  document.getElementById("water-unit-rate").value = "";
  document.getElementById("wastewater-unit-rate").value = "";
  document.getElementById("back-house-water").value = "";
  document.getElementById("front-house-water").value = "";

  // Clear output fields
  // document.getElementById("total-water-result").textContent = "";
  // document.getElementById("back-house-water-result").textContent = "";
  // document.getElementById("back-house-wastewater-result").textContent = "";
  // document.getElementById("back-house-total-result").textContent = "";
  // document.getElementById("front-house-water-result").textContent = "";
  // document.getElementById("front-house-wastewater-result").textContent = "";
  // document.getElementById("front-house-total-result").textContent = "";

  // TO BE REVISED ^

  // Optionally clear cache or memory references
});
