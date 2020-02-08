import firebase from 'firebase/app'
import { isNil } from 'lodash'
import axios from 'axios'
import store from '@/store'
// curl -X POST \
//   {{host}}/parse/users \
//   -H 'content-type: application/json' \
//   -H 'x-parse-application-id: {{ParseAppId}}' \
//   -d '{
//     "authData": {
//     	"firebase": {
//     		"access_token": "{{access_token}}",
//     		"id": "{{FirebaseUID}}"
//     	}
//     }
// }'
const api = axios.create({
  baseURL: 'https://api.ashdevtools.com/parse',
  timeout: 1000,
  headers: { 'X-Parse-Application-Id': 'AndrewsApp' },
})

firebase.auth().onAuthStateChanged(async firebaseUser => {
  const actionToDispatch = isNil(firebaseUser) ? 'logout' : 'login'
  store.dispatch(`authentication/${actionToDispatch}`, firebaseUser)
  // console.log(firebaseUser._lat)
  // console.log(firebaseUser.uid)

  //  .then(
  // function(user) {
  //   // The current user is now set to user.
  // },
  // function(error) {
  //   // The token could not be validated.
  //   console.log(error)
  // },
  // )
  // {"objectId":"qFhr7MnGam","addressList":{"street":"Charleston Park","streetNumber":"3954","zipcode":"75701","city":"Tyler","state":"TX","formattedAddress":"3917 Hanover pl","geoPoint":{"lat":32.3188508,"lng":-95.2466747}},"phoneList":["903-530-1197"],"thirdPartyAuth":[{"humanityId":"1444044"}],"skillSet":[],"lastLocationTime":{"__type":"Date","iso":"2020-01-30T03:09:02.655Z"},"lastLocation":{"__type":"GeoPoint","latitude":32.31121,"longitude":-95.263391},"officePhoneInfo":{"ip":"192.168.1.14","username":null,"password":"andrews1"},"firstName":"Ash","lastName":"Downing","username":"t8q4QZbl1rz9iNvDHbqR3zYsq","email":"a.downing@ashdevtools.com","receiveEmails":true,"active":false,"isClocked":false,"deskPhone":"19035663081","qrcode":"a0a685c3-da3e-4520-9f7e-7c86a9f3200a","createdAt":"2020-01-30T03:09:04.897Z","updatedAt":"2020-01-30T20:58:58.776Z","avatar":{"__type":"File","name":"8b518fb5833b6b3b691748cdc69320af_defaultProfile.jpg","url":"http://localhost:1337/parse/files/AndrewsApp/8b518fb5833b6b3b691748cdc69320af_defaultProfile.jpg"},"authData":{"firebase":{"access_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1OTc0MmQyNjlhY2IzNWZiNjU3YzBjNGRkMmM3YjcyYWEzMTRiNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXNkZjEyMy0xNTM3NTQzMDQ4MDUzIiwiYXVkIjoiYXNkZjEyMy0xNTM3NTQzMDQ4MDUzIiwiYXV0aF90aW1lIjoxNTgwNDE2MjMwLCJ1c2VyX2lkIjoiTmJGUmNVdUlicmJHRWFLa2UwYnBybFcxMzRkMiIsInN1YiI6Ik5iRlJjVXVJYnJiR0VhS2tlMGJwcmxXMTM0ZDIiLCJpYXQiOjE1ODA0MTYyMzAsImV4cCI6MTU4MDQxOTgzMCwiZW1haWwiOiJhc2RmQGFzZGYuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFzZGZAYXNkZi5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.jXDINBUmO_rkzXaGKXKTMPry5MsDL2XDwEYeDxJE7WQbjL-9shNdbpFQ7dBpmpogjrX_yQr44drimoy0oLz-A4iUXGtVD0arFX0NafDRy0CkTDx6Yd67eU79mBqhPQdvVkkqExkDNVP8G4kUJeJ0XbjiM89FWRE2GdfkzlSVpUZb8Qt7edd4058RQ2pCLFz0jBvsRGNqHn66oJDAMW6QwNa4UpkBM_6HkbCNFjsyRZKvdWm2srgzgHt47FGEdPIohsWRlVIwih5BNikcA_HJf8y5kI_3CUKfq156awSCbUiNHLjeNbW1dhC2zzmTet02AwjZPiGR4vopLVJie8iDdw","id":"NbFRcUuIbrbGEaKke0bprlW134d2"}},"ACL":{"*":{"read":true},"qFhr7MnGam":{"read":true,"write":true}},"sessionToken":"r:91f68960061a65648e8dec93129ad5c1"}
  // console.log(actionToDispatch)
  // console.log(parseUser)
  // console.log(firebaseUser)
})
