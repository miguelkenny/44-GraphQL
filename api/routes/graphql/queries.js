import { GraphQLString, GraphQLList, GraphQLID } from "graphql";
import { UserType, ProductType } from "./type.js";
import User from '../../models/User.js';
import Product from "../../models/Product.js";

//Consulta para devolver todos los uruarios
export const users = {
    type: new GraphQLList(UserType),
    description: "Retorna un objeto de usuarios",
    resolve() {
        return User.find()
    }
}

export const findOneUser = {
    type: UserType,
    description: "Get a single user by ID",
    args: {
        id: { type: GraphQLID }
    },
    resolve(_, args) {
        return User.findById(args.id)
    }
}

export const products = {
    type: new GraphQLList(ProductType),
    description: "Get a list of all products",
    resolve: () => Product.find()
}

export const product = {
    type: ProductType,
    description: "Get a list of product by ID",
    args: {
        id : { type: GraphQLID }
    },
    resolve: (_, { id }) => Product.findById(id)
}