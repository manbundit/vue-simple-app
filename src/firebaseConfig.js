import firebase from 'firebase'
import 'firebase/firestore'
import { config } from './config.js'

firebase.initializeApp(config)

const createUserApp = firebase.initializeApp(config, "CreateUserApp")

const db = firebase.firestore()
const auth = firebase.auth()
const fs = firebase.firestore 
const currentUser = auth.currentUser

const usersCollection = db.collection('users')

export {
    db,
    auth,
    currentUser,
    fs,
    createUserApp,
    usersCollection
}