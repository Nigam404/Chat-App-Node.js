const Sequelize=require("sequelize");

const sequelize=new Sequelize("chatdb","root","Nigam@12345",{
    dialect:"mysql",
    host:"localhost"
});

module.exports=sequelize;