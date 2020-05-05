export default `{
  "rules": {
    "_settings": {
      ".read": true,
      ".write": false
    },
    "_users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": false
      }
    }
  }
}`
