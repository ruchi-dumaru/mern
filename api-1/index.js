const http = require("http"); //es5
const app=require("./src/config/express.config.js");


// const httpServer= http.createServer((req,res)=>{
// if(req.method==='GET' && req.url==='/product'){
//   let product=[];
//   res.end(JSON.stringify(product));
// }else if(req.method==='GET' && req.url==='/home'){
//   res.end("This is home default page");
// }else{
//   res.end("Hello World");
// }
// })

const httpServer=http.createServer(app)

const HOST = "127.0.0.1";
const PORT = "9001";

httpServer.listen(PORT, HOST, (err) => {
  console.log("Server is running successfully...");
});
