import { builder } from '../builder'

export class Giraffe {
  name: string
  birthday: Date
  heightInMeters: number

  constructor(name: string, birthday: Date, heightInMeters: number) {
    this.name = name
    this.birthday = birthday
    this.heightInMeters = heightInMeters
  }
}

builder.objectType(Giraffe, {
  name: 'Giraffe',
  description: 'Long necks, cool patterns, taller than you.',
  fields: (t) => ({
    name: t.exposeString('name', {}),
    age: t.int({
      resolve: (parent) => {
        // Do some date math to get an approximate age from a birthday
        const ageDifMs = Date.now() - parent.birthday.getTime()
        const ageDate = new Date(ageDifMs) // milliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      },
    }),
    height: t.float({
      resolve: (parent) => parent.heightInMeters,
    }),
    heightInFeet: t.exposeFloat('heightInMeters'),
  }),
})

builder.queryField('giraffe', (t) =>
  t.field({
    type: Giraffe,
    resolve: () => new Giraffe('James', new Date(Date.UTC(2012, 11, 12)), 5.2),
  })
)
