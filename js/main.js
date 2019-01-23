const compose = (...functions) => data =>
    functions.reduceRight((value, func) => func(value), data)

let list = [];

$description.onkeypress = () => {
    $description.classList.remove('is-invalid')
}

$calories.onkeypress = () => {
    $calories.classList.remove('is-invalid')
}

$carbs.onkeypress = () => {
    $carbs.classList.remove('is-invalid')
}

$protein.onkeypress = () => {
    $protein.classList.remove('is-invalid')
}

const attrsToString = (obj = {}) => {

  const keys = Object.keys(obj)
  const attrs = []

  for(let i = 0; i< keys.length; i++){
    let attr = keys[i]
    attrs.push(`${attr}="${obj[attr]}"`)
  }

  const string = attrs.join('')

  return string
}

const tagAttrs = obj => (content = '') =>
  `<${obj.tag}${obj.attrs ? ' ' :	 ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

const tag = t => {
  
    if(typeof t === 'string')
      return tagAttrs({ tag: t })
    
    return tagAttrs(t)
}
  


// const tableRow = items => tableRowTag(tableCells(items))
// Otra forma de hacerlo
const tableRowTag = tag('tr')
const tableRow = items => compose(tableRowTag, tableCells)(items)

const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')

const validateInputs = () => {

  ($description.value === '') ? $description.classList.add('is-invalid'): '';
  ($calories.value === '') ? $calories.classList.add('is-invalid'): '';
  ($carbs.value === '') ? $carbs.classList.add('is-invalid'): '';
  ($protein.value === '') ? $protein.classList.add('is-invalid'): '';

  if ($description.value && $calories.value && $carbs.value && $protein.value)
    add()

}

const add = () => {

  const newItem = {
    description:  $description.value,
    calories:     parseInt($calories.value),
    carbs:        parseInt($carbs.value),
    protein:      parseInt($protein.value),
  }

  list.push(newItem)
  cleanInputs()
  updateTotals()
  renderItems()

}

const updateTotals = () => {
  let calories = 0, carbs = 0, protein = 0

  list.map(item => {
    calories += item.calories,
    carbs += item.carbs,
    protein += item.protein
  })

  $totalCalories.textContent  = calories
  $totalCarbs.textContent     = carbs
  $totalProtein.textContent   = protein
}

const cleanInputs = () => {
  $description.value  = ''
  $calories.value     = ''
  $carbs.value        = ''
  $protein.value      = ''
}

const renderItems = () => {
  $('tbody').empty()

  list.map(item => {
    $('tbody').append(tableRow([item.description, item.calories, item.carbs, item.protein]))
  })
}