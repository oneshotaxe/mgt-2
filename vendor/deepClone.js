function deepClone(value) {
  return clone(value)
}

function cloneObj(obj) {
  const newObj = new obj.constructor()
  for (let key in obj) {
    const newField = clone(obj[key])
    if (newField !== undefined) {
      newObj[key] = newField
    }
  }
  return newObj
}

function cloneArr(arr) {
  return arr.map(value => clone(value))
}

function clone(field) {
  if (isPrimitive(field)) {
    return field
  } else if (Array.isArray(field)) {
    return cloneArr(field)
  } else if (field instanceof Object) {
    return cloneObj(field)
  }
  return undefined
}

function isPrimitive(value) {
  const type = typeof value
  return type == 'string' || type == 'number' || type == 'boolean'
}

module.exports = deepClone