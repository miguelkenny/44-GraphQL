import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

//Creamos un tipo de dato para devolver los usuarios en un objeto
export const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "The user type",
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        nombre: { type: GraphQLString },
        direccion: { type: GraphQLString },
        edad: { type: GraphQLString },
        numCel: { type: GraphQLString },
        file: { type: GraphQLString },
        isAdmin: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }
})

export const ProductType = new GraphQLObjectType({
    name: "ProductType",
    description: "The product type",
    fields: {
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        img: { type: GraphQLString },
        categories: { type: GraphQLString },
        size: { type: GraphQLString },
        color: { type: GraphQLString },
        price: { type: GraphQLString },
        inStock: { type: GraphQLString },
    }
})