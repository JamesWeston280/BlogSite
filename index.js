import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [];

class PostData {
    constructor(index, title, content, date) {
        this.index = index;
        this.title = title;
        this.content = content;
        this.date = date;
    }
}

function CreatePost(title, body)
{
    const date = new Date();
    const postDate = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.toLocaleTimeString();

    var post = new PostData(posts.length, title, body, postDate);
    posts.push(post);
}

function DeletePost(index)
{
    posts.splice(index,1);

    for (var i = 0; i < posts.length; i++)
    {
        posts[i].index = i;
    }
}

function EditPost(index, title, content)
{
    if(title != "")
    {
       posts[index].title = title; 
    }

    if(content != "")
    {
        posts[index].content = content;
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res)=> {
    res.render("index.ejs", {Posts: posts});
});

app.get("/delete/:index", (req, res)=> {
    DeletePost(req.params.index);
    res.render("index.ejs", {PostIndex: req.params.index, Posts: posts});
});

app.post("/edited/:index", (req, res)=> {
    EditPost(req.params.index, req.body["title"], req.body["content"]);
    res.render("index.ejs", {PostIndex: req.params.index, Posts: posts});
});

app.get("/view/:index", (req, res)=> {
    res.render("view.ejs", {PostIndex: req.params.index, Posts: posts});
});

app.get("/newpost", (req, res)=> {
    res.render("newpost.ejs");
});


app.post("/", (req, res)=>{
    CreatePost(req.body["title"], req.body["content"])
    res.render("index.ejs",{Posts: posts});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    CreatePost("The Cat That Knew Too Much", "It started with a simple meow. At least, that’s what I thought. Mr. Whiskers had always been an odd cat, but lately, he’d been acting… smarter. Too smart. He’d stare at me with an intensity that made me nervous, like he was trying to tell me something. One night, as I was scrolling through my phone, he jumped onto my desk and nudged my laptop open. At first, I thought he just wanted attention, but then—his paw tapped the keyboard. And not just random taps. Actual words. Leave now. I laughed, assuming it was a coincidence. But then the lights flickered. A cold draft swept through the room. Mr. Whiskers meowed again—louder this time. His fur bristled. And then, behind me, I heard a whisper. I never did turn around. ");
    CreatePost("The Mysterious Package", "Last Tuesday, I found a package on my doorstep, addressed to someone I didn’t know. It was small, wrapped in brown paper, and had no return address. Curiosity got the better of me, so I brought it inside. I carefully unwrapped it to find a peculiar clock that ticked backwards. I tried to turn it off, but the moment I touched it, the room spun, and I was transported to a bustling street from the 1920s. People dressed in vintage clothing rushed past, and I realized I had time-traveled. Just as I was about to explore, the clock chimed, and I was pulled back to my living room, the package now empty. I looked around, bewildered, wondering if it was all a dream or if I had just stumbled upon a magical mystery.");
    CreatePost("The Vanishing Mirror", "I had always admired the old mirror in the attic, its ornate frame and shimmering surface that seemed to hold secrets. One evening, while cleaning the dusty corners of the room, I noticed something strange—the reflection wasn’t mine. At first, I thought it was a trick of the light, but as I stared, I saw a woman standing behind me, her eyes wide with fear. I spun around, but the room was empty. When I turned back, the mirror was gone. I searched frantically, but it was as if it had never existed. The next day, I returned to the attic, only to find a new mirror in its place. Same frame. Same shimmer. But no reflection at all.");
    CreatePost("The Whispering Woods", "The forest near my house had always felt strange, but I never paid it much attention until last weekend. I decided to take a walk through the trees, hoping to clear my mind. As I ventured deeper, I began hearing soft whispers, like voices carried by the wind. At first, I thought it was just the rustling of the leaves, but the whispers grew louder, more distinct. “Help us,” they said. “Find the stone.” I followed the sound, and soon enough, I stumbled upon an old stone hidden beneath the roots of a giant oak tree. I touched it, and the forest fell silent. A shadow crossed my path, and suddenly, the air felt colder. I quickly left, but I couldn’t shake the feeling that the woods were watching me now, waiting for me to return.");
});