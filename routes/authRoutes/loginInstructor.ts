import Department from '../../controller/Department'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Instructor from '../../controller/Instructor'
import InstructorModel from '../../model/Instructor'
import { checkAvailability } from '../../utils/index'

export default async function (req: any, res: any, next: any) {
  try {
    // ----------------------------------------------------------
    // Add validation for signing up bellow
    // ----------------------------------------------------------
    // here....
    // ----------------------------------------------------------
    // Add validation for signing up above
    // ----------------------------------------------------------
    const { username, password, departmentInfo } = req.body

    // ----------------------------------------------------------
    // password validation
    // here....
    // password validation
    // ----------------------------------------------------------

    const instructorExists = await checkAvailability({
      type: 'instructor',
      username: username,
    })

    if (!instructorExists.exists) {
      res.status(403).send(instructorExists.message)
      return next()
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        instructorExists.result._doc.authData.password
      )

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            username,
            departmentInfo,
          },
          process.env.JWT_KEY!
        )

        res.json({
          ...instructorExists.result._doc,
          token,
          authData: {
            ...instructorExists.result._doc.authData,
            password: null,
          },
        })
      } else {
        res.status(403).send(`password is incorrect`)
      }
    }
  } catch (err) {
    throw err
  }
}
