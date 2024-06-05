const swaggerJsDocs=require('swagger-jsdoc');
const swaggerUi=require("swagger-ui-express");
const express=require("express");
const router =express.Router();

const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Hospital Management API',
            version:'1.0.0',
            description:'A sample SQL, express, nodejs api for hospital management'
        },
        servers:[
            {
                url:'https://hospital-management-production-88c6.up.railway.app/',
            },
        ],
    },
    apis:['./routes/*.js'],
}

const specs=swaggerJsDocs(options);

router.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));

module.exports=router;