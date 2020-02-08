import { isNil, keys, cloneDeep } from 'lodash'
import firebase from 'firebase/app'
import { ParseQuery } from '../api/ParseQuery'
// firebase / firestore
// import firestore from 'firebase/firestore'
import firestore from './async-firestore'
import Vue from 'vue'

export default class GenericDB {
  constructor(objectClass, userId) {
    this.objectClass = objectClass
    this.userId = userId
  }

  /**
   * Create a document in the collection
   * @param data
   * @param id
   */
  async create(data, id = null) {
    const collectionRef = (await firestore()).collection(this.collectionPath)
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
    console.log(collectionRef)
    const dataToCreate = {
      ...data,
      createTimestamp: serverTimestamp,
      updateTimestamp: serverTimestamp,
    }

    const createPromise = isNil(id)
      ? // Create doc with generated id
        collectionRef.add(dataToCreate).then(doc => doc.id)
      : // Create doc with custom id
        collectionRef
          .doc(id)
          .set(dataToCreate)
          .then(() => id)

    const docId = await createPromise

    return {
      id: docId,
      ...data,
      createTimestamp: new Date(),
      updateTimestamp: new Date(),
    }
  }

  /**
   * Read a document in the collection
   * @param id
   */
  async read(id) {
    const result = await (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .get()

    const data = result.exists ? result.data() : null

    if (isNil(data)) return null

    this.convertObjectTimestampPropertiesToDate(data)
    return { id, ...data }
  }

  /**
   * Read all documents in the collection following constraints
   * @param constraints
   */
  async readAll(constraints = null) {
    // const collection = (await firestore()).collection(this.collectionPath)
    let query = collectionRef

    if (constraints) {
      constraints.forEach(constraint => {
        query = query.where(...constraint)
      })
    }

    const formatResult = result => result.map(ref => ref.toJSON())

    return query.find().then(formatResult)
  }
  /**
   * Read all documents in the collection following constraints
   * @param constraints
   */
  async readAll(constraints = null) {
    const collectionRef = (await firestore()).collection(this.collectionPath)
    let query = collectionRef

    if (constraints) {
      constraints.forEach(constraint => {
        query = query.where(...constraint)
      })
    }

    const formatResult = result =>
      result.docs.map(ref =>
        this.convertObjectTimestampPropertiesToDate({
          id: ref.id,
          ...ref.data(),
        }),
      )

    return query.get().then(formatResult)
  }

  /**
   * Update a document in the collection
   * @param data
   */
  async update(data) {
    const { id } = data
    const clonedData = cloneDeep(data)
    delete clonedData.id

    await (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .update({
        ...clonedData,
        updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })

    return id
  }

  /**
   * Delete a document in the collection
   * @param id
   */
  async delete(id) {
    return (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .delete()
  }

  async setupSubscription() {
    if (this.subscription) return
    if (!this.canSubscribe) return
    // Subscriptions
    this.subscription = await this.query.subscribe()
    switch (this.definition.action) {
      case 'first': {
        this.subscription.on('create', object => {
          this.rewriteData(this.updateData(object))
        })
        this.subscription.on('update', object => {
          this.rewriteData(this.updateData(object))
        })
        this.subscription.on('delete', () => {
          this.rewriteData(null)
        })
        break
      }
      default: {
        this.subscription.on('create', object => {
          const data = this.updateData(object)
          this.pushData(data)
        })
        this.subscription.on('update', object => {
          console.log(object)
          const data = this.updateData(object)
          const item = this.findDataIndex(x => x.id === object.id)
          if (item == -1) this.pushData(data)
          else Vue.set(this.vue.$data[this.name], item, data)
        })
        this.subscription.on('delete', object => {
          const item = this.findDataIndex(x => x.id === object.id)
          if (item != -1) this.vue.$data[this.name].splice(item, 1)
        })
        break
      }
    }
  }
  /**
   * Convert all object Timestamp properties to date
   * @param obj
   */
  convertObjectTimestampPropertiesToDate(obj) {
    const newObj = {}

    keys(obj)
      .filter(prop => obj[prop] instanceof Object)
      .forEach(prop => {
        if (obj[prop] instanceof firebase.firestore.Timestamp) {
          newObj[prop] = obj[prop].toDate()
        } else {
          this.convertObjectTimestampPropertiesToDate(obj[prop])
        }
      })

    return {
      ...obj,
      ...newObj,
    }
  }
}
