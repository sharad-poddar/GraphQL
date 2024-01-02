const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const {default: axios} = require('axios')

const {users} = require('./user');
const {todo} = require('./userTodo'); 


async function startServer(){
    const app = express();
    const server = new ApolloServer({
        // defining querys type or structure
        typeDefs: `
            type user{
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
            }

            type todo {
                id: ID!
                title: String!
                completed: Boolean
                user: user
            }
             
            type Query {
                getUsers: [user],
                getTodos: [todo],
                getUserById(id: ID!): user,
            }
        `,
        // defining the logic what is returning
        resolvers: {
            todo: { 
                // user: async(todo)=> { 
                //     return (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data   
                // }

                user: (todo) => users.find(e => e.id == todo.id),
            },
            Query: {
                // getTodos: async()=> { 
                //     return (await axios.get('https://jsonplaceholder.typicode.com/todos')).data   
                // },
                // getUsers: async()=> { 
                //     return (await axios.get('https://jsonplaceholder.typicode.com/users')).data   
                // },
                // getUserById: async(parent, {id})=> { 
                //     return (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data   
                // },

                getTodos: () => todo,
                getUsers: () => users,
                getUserById: (parent, {id}) => users.find(e => e.id == id),

            }
        }
    });


    // middleware, extract and parse the data
    app.use(bodyParser.json());
    // Cross-Origin Resource Sharing, middleware, mechnisms of resrictions of api requests
    app.use(cors());

    await server.start()

    app.use('/graphql', expressMiddleware(server))

    const PORT = 3500;
    app.listen(PORT, ()=>{
        console.log('server is runnign at port: ',PORT)
    })

}

startServer();
