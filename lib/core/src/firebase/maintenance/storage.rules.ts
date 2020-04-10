export default `service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if isSuperAdmin();
    }

    // Helpers for users
    function isLogged() { return request.auth != null && request.auth.token.email_verified }
    function isSuperAdmin() { return isLogged() && request.auth.token.admin == 1 }
  }
}
`
