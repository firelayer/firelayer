import { auth } from '../index'

export const signUp = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password)
}

export const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password)
}

export const signInWithProvider = (provider) => {
  const driver = getProviderInstance(provider.id)

  return auth().signInWithPopup(driver)
}

export const getProviderInstance = (providerId) => {
  switch (providerId) {
  case 'google': return new auth.GoogleAuthProvider()
  case 'facebook': return new auth.FacebookAuthProvider()
  case 'apple': return new auth.OAuthProvider('apple.com')
  case 'twitter': return new auth.TwitterAuthProvider()
  case 'github': return new auth.GithubAuthProvider()
  case 'microsoft': return new auth.OAuthProvider('microsoft.com')
  case 'yahoo': return new auth.OAuthProvider('yahoo.com')
  }

  return new Error(`Provider '${providerId}' not found.`)
}
