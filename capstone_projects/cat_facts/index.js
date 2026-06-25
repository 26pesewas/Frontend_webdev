import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const MY_URL = "https://cataas.com/"

app.use(express.static("public"));

app.get("/", (req,res) =>{
    res.render("index.ejs");
})

app.get("/cats", (req,res) =>{
    res.render("cats.ejs");
})

// display random picture of cat
app.get("/random-cat", async (req, res) => {
     try {
    const catImageUrl = "https://cataas.com/cat";
    // console.log(catImageUrl);
    res.render("cats.ejs" , {catImage: catImageUrl});
  } catch (error) {
      res.render("cats.ejs", { catImage:null, error: "No cat available 😿" });
    }
});


app.get("/random-saying", async (req, res) => {
     try {
    const catSays = "https://cataas.com/cat/says/free me";
    res.render("cats.ejs" , {catTalk: catSays});
  } catch (error) {
      res.render("cats.ejs", { catImage:null, error: "No cat available 😿" });
    }
});


app.get("/filter-cats", async (req, res) => {
  const searchId = req.body.id;
     try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs" , {content: JSON.stringify(result.data)});
  } catch (error) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});

