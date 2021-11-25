
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
async function Debouncing(){
    let inpshow = document.getElementById("inpshow");
    let val = document.getElementById("take").value
    inpshow.innerText = ""

    let data = await fetch(`https://swapi.dev/api/people/?search=${val}`);
    data = await data.json() 

    // data = data.results.slice(init,page);
    // init = init + page;
    


    if(!data.results[0]){
        inpshow.innerText = "No results found"
        return
    }
    
    data.results.map((el)=>{
        let section = document.createElement("div");
        section.setAttribute("style","padding:10px;")
        section.setAttribute("id","section");
       
        section.addEventListener("click",()=>{
            document.getElementById("take").value = el.name;
            let inpshow = document.getElementById("inpshow");
            inpshow.style.display = "none";
            pushh.innerHTML = "";
            display(el)
        })
        
        section.innerText = el.name
        inpshow.append(section)
    })

    inpshow.style.display = "block";

    
    return data;
}

var id = undefined


//debouncing takes places
async function change(){
    
    let inpshow = document.getElementById("inpshow");
    let val = document.getElementById("take").value

    inpshow.innerText = "...loading"
    inpshow.style.display = "block";
    // if(id){
    //     return;
    // }
    clearTimeout(id)
    id = setTimeout(()=>{
        Debouncing();
        id = undefined
    },2000)

    
}


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
async function display(data){


    let loading = document.getElementById("two");
    let vall = document.getElementById("take").value;
    console.log(data)
   
        let mainDiv = document.createElement("div");
        var sett = "margin-bottom:15px;margin-left:15px;border-radius:10px"
        mainDiv.setAttribute("style",sett)

        let div1 = document.createElement("div");
        var back = "background-color:rgb(71,74,81);border-radius:5px;margin-top:-5px"
        div1.setAttribute("style",back);
        let div11 = document.createElement("div");
        div11.innerText = data.name;
        div11.setAttribute("style","text-align:center;color:white;margin-left:10px;padding:10px;font-family:Proxima Nova Regular, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:20px");
        
        let div12 = document.createElement("div");
        div12.setAttribute("style","color:white;margin-left:10px;padding:10px;font-family:Proxima Nova Regular, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:20px");
        div12.innerText = "Gender : " + data.gender ;

        let div13 = document.createElement("div");
        div13.setAttribute("style","color:white;margin-left:10px;padding:10px;font-family:Proxima Nova Regular, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:20px");
        div13.innerText = "Height : " + data.height + " cm";

        let div14 = document.createElement("div");
        div14.setAttribute("style","color:white;margin-left:10px;padding:10px;font-family:Proxima Nova Regular, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:20px");
        div14.innerText = "Weight : " + data.mass + " kg";
        div1.append(div11,div12,div13,div14);
        

        mainDiv.append(div1);

        pushh.append(mainDiv);
        
   
}
