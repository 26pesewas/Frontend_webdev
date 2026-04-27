import express from "express";
import bodyParser from "body-parser";


const app  = express();
const port  = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get('/',(req,res) =>{
    res.render('index.ejs');
});

app.post('/submit', (req,res) => {
    res.render('create.ejs');
});

app.post('/view',(req,res) => {
    const title = req.body["blogTitle"];
    const content = req.body["blogContent"];
    
// 1. Check if a post with this title already exists in the array
    const index = posts.findIndex(p => p.title === title);

    if (index !== -1) {
        // 2. UPDATE: If it exists, change the content at that position
        posts[index].content = content;
        console.log("Post updated at index:", index);
        console.log(posts);
    } else {
        // 3. CREATE: If it doesn't exist, push a new object
        const newPost = {
            title: title,
            content: content,
        };
        posts.push(newPost);
        console.log(posts);
    }

    res.render('view_post.ejs',{
        blogTitle : title,
        blogContent: content,
    });

});

app.post('/edit',(req,res) => {
    const title = req.body["blogTitle"];
    const content = req.body["blogContent"];

    res.render("create.ejs",{
        existingTitle: title,
        existingContent: content,
    });
});

app.post('/delete',(req,res) => {
    // 1. Reset the array to empty
    posts = [];
    
    // 2. Log it so you can see the change in your terminal
    console.log("All posts deleted. Current array:", posts);

    // 3. Redirect the user to the homepage
    res.redirect('/');
})




