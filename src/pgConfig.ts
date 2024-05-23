import { Sequelize} from "sequelize";


const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'system',
    database: 'postgres',
    port: 5432,
  });

  // checking wheather the database is connected or not
sequelize.authenticate().then(()=>{
    console.log("Database connected to postgres")
}).catch((err)=>{
    console.log("Unable to connect to the Database"+err)
})

//syncronizing with database
sequelize.sync().then(()=>{
    console.log('Models synchronized with the database.');
}).catch((err)=>{
    console.log("Unable to syncronize the database"+err)
})



export default sequelize;