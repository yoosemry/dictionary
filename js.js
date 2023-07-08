const search = document.getElementById("search");
const selection = document.getElementById("selection");
const dis = document.querySelector('.displays')

let findWords;
dis.innerHTML = ''
const getMemories = ()=>{
    let mem = localStorage.getItem('memories');
    return mem ? JSON.parse(mem) : [""];
}
const memories = (str)=>{
   const getMem = getMemories();
        console.log(getMem)
        
    
}
const displayFun = async(string,parts)=>{
    
    const allinfo = `
    <div class="display">

   
    <h2 class="word">${string.word}</h2><br>
    <div class="defination"><span>Definition</span><br><br>
        <p class="p2">

        ${string.definition}

            .</p>

        </p>
      
        <h4>examples</h4>
        <ul class="lists">
       
       ${string.examples.map(exam => `<li>${exam}</li>`)}
        
   
        </ul>
   
        <h4>Synonyms</h4>
        <ul class="lists">
        ${string.synonyms.map(exam => `<li>${exam}</li>`)}
   
        </ul>

        <h4>Antonyms</h4>
        <ul class="lists">
        ${string.antonyms.map(exam => `<li>${exam}</li>`)}
   
        </ul>

        <div class="learned">
            <input type="checkbox" name="learned" id="learned" onclick="memories(findWords)"> Learning
        </div>
    </div>
</div>

`
const example = `
<div class="display">

   
<h2 class="word">${string.word}</h2><br>
<div class="defination">
</p>
    <h4>examples</h4>
    <ul class="lists">
   
   ${string.examples.map(exam => `<li>${exam}</li>`)}
    

    </ul>

 
</div>
</div>

`

const synonyms = `
<div class="display">

   
<h2 class="word">${string.word}</h2><br>
<div class="defination">
   

    <h4>Synonyms</h4>
    <ul class="lists">
    ${string.synonyms.map(exam => `<li>${exam}</li>`)}

    </ul>

`

const antonyms = `
<div class="display">

   
<h2 class="word">${string.word}</h2><br>
<div class="defination">

    </p>
  

    <h4>Antonyms</h4>
    <ul class="lists">
    ${string.antonyms.map(exam => `<li>${exam}</li>`)}

    </ul>

`

const defin = `

<div class="display">

   
<h2 class="word">${string.word}</h2><br>
<div class="defination"><span>Definition</span><br><br>
    <p class="p2">

    ${string.definition}

        .</p>

    </p>
  
 

`

    if(parts == 'all'){
     dis.insertAdjacentHTML('afterbegin', allinfo)
       
    }else if (parts == 'definition'){
        dis.insertAdjacentHTML('afterbegin', defin)
   
    }else if(parts == 'example'){
        dis.insertAdjacentHTML('afterbegin', example)
   
    }else if(parts == 'synonyms'){
        dis.insertAdjacentHTML('afterbegin', synonyms)
       
    }else if(parts == 'antonyms'){
        dis.insertAdjacentHTML('afterbegin', antonyms)
   
    }else{
       return
    }
   
   
   }
   



selection.addEventListener("change", async (e) => {
  const { value } = e.target;

  if(!search.value){
    alert('search is empty')
    return
  }
  try {
    const response = await fetch("/word.json");
    const data = await response.json();
    let findWords = data.find((word) => word.word == search.value);
    if(!findWords) {
        alert(`"${search.value}" ma ahan Mid no diban gashan`)
    
    return
};
    if (!response.ok) throw new Error("link wax ka qaldan");


    switch (value) {
      case "all":
        dis.innerHTML = ''
        displayFun(findWords,value);
        
        
        break;

      case "definition":
        dis.innerHTML = ''
        displayFun(findWords,value)


        break;

      case "example":
        dis.innerHTML = ''
      displayFun(findWords,value)
        break;

      case "synonyms":
        dis.innerHTML = ''
      displayFun(findWords,value)
        break;

      case "antonyms":
        dis.innerHTML = ''
      displayFun(findWords,value)
        break;

      default:
        alert('empty')
        break;
    }

  
  } catch (error) {
    alert(error);
  }
});



