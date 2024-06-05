import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "Payroll",
    password: "carolinenzioka59",
    port: 5432,
});

client.connect(function(err) {
    if (err) {
        console.log('Error connecting');
    } else {
        console.log('Connected');
    }
});


export default client;



