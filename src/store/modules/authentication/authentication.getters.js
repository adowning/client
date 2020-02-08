import { isNil } from 'lodash'

export default {
  isUserLoggedIn: state => !isNil(state.user),
  user: state => state.user,
}
