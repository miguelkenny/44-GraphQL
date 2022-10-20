import { GraphQLString, GraphQLList, GraphQLID } from "graphql";
import { UserType } from "./type.js";
import User from '../../models/User.js';

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