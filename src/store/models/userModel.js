import Parse, { Profile } from 'parse'
import { prop, model } from '../plugins/parse'

@model('Activity')
export default class Activity extends Parse.Object {
  @prop() location
  @prop() startTime
  @prop() endTime
  @prop() details
  @prop() type
  @prop() color
  @prop() relatedItems
  @prop() icon
  @prop() geoPoint
  @prop() involvedParties
  @prop() profile
  @prop() active
  @prop() lastClockEvent
}
