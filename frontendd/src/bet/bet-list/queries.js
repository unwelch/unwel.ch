import gql from 'graphql-tag'

export const BET_LIST = gql`
  query {
    currentUser {
      id
      name
      avatar
    }
    bets {
      id
      quantity
      user {
        id
        avatar
        name
      }
      user2 {
        id
        avatar
        name
      }
      statement {
        statement
      }
      userResponse
      user2Response
      createdAt
    }
  }
`
