import GenericDB from './generic-db'

export default class UserTimesheetsDB extends GenericDB {
  constructor(userId) {
    super('Timesheet', userId)
  }

  // Here you can extend UserProductsDB with custom methods
}
