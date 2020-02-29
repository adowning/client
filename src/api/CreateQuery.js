/* global Parse */
const QueryCreator = {
  createQuery: className => {
    const ClassName = Parse.Object.extend(className)
    return new Parse.Query(ClassName)
  },
}

export default QueryCreator
