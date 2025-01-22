// Function to update all elements with the same data-key
export function updateValue(key, value) {
  const elements = document.querySelectorAll(`[data-key="${key}"]`)
  elements.forEach((element) => {
    element.textContent = value ? value.toFixed(2) : '__'
  })
}

export function updateValueNonDec(key, value) {
  const elements = document.querySelectorAll(`[data-key="${key}"]`)
  elements.forEach((element) => {
    element.textContent = value ? Math.round(value) : '__'
  })
}