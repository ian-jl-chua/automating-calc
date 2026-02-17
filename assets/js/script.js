import { updateValue, updateValueNonDec } from './shared.js'

// ///////// POWER CALCULATIONS ////////////////////////////////////////////////////////////////////

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

  // Fixed charge split 3 ways - 1/3 back house, 2/3 front house
  const fixedChargeSplit = fixedCharge / 3
  const bhFixedCharge = fixedChargeSplit
  const fhFixedCharge = fixedChargeSplit * 2
  updateValue('fixed-charge-bh', bhFixedCharge)
  updateValue('fixed-charge-fh', fhFixedCharge)

  // Back house calculations
  const bhVariableCharge = variableCharge * (backHouseKwh / totalKwh)
  const bhGst = (bhFixedCharge + bhVariableCharge) * 0.15
  const bhTotalPowerPayment = bhFixedCharge + bhVariableCharge + bhGst

  // Front house calculations
  const fhVariableCharge = variableCharge * (frontHouseKwh / totalKwh)
  const fhGst = (fhFixedCharge + fhVariableCharge) * 0.15
  const fhTotalPowerPayment = fhFixedCharge + fhVariableCharge + fhGst

  // Update all values
  updateValue('bh-variable-charge', bhVariableCharge)
  updateValueNonDec('bh-power', backHouseKwh)
  updateValue('bh-gst', bhGst)
  updateValue('bh-total-power-payment', bhTotalPowerPayment)
  updateValue('fh-variable-charge', fhVariableCharge)
  updateValueNonDec('fh-power', frontHouseKwh)
  updateValue('fh-gst', fhGst)
  updateValue('fh-total-power-payment', fhTotalPowerPayment)
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
  updateValue('total-water', totalWater)
  updateValue('total-waste-water', totalWastewater)
  updateValue('water-rate', waterRate)
  updateValue('waste-water-rate', wastewaterRate)
  updateValueNonDec('bh-water', backHouseWater)
  updateValueNonDec('fh-water', frontHouseWater)
  updateValue('bh-water-rate', bhWaterRate)
  updateValue('bh-waste-percent', bhWastePercent)
  updateValue('bh-waste-rate', bhWasteRate)
  updateValue('bh-total-water-payment', bhTotalWaterPayment)
  updateValue('fh-water-rate', fhWaterRate)
  updateValue('fh-waste-percent', fhWastePercent)
  updateValue('fh-waste-rate', fhWasteRate)
  updateValue('fh-total-water-payment', fhTotalWaterPayment)
}

// Event listeners
document
  .getElementById('water-calculate-btn')
  .addEventListener('click', calculateWater)
document
  .getElementById('water-clear-btn')
  .addEventListener('click', clearWaterInputs)

// function copyPowerEmail() {
//   const textToCopy = document.getElementById('copy-power-email')

//   // Copy to clipboard
//   navigator.clipboard.writeText(textToCopy).then(
//     () => {
//       alert('Copied')
//     },
//     (err) => {
//       console.error('Failed to copy: ', err)
//     },
//   )
// }

// document
//   .getElementById('copy-btn-power')
//   .addEventListener('click', copyPowerEmail)
