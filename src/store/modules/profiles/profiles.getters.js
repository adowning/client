import { find } from 'lodash'

export default {
  /**
   * Check if a profile has deletion pending
   */
  // isProfileDeletionPending: state => profileId => state.profileDeletionPending.includes(profileId),
  /**
   * Get profile by id
   */
  getProfileById: state => profileId => find(state.profiles, profile => profile.id === profileId),
}
