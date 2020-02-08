import { ParseRequest } from './ParseRequest'
import { Cloud } from 'parse'
export class ParseFunction extends ParseRequest {
  getParams() {
    return typeof this.definition.params === 'function' ? this.definition.params.call(this.vue) : this.definition.params
  }
  dispatch() {
    this.promise = Cloud.run(this.definition.function, this.getParams())
    super.dispatch()
  }
  setupWatchers() {
    super.setupWatchers()
    if (!this.definition.params) return
    this.watchers.push(
      this.vue.$watch(
        () => this.getParams.call(this),
        n => {
          this.dispatch()
        },
      ),
    )
  }
}
