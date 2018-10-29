import { pipe, flatten, values } from 'ramda'
import path from 'path'

// Requires all the project searching for controller.js
const controllers = require('glob-require-dir')(path.join(__dirname, '/**/controller'))

// controller.js should contain an Array of routes defined like that:
// https://www.fastify.io/docs/latest/Routes/
export default pipe(values, flatten)(controllers)

// TODO: Validate routes:
//     - Check that contains an Array
//     - Check for url/method conflicts
