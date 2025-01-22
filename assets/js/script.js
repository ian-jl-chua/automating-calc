// ///////// POWER CALCULATIONS ////////////////////////////////////////////////////////////////////
// Function to update all elements with the same data-key
function updateValue(key, value) {
  const elements = document.querySelectorAll(`[data-key="${key}"]`)
  elements.forEach((element) => {
    element.textContent = value ? value.toFixed(2) : '__'
  })
}

function updateValueNonDec(key, value) {
  const elements = document.querySelectorAll(`[data-key="${key}"]`)
  elements.forEach((element) => {
    element.textContent = value ? Math.round(value) : '__'
  })
}

// Function to clear all input fields and reset results
function clearPowerInputs() {
  const powerInputs = document.querySelectorAll(
    '#fixed-charge, #variable-charge, #total-kwh, #back-house-kwh',
  )
  powerInputs.forEach((input) => {
    input.value = '' // Clear input value
  })

  // Reset all calculation results
  const results = document.querySelectorAll('[data-key]')
  results.forEach((result) => {
    result.textContent = '__' // Reset to placeholder text
  })
}

// Function to handle power calculations
function calculatePower() {
  // Get input values
  const fixedCharge =
    parseFloat(document.getElementById('fixed-charge').value) || 0
  const variableCharge =
    parseFloat(document.getElementById('variable-charge').value) || 0
  const totalKwh = parseFloat(document.getElementById('total-kwh').value) || 0
  const backHouseKwh =
    parseFloat(document.getElementById('back-house-kwh').value) || 0

  // Calculate front house power usage
  const frontHouseKwh = totalKwh - backHouseKwh

  // Ensure front house kWh is not negative
  if (frontHouseKwh < 0) {
    alert('Back house kWh cannot exceed total kWh.')
    return
  }

  // Fixed charge halved
  const fixedChargeHalved = fixedCharge / 2
  updateValue('fixed-charge-halved', fixedChargeHalved)

  // Back house calculations
  const bhVariableCharge = variableCharge * (backHouseKwh / totalKwh)
  updateValue('bh-variable-charge', bhVariableCharge)
  updateValueNonDec('bh-power', backHouseKwh)
  const bhGst = (fixedChargeHalved + bhVariableCharge) * 0.15
  updateValue('bh-gst', bhGst)
  const bhTotalPowerPayment = fixedChargeHalved + bhVariableCharge + bhGst
  updateValue('bh-total-power-payment', bhTotalPowerPayment)

  // Front house calculations
  const fhVariableCharge = variableCharge * (frontHouseKwh / totalKwh)
  updateValue('fh-variable-charge', fhVariableCharge)
  updateValueNonDec('fh-power', frontHouseKwh)
  const fhGst = (fixedChargeHalved + fhVariableCharge) * 0.15
  updateValue('fh-gst', fhGst)
  const fhTotalPowerPayment = fixedChargeHalved + fhVariableCharge + fhGst
  updateValue('fh-total-power-payment', fhTotalPowerPayment)

  // Update other values
  updateValue('variable-charge', variableCharge)
  updateValueNonDec('total-power-used', totalKwh)
}

// Event listeners
document
  .getElementById('power-calculate-btn')
  .addEventListener('click', calculatePower)
document
  .getElementById('power-clear-btn')
  .addEventListener('click', clearPowerInputs)

///////// WATER CALCULATIONS ////////////////////////////////////////////////////////////////////
// Function to update all elements with the same data-key
function updateWaterValue(key, value) {
  const elements = document.querySelectorAll(`[data-key="${key}"]`)
  elements.forEach((element) => {
    element.textContent = value ? value.toFixed(2) : '__'
  })
}

// Function to clear all input fields and reset results
function clearWaterInputs() {
  const waterInputs = document.querySelectorAll(
    '#total-water, #total-wastewater, #water-unit-rate, #wastewater-unit-rate, #back-house-water',
  )
  waterInputs.forEach((input) => {
    input.value = '' // Clear input value
  })

  // Reset all calculation results
  const results = document.querySelectorAll('[data-key]')
  results.forEach((result) => {
    result.textContent = '__' // Reset to placeholder text
  })
}

// Function to handle water calculations
function calculateWater() {
  // Get input values
  const totalWater =
    parseFloat(document.getElementById('total-water').value) || 0
  const totalWastewater =
    parseFloat(document.getElementById('total-wastewater').value) || 0
  const waterRate =
    parseFloat(document.getElementById('water-unit-rate').value) || 0
  const wastewaterRate =
    parseFloat(document.getElementById('wastewater-unit-rate').value) || 0
  const backHouseWater =
    parseFloat(document.getElementById('back-house-water').value) || 0

  // Calculate front house water usage
  const frontHouseWater = totalWater - backHouseWater

  // Ensure front house water usage is not negative
  if (frontHouseWater < 0) {
    alert('Back house water use cannot exceed total water use.')
    return
  }

  // Back house calculations
  const bhWaterRate = backHouseWater * waterRate
  const bhWastePercent = (backHouseWater / totalWater) * 100
  const bhWasteRate = (bhWastePercent / 100) * totalWastewater * wastewaterRate
  const bhTotalWaterPayment = bhWaterRate + bhWasteRate

  // Front house calculations
  const fhWaterRate = frontHouseWater * waterRate
  const fhWastePercent = (frontHouseWater / totalWater) * 100
  const fhWasteRate = (fhWastePercent / 100) * totalWastewater * wastewaterRate
  const fhTotalWaterPayment = fhWaterRate + fhWasteRate

  // Update output values
  updateWaterValue('total-water', totalWater)
  updateWaterValue('total-waste-water', totalWastewater)
  updateWaterValue('water-rate', waterRate)
  updateWaterValue('waste-water-rate', wastewaterRate)
  updateWaterValue('bh-water', backHouseWater)
  updateWaterValue('fh-water', frontHouseWater)
  updateWaterValue('bh-water-rate', bhWaterRate)
  updateWaterValue('bh-waste-percent', bhWastePercent)
  updateWaterValue('bh-waste-rate', bhWasteRate)
  updateWaterValue('bh-total-water-payment', bhTotalWaterPayment)
  updateWaterValue('fh-water-rate', fhWaterRate)
  updateWaterValue('fh-waste-percent', fhWastePercent)
  updateWaterValue('fh-waste-rate', fhWasteRate)
  updateWaterValue('fh-total-water-payment', fhTotalWaterPayment)
}

// Event listeners
document
  .getElementById('water-calculate-btn')
  .addEventListener('click', calculateWater)
document
  .getElementById('water-clear-btn')
  .addEventListener('click', clearWaterInputs)
