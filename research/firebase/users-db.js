import GenericDB from './generic-db'
import Parse from 'parse'

export default class UsersDB extends GenericDB {
  constructor() {
    super('User')
  }

  // Here you can extend UserDB with custom methods
  async read(id) {
    if (!id) {
      return null
    }
    Parse.Object.extend(this.definition.object)
  }
}
