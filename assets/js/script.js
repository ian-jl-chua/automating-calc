// Function to update all elements with the same data-key
function updateValue(key, value) {
  const elements = document.querySelectorAll(`[data-key="${key}"]`)
  elements.forEach((element) => {
    element.textContent = value ? value.toFixed(2) : '__'
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
  updateValue('bh-power', backHouseKwh)
  const bhGst = (fixedChargeHalved + bhVariableCharge) * 0.15
  updateValue('bh-gst', bhGst)
  const bhTotalPowerPayment = fixedChargeHalved + bhVariableCharge + bhGst
  updateValue('bh-total-power-payment', bhTotalPowerPayment)

  // Front house calculations
  const fhVariableCharge = variableCharge * (frontHouseKwh / totalKwh)
  updateValue('fh-variable-charge', fhVariableCharge)
  updateValue('fh-power', frontHouseKwh)
  const fhGst = (fixedChargeHalved + fhVariableCharge) * 0.15
  updateValue('fh-gst', fhGst)
  const fhTotalPowerPayment = fixedChargeHalved + fhVariableCharge + fhGst
  updateValue('fh-total-power-payment', fhTotalPowerPayment)

  // Update other values
  updateValue('variable-charge', variableCharge)
  updateValue('total-power-used', totalKwh)
}

// Event listeners
document
  .getElementById('calculate-btn')
  .addEventListener('click', calculatePower)
document
  .getElementById('power-clear-btn')
  .addEventListener('click', clearPowerInputs)
