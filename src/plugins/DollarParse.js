import Parse from 'parse'
export default class DollarParse {
  constructor(reqs) {
    if (reqs.length > 0) {
      //console.log(reqs)
    }
    this.reqs = reqs
  }
  launch() {
    this.reqs.forEach(x => {
      //console.log(x)
      x.launch()
    })
  }
  destroy() {
    this.reqs.forEach(x => x.destroy())
  }
  enumerate() {
    return this.reqs.map(x => x.name)
  }
  async wait() {
    await Promise.all(this.reqs.map(x => x.promise))
  }
  get logIn() {
    //console.log('logging in')
    try {
      return Parse.User.logIn.bind(Parse.User)
    } catch (e) {
      global.updateBus.$emit('showSnackBar', {
        show: true,
        color: 'error',
        icon: 'fa-exclamation',
        text: err,
        errorCode: err.code,
      })
    }
  }
  get logOut() {
    return Parse.User.logOut
  }
  get user() {
    return Parse.User.current()
  }
  get run() {
    return Parse.Cloud.run
  }
  get getJobsData() {
    return Parse.Cloud['getJobsData']
  }
  get startJob() {
    return Parse.Cloud['startJob']
  }
  get getJobStatus() {
    return Parse.Cloud['getJobStatus']
  }
}
