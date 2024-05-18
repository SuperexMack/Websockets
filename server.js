const { createServer } = require("http")
const PORT = 8000
const { Server } = require("socket.io")
const httpServer = createServer()
const io = new Server(httpServer, {

    cors: {
        origin: "http://localhost:5173"
    }
})

let AllScore = []

io.on("connection", (socket) => {
    // console.log(data)
    socket.on("score", (scores) => {
        AllScore.push({ ...scores, id: socket.id })
        console.log(AllScore)
    })

    setInterval(() => {
        socket.emit("playerScore", AllScore)
    }, 1000)


})



httpServer.listen(PORT, () => [
    console.log(`server is running in the port number ${PORT}`)
])