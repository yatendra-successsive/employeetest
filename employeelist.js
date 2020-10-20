const graphql = require('graphql');
const Employee_details = require('./employee');
console.log(Employee_details);


const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;


const EmployeeType = new GraphQLObjectType({
    name: 'Employee_details',
    fields: () => ({
        Employee_ID: { type: GraphQLID  },
        First_Name: { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        /*employee_details: {
            type: EmployeeType,
            args: { Employee_ID: { type: GraphQLID } },
            resolve(parent, args) { 
                return employee_details.findById(args.Employee_ID);
            }
        },*/

     Employee_details:{
            type: new GraphQLList(employee_details),
            resolve(parent, args) {
                return Employee_details.find({});
            }
        }}     

});

module.exports = new GraphQLSchema({
    query: RootQuery
});
