import gql from 'graphql-tag'

export const DELETE_BET_MUTATION = gql`
  mutation deleteBetMutation($id: String!) {
    deleteBet(id: $id) {
      id
    }
  }
`

export const ACCEPT_BET_MUTATION = gql`
  mutation acceptBetMutation($id: String!) {
    acceptBet(id: $id) {
      userResponse
      user2Response
    }
  }
`

export const CHOOSE_WINNER_MUTATION = gql`
  mutation chooseWinnerMutation($id: String!, $winner: Boolean!) {
    chooseWinner(id: $id, winner: $winner) {
      userResponse
      user2Response
    }
  }
`

export const ADD_BET_MUTATION = gql`
  mutation addBetMutation(
    $quantity: String!
    $statement: String!
    $isPrivate: Boolean
  ) {
    addBet(quantity: $quantity, statement: $statement, isPrivate: $isPrivate) {
      id
    }
  }
`
