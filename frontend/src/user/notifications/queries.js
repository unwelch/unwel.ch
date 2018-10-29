import gql from 'graphql-tag'

export const NOTIFICATIONS_QUERY = gql`
  query {
    notifications {
      id
      message
      viewed
      visited
      createdAt
      sender {
        id
        name
        avatar
      }
      bet {
        id
      }
    }
  }
`
