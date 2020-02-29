// import Parse from 'parse'

export default {
  state: {
    subscriptionList: [],
  },

  actions: {
    setSubscriptions: async context => {
      //   const liveQueryList = await Parse.Cloud.run('getLiveQueryList')
      //   for (var className of JSON.parse(liveQueryList)) {
      //     const query = new Parse.Query(className)
      //     let subscription = await query.subscribe()
      //     subscription.on('create', object => {
      //       //console.log('create')
      //       context.commit('create' + className, object)
      //     })
      //     subscription.on('update', object => {
      //       //console.log('update')
      //       context.commit('update' + className, object)
      //     })
      //     subscription.on('delete', object => {
      //       //console.log('delete')
      //       context.commit('delete' + className, object)
      //     })
      //   }
      //   context.commit('SAVE_SUBSCRIPTIONS', liveQueryList)
      // },
    },
    mutations: {
      SAVE_SUBSCRIPTIONS: (state, liveQueryList) => {
        state.subscriptionList = liveQueryList
      },
    },
    getters: {
      getSubscriptions: state => {
        return state.subscriptionList
      },
    },
  },
}
