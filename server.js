const app = require('./app');
const config = require('config');
const env = require('dotenv');
const db = require('./models/index');

env.config({path:"./config/config.env"});
config.get('jwtPrivateKey');
db.sequelize.sync({alter:true})
   .then(()=>{
    console.log(`db synced !`)
    })
    .catch((err)=>{
        console.log(`connection with database failed due to ${err}`)
    })

app.listen(process.env.PORT,()=>{
    console.log(`server started on PORT : ${process.env.PORT} !`)
})