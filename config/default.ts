const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

export default {
    port: 3000,
    dbUri: `mongodb+srv://${dbUser}:${dbPass}@cluster0.mzo8r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    env: "development"
}
//2601263 