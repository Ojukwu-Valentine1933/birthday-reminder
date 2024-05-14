const http = require("http");
const app = require("./app");
const mongoose = require("mongoose")
const { DB_URI } = require("./config/dotEnv");
const httpServer = http.createServer(app);
const { PORT } = require("./config/dotEnv");

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const startServer = async () => {
    httpServer.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};



startServer();




