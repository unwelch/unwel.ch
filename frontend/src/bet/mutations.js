import gql from 'graphql-tag'

export const deleteBet = gql`
  mutation deleteBet($id: String!) {
    deleteBet(id: $id) {
      id
    }
  }
`

export const acceptBet = gql`
  mutation acceptBet($id: String!) {
    acceptBet(id: $id) {
      userResponse
      user2Response
    }
  }
`

export const chooseWinner = gql`
  mutation chooseWinner($id: String!, $winner: Boolean!) {
    chooseWinner(id: $id, winner: $winner) {
      userResponse
      user2Response
    }
  }
`

export const addBet = gql`
  mutation addBet($quantity: String!, $statement: String!) {
    addBet(quantity: $quantity, statement: $statement) {
      id
    }
  }
`
