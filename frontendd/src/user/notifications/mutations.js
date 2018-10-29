import gql from 'graphql-tag'

export const MARK_NOTIFICATIONS_VIEWED_MUTATION = gql`
  mutation markNotificationsViewedMutation($ids: [String!]) {
    markNotifcationsViewed(ids: $ids) {
      id
      viewed
    }
  }
`

export const MARK_NOTIFICATIONS_VISITED_MUTATION = gql`
  mutation markNotificationsVisitedMutation($id: String!) {
    markNotifcationsVisited(id: $id) {
      id
      visited
    }
  }
`
