import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.locale(en)
// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

export default date => timeAgo.format(date)
