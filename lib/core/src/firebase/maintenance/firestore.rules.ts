export default `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow get, write: if isSuperAdmin();
      allow list: if isSuperAdmin() && isListQueryValid();
    }

    // List query permissions
    function isListQueryValid() { return request.query.limit <= 15 }

    // Helpers for users permissions
    function isLogged() { return request.auth != null && request.auth.token.email_verified }
    function isSuperAdmin() { return isLogged() && request.auth.token.admin == 1 }
  }
}`
