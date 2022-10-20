import pkg from 'graphql'
import CryptoJS from 'crypto-js'
import User from '../../models/User.js'
import Product from '../../models/Product.js'
import { config } from 'dotenv'
import { createJWTToken } from '../auth.js'
import { ProductType } from './type.js'

config()

const { GraphQLString, GraphQLList } = pkg

export const register = {
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        nombre: { type: GraphQLString },
        direccion: { type: GraphQLString },
        edad: { type: GraphQLString },
        numCel: { type: GraphQLString },
        file: { type: GraphQLString },
        isAdmin: { type: GraphQLString },
    },
    description: 'Register a new User',
    async resolve(_, args) {
        const { username, email, password, nombre, direccion, edad, numCel, file, isAdmin } = args

        const newUser = new User(
            {
                username,
                email,
                password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
                nombre,
                direccion,
                edad,
                numCel,
                file,
                isAdmin
            })

        await newUser.save()

        const token = createJWTToken(newUser);

        return token
    }
}

export const login = {
    type: GraphQLString,
    description: 'Login a user and return a token',
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_, args) {
        const user = await User.findOne({ username: args.username })

        const hasPassword = user ? CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8) : null

        if (user === null || hasPassword !== args.password) throw new Error("Credenciales Incorrectas")

        const token = createJWTToken(user)

        return token
    }
}

export const createProduct = {
    type: ProductType,
    description: "Create a new product",
    args: {
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        img: { type: GraphQLString },
        categories: { type: new GraphQLList(GraphQLString) },
        size: { type: GraphQLString },
        color: { type: GraphQLString },
        price: { type: GraphQLString },
        inStock: { type: GraphQLString },
    },
    async resolve(_, args) {
        const newProduct = new Product(args)
        
        await newProduct.save()

        return newProduct
    }
}