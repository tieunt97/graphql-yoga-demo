import { GraphQLServer } from 'graphql-yoga'
import * as db from './db'

class GraphYoga {
    public server: GraphQLServer

    private readonly typeDefs = [
        `
        type Query {
            hello(name: String): String!
            product(id: Int): City
            products: [City]
            person_name(name: String): Person
            persons_gender(gender: String): Person
            persons: [Person]
        }
        type City {
            id: Int!
            name: String!,
        }
        type Person {
            name: String!
            age: Int!
            gender: String!
        }
        `
    ]

    private readonly resolvers = {
        Query: {
            hello: (_, { name }) => `Hello ${name || 'World 1'}`,
            product: (_, { id }) => {
                return db.default.cities.find((e) => { return e.id == id })
            },
            products: () => {
                return db.default.cities
            },
            person_name: (_, { name }) => {
                return db.default.persons.find((e) => e.name === name)
            },
            persons_gender: (_, { gender }) => {
                return db.default.persons.find((e) => e.gender === gender)
            },
            persons: () => {
                return db.default.persons
            }
        }
    }

    constructor() {
        this.server = new GraphQLServer({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers
        })
    }
}

export default new GraphYoga().server
