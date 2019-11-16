import jwt from 'jsonwebtoken'

const secret = 'BOSBAKSO'

export const verifyToken = (token) => {
  return jwt.verify(token, secret)
}

// export default {
//   generateToken: (payload) => {
//       return jwt.sign(payload, secret)
//   },
//   verifyToken: (token) => {
//     return jwt.verify(token, secret)
//   }
// }
