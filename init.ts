import initialiseDatabase, { DB_PATH } from "@/lib/db/initialise";

(async () => {
    // Log the path being used
    console.log("Initialising database using database path: ", DB_PATH);

    // Initialise the database
    initialiseDatabase();
})();
