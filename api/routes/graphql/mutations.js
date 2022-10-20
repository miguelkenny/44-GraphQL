import pkg, { GraphQLList, GraphQLID } from 'graphql'
import CryptoJS from 'crypto-js'
import User from '../../models/User.js'
import Product from '../../models/Product.js'
import { config } from 'dotenv'
import { createJWTToken } from '../auth.js'
import { ProductType } from './type.js'

config()

const { GraphQLString } = pkg

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
        size: { type: new GraphQLList(GraphQLString) },
        color: { type: new GraphQLList(GraphQLString) },
        price: { type: GraphQLString },
        inStock: { type: GraphQLString },
    },
    async resolve(_, args) {
        const newProduct = new Product(args)

        await newProduct.save()

        return newProduct
    }
}

export const updateProduct = {
    type: ProductType,
    description: "Update a product",
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        img: { type: GraphQLString },
        categories: { type: new GraphQLList(GraphQLString) },
        size: { type: new GraphQLList(GraphQLString) },
        color: { type: new GraphQLList(GraphQLString) },
        price: { type: GraphQLString },
        inStock: { type: GraphQLString }
    },
    async resolve(_, args) {
        const updatedProduct = await Product.findByIdAndUpdate(
            {
                _id: args.id
            },
            {
                title: args.title,
                desc: args.desc,
                img: args.img,
                categories: args.categories,
                size: args.size,
                color: args.color,
                price: args.price,
                inStock: args.inStock,
            },
            {
                new: true,
                runValidators: true
            }
        )

        return updatedProduct
    }
}

export const deleteProduct = {
    type: GraphQLString,
    description: "Delete a product",
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_, { id }) {
        const productDeleted = await Product.findOneAndDelete({ _id: id })
        
        if(!productDeleted) throw new Error ("Product " + id + " not found")
        
        return "Product Deleted"
    }
}