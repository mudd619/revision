
var page = 1

let pushh = document.getElementById("one")
window.addEventListener("scroll",()=>{
    const {scrollHeight} = document.documentElement;

    
    let loading = document.getElementById("two")
    if(window.scrollY + window.innerHeight >= scrollHeight){
        
        loading.innerText = "...Loading"
        console.log("aaa")
        display();
        
    }
    
})


// suggestin function for search bar
async function Throttle(){
    let inpshow = document.getElementById("inpshow");
    let val = document.getElementById("take").value
    inpshow.innerText = ""
    if(val.length < 2){
        inpshow.style.display = "none"
        return false
    }

    let data = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=ed47e1f3&s=${val}&page=${page}`);
    data = await data.json() 

    // data = data.results.slice(init,page);
    // init = init + page;
    

    if(data.Response === "False"){
        inpshow.innerText = "No results found"
        return
    }
    data.Search.map((el)=>{
        let section = document.createElement("div");
        section.setAttribute("style","padding:10px;")
        section.setAttribute("id","section");
        console.log(el.Title)
        section.addEventListener("click",()=>{
            document.getElementById("take").value = el.Title;
            inpshow.style.display = "none";
        })
        section.innerText = el.Title
        inpshow.append(section)
    })

    inpshow.style.display = "block";

    
    return data;
}

var id = undefined


//throtling takes places
async function change(){
    
    let inpshow = document.getElementById("inpshow");
    let val = document.getElementById("take").value
    if(val.length < 2){
        inpshow.style.display = "none"
        return false
    }

    inpshow.innerText = "...loading"
    inpshow.style.display = "block";
    if(id){
        return;
    }
    
    id = setTimeout(()=>{
        Throttle();
        id = undefined
    },2000)

    
}


//button onclick event
let click = document.getElementById("click");
click.addEventListener("click",async ()=>{
    let inpshow = document.getElementById("inpshow");
    pushh.innerHTML = "";
    inpshow.style.display = "none";
    page=1
    display()
})

//to remove the pop div during search
function remove(){
    let inpshow = document.getElementById("inpshow");
    inpshow.style.display = "none"
}

//to add the pop section back if clicked on input
function add(){
    let inpshow = document.getElementById("inpshow");
    
    if(document.getElementById("take").value.length < 2){
        return
    }
    inpshow.style.display = "block"
}


//function that displays in html
async function display(){

    let loading = document.getElementById("two")

    let vall = document.getElementById("take").value;
    
   
    let data = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=ed47e1f3&s=${vall || "star"}&page=${page}`);
    data = await data.json() 
    if(!data[0]){
        let loading = document.getElementById("two");
        loading.innerText = "Done Loading"
    }
    console.log(page)
    data = data.Search
    document.getElementById("take").value = ""
    page++;
    for(var i=0 ; i<data.length ; i++){
        let mainDiv = document.createElement("div");
        var sett = "margin-bottom:15px;margin-left:15px;border-radius:10px"
        mainDiv.setAttribute("style",sett)
        
        let img = document.createElement("img");
        
        
        img.setAttribute("src",data[i].Poster);
        var clas = "width:100%;border-top-left-radius: 5px;border-top-right-radius: 5px"
        img.setAttribute("style",clas)

        let div1 = document.createElement("div");
        var back = "background-color:rgb(71,74,81);border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;margin-top:-5px"
        div1.setAttribute("style",back)
        let div11 = document.createElement("div");
        div11.innerText = data[i].Title;
        div11.setAttribute("style","color:white;margin-left:10px;padding:10px;font-family:Proxima Nova Regular, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px");
        let img12 = document.createElement("img");
        img12.setAttribute("src","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXrsf18l9O4do3h0pbsR9N0LxpMJkMXGBWzQ&usqp=CAU")
        img12.setAttribute("style","width:20px;padding:0px 0px 10px 0px")
        let img13 = document.createElement("img");
        img13.setAttribute("src","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXrsf18l9O4do3h0pbsR9N0LxpMJkMXGBWzQ&usqp=CAU")
        img13.setAttribute("style","width:20px;padding:0px 0px 10px 0px")
        let img14 = document.createElement("img");
        img14.setAttribute("src","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXrsf18l9O4do3h0pbsR9N0LxpMJkMXGBWzQ&usqp=CAU")
        img14.setAttribute("style","width:20px;padding:0px 0px 10px 0px")
        let div12 = document.createElement("div");
        div12.append(img12,"234",img13,"444",img14,"345");
        div12.setAttribute("style","display: grid;grid-template-columns: 13% 20% 13% 20% 13% 20%;margin-left:20px;color:rgb(140,145,153);font-family:Proxima Nova Regular, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:12px;padding-top:9px")
        div1.append(div11,div12)
        

        mainDiv.append(img,div1);

        pushh.append(mainDiv)
        
    }
}

display()