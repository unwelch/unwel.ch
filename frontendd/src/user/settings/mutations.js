import gql from 'graphql-tag'

export const CHANGE_NAME = gql`
  mutation changeName($name: String!) {
    changeName(name: $name) {
      id
      name
    }
  }
`

export const ENABLE_PUSH_NOTIFICATIONS = gql`
  mutation enablePush {
    enablePush {
      id
      pushEnabled
    }
  }
`

export const DISABLE_PUSH_NOTIFICATIONS = gql`
  mutation disablePush {
    disablePush {
      id
      pushEnabled
    }
  }
`
