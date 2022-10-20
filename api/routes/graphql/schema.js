import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { register, login, createProduct } from './mutations.js'
import { users, findOneUser } from './queries.js'

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        users,
        findOneUser
    },
})

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'The mutation type',
    fields: {
        register,
        login,
        createProduct
    }
})

export default new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})