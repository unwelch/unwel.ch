const features = {
  feed: userId =>
    userId === '6c888d04-4272-4bb3-b5f6-5cfb694db204' ||
    userId === '6125183a-8607-4602-9ad7-52a256de058b'
}

export const isFeatureEnabled = (userId, feature) =>
  process.env.NODE_ENV !== 'production' || features[feature](userId)
