import Base from '../base';

// this is the user schema we are importing
import User from '../user/schema';

const Category = `

  extend type Query {
    Category(_id: ID!): Category
    Categories: [ Category ]
  }

  type Category {
    _id: ID!
    id: ID
    Farmer: User
    name: String
    category: String
    currentMonthDetail: MonthDetail
    currentMonthChanges: [ ChangeTracker ]
  }

  type MonthDetail {
    openingTotal: Int
    closingTotal: Int
    period: String
    changes: DetailSummary
  }

  type DetailSummary {
    add: Int
    purchase: Int
    death: Int
    theft: Int
    sale: Int
    other: Int
  }

  type ChangeTracker {
    createdAt: Date
    reasonForChange: String
    animalsMoved: Int
    notes: String
  }

  extend type Mutation {
    createCategory( farmer_id: ID, name: String, category: String ): Category
    createNewChange(id: ID, createdAt: Date, reasonForChange: String, animalsMoved: Int): Category
  }
`;

// NOTE: successfully implemented mutations, next will be querying with a react front end and authentication

export default () => [ Category, User, Base ];
