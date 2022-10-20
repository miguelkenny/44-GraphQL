import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { register, login, createProduct, updateProduct } from './mutations.js'
import { users, findOneUser, products, product } from './queries.js'

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        users,
        findOneUser,
        products,
        product
    },
})

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'The mutation type',
    fields: {
        register,
        login,
        createProduct,
        updateProduct
    }
})

export default new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})