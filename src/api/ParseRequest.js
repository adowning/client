import store from '@/store'

export class ParseRequest {
  constructor(options) {
    this.watchers = []
    this.definition = options.definition
    this.name = options.name
    this.vue = options.vue
  }
  updateData(data) {
    if (!Number.isNaN(Number(data))) return data
    if (Array.isArray(data)) {
      let result = data
      if (this.definition.result) result = data.map(x => this.definition.result.call(this, x))
      if (this.definition.sort) result = data.sort((a, b) => this.definition.sort.call(this, a, b))
      return result
    }
    return this.definition.result ? this.definition.result(data) : data
  }
  destroy() {
    for (const unwatch of this.watchers) unwatch()
  }
  dispatch() {
    this.setupHandler()
  }
  launch() {
    this.dispatch()
    this.setupWatchers()
  }
  setupWatchers() {}
  rewriteData(data) {
    this.vue.$data[this.name] = data
  }
  pushData(data) {
    this.vue.$data[this.name].push(data)
  }
  findDataIndex(func) {
    return this.vue.$data[this.name].findIndex(func)
  }
  setupHandler() {
    this.promise
      .then(result => {
        // //console.log(result)

        // //console.log(this.updateData(result))
        // //console.log(`${this.name}/update`, this.updateData(result).toJSON())

        // //console.log([this.name]`/${this.definition.action}`, this.updateData(result))
        // store.dispatch(`${this.name}/update`, this.updateData(result).toJSON())
        this.vue.$data[this.name] = this.updateData(result)
      })
      .catch(err => {
        this.vue.updateBus.$emit('showSnackBar', {
          show: true,
          color: 'error',
          icon: 'fa-exclamation',
          text: err,
          errorCode: err.code,
        })
      })
  }
}
