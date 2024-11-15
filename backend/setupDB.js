const mysql = require('mysql2/promise')
require('dotenv').config()

async function setupDatabase() {
    try {
        // Connect to the MySQL database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log("Connected to the database.");
        const genres = ["action", "trending", "comedy", "thriller", "drama", "romance", "scifi"]
        // Define SQL queries for table creation
       for(const genre of genres) {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${genre} (
                id INT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                release_date DATE,
                overview TEXT,
                vote_average DECIMAL(3, 1),
                media_type VARCHAR(50),
                image_path VARCHAR(255),
                backdrop_path VARCHAR(255),
                genre_id INT
            );`

            await connection.execute(createTableQuery);
            console.log(`${genre} table created (if it didn't already exist).`);
    }

        // Execute the table creation queries
       
        // Close the connection
        await connection.end();
        console.log("Database setup completed.");
    } catch (error) {
        console.error("Error setting up the database:", error.message);
    }
}

// Run the setup function
setupDatabase();