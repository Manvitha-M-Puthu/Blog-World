import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const blogPosts = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

// app.post("/write",(req,res)=>{
//     res.render("index.ejs",{});
// });
app.post("/submit",(req,res)=>{
    if(blogPosts.length===0){
        res.render("index.ejs");
    }
    else{
        res.render("index.ejs",{Posts:blogPosts});
    } 
});

app.post("/post", (req,res)=>{
    blogPosts.push(req.body);
    console.log(blogPosts);
    res.render("index.ejs",{Posts:blogPosts});
})

app.post("/anotherBlog",(req,res)=>{
    res.render("index.ejs",{});
})

app.get("/blogPage",(req,res)=>{
    if(blogPosts.length===0){
        res.render("blogPage.ejs");
    }
    else{
        res.render("blogPage.ejs",{Posts:blogPosts});
    } 
});

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}...`);
});

