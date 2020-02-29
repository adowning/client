import ParseApi from '../../../api/parseApi'

export default {
  /**
   * Fetch profiles of current loggedin profile
   */
  // getUserProfile: async ({ rootState, commit }, user) => {
  //   //console.log(user)
  //   const profile = await getUserProfile(user)
  //   commit('setUserProfile', profile)
  // },
  changeCurrentProfile: async ({ rootState, commit }, payload) => {
    var _profile = rootState.profiles.userProfile
    parseApi.changeCurrentProfile(_profile, payload)
    // const query = new Parse.Query(PROFILE)
    // var profile = await query.get(Parse.User.current().get('profile').id)
    // profile.set(payload.field, payload.value)
    // await profile.save()
    // Profile.set(payload.field, payload.value)
  },
  getProfiles: async ({ rootState, commit }) => {
    const profiles = await getProfiles()
    commit('addProfiles', profiles)
  },
}
