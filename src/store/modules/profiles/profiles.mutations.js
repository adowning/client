export default {
  /* Profile input name */
  // setProfileNameToCreate: (state, profileNameToCreate) => (state.profileNameToCreate = profileNameToCreate),

  /* Profiles */
  // setProfiles: (state, profiles) => (state.profiles = profiles),
  // setUserProfile: (state, profile) => Object.assign(state.userProfile, profile),
  setUserProfile: (state, profile) => (state.userProfile = profile),

  updateProfile: (state, profile) => {
    for (var i in state.profiles) {
      if (state.profiles[i].id == profile.id) {
        console.log('foudn it')
        state.profiles[i] = profile
        break //Stop this loop, we found it!
      }
    }
  },
  addProfiles: (state, profiles) => {
    !state.profiles ? (state.profiles = []) : null
    profiles.forEach(profile => {
      state.profiles.push(profile)
    })
  },
  removeProfileById: (state, profileId) => {
    const index = state.profiles.findIndex(profile => profile.id === profileId)
    state.profiles.splice(index, 1)
  },
  removeAllProfiles: state => {
    state.profiles = []
  },

  // /* Profiles deletion */
  // addProfileDeletionPending: (state, profileId) => state.profileDeletionPending.push(profileId),
  // removeProfileDeletionPending: (state, profileId) => {
  //   const index = state.profiles.findIndex(profile => profile.id === profileId)
  //   state.profileDeletionPending.splice(index, 1)
  // },

  // /* Profile creation */
  // setProfileCreationPending: (state, value) => (state.profileCreationPending = value),
}
