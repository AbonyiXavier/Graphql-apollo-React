const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const  mongoose  = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");


const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/learn-graphql',
{ 
    useUnifiedTopology: true,
    useNewUrlParser: true 
  });
mongoose.connection.once('open', () => {
    console.log("Database connected");
})

app.use(cors());
// Entry point for GrapQl
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("server is running on port 4000...");
})