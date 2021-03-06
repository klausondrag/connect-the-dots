let knexfile = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: "./backend/sql/db.sqlite"
        }
    },
    production: {
        client: 'mssql',
        connection: {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            server: process.env.DB_SERVER,
            database: process.env.DB_DATABASE,
            options: {
                encrypt: true,
            },
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
module.exports = knexfile[process.env.NODE_ENV || "development"];