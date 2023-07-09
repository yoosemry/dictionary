const search = document.getElementById("search");
const selection = document.getElementById("selection");
const dis = document.querySelector(".displays");

let dtInfo;
dis.innerHTML = "";

const fetchData = async (searchText) => {
  const response = await fetch("/word.json");
  const data = await response.json();
  findWords = data.find((word) => word.word == searchText);
  return findWords;
};

const getMemories =  () => {
  let memo = localStorage.getItem("memories");
  return memo ? JSON.parse(memo) : [];
};

const memories = (memo) => {
  const getMem =  getMemories();

  getMem.push(memo);

  localStorage.setItem("memories", JSON.stringify(getMem));
  search.value = "";
  dis.innerHTML = "";
};
const displayFun = async (string, parts) => {
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
       
       ${string.examples.map((exam) => `<li>${exam}</li>`)}
        
   
        </ul>
   
        <h4>Synonyms</h4>
        <ul class="lists">
        ${string.synonyms.map((exam) => `<li>${exam}</li>`)}
   
        </ul>

        <h4>Antonyms</h4>
        <ul class="lists">
        ${string.antonyms.map((exam) => `<li>${exam}</li>`)}
   
        </ul>

        <div class="learned">
            <input type="checkbox" name="learned" id="learned" onclick="memories(dtInfo)"> Learning
        </div>
    </div>
</div>

`;
  const example = `
<div class="display">

   
<h2 class="word">${string.word}</h2><br>
<div class="defination">
</p>
    <h4>examples</h4>
    <ul class="lists">
   
   ${string.examples.map((exam) => `<li>${exam}</li>`)}
    

    </ul>

 
</div>
</div>

`;

  const synonyms = `
<div class="display">

   
<h2 class="word">${string.word}</h2><br>
<div class="defination">
   

    <h4>Synonyms</h4>
    <ul class="lists">
    ${string.synonyms.map((exam) => `<li>${exam}</li>`)}

    </ul>

`;

  const antonyms = `
<div class="display">

   
<h2 class="word">${string.word}</h2><br>
<div class="defination">

    </p>
  

    <h4>Antonyms</h4>
    <ul class="lists">
    ${string.antonyms.map((exam) => `<li>${exam}</li>`)}

    </ul>

`;

  const defin = `

<div class="display">

   
<h2 class="word">${string.word}</h2><br>
<div class="defination"><span>Definition</span><br><br>
    <p class="p2">

    ${string.definition}

        .</p>

    </p>
  
 

`;

  if (parts == "all") {
    dis.insertAdjacentHTML("afterbegin", allinfo);
  } else if (parts == "definition") {
    dis.insertAdjacentHTML("afterbegin", defin);
  } else if (parts == "example") {
    dis.insertAdjacentHTML("afterbegin", example);
  } else if (parts == "synonyms") {
    dis.insertAdjacentHTML("afterbegin", synonyms);
  } else if (parts == "antonyms") {
    dis.insertAdjacentHTML("afterbegin", antonyms);
  } else {
    return;
  }
};

selection.addEventListener("change", async (e) => {
  const { value } = e.target;

  if (!search.value) {
    alert("search is empty");
    return;
  }
  try {
    const response = await fetch("/word.json");
    const data = await response.json();
    let findWords = data.find((word) => word.word == search.value);
    if (!findWords) {
      alert(`"${search.value}" ma ahan Mid no diban gashan`);

      return;
    }

    dtInfo = findWords;
    if (!response.ok) throw new Error("link wax ka qaldan");

    switch (value) {
      case "all":
        dis.innerHTML = "";
        displayFun(findWords, value);

        break;

      case "definition":
        dis.innerHTML = "";
        displayFun(findWords, value);

        break;

      case "example":
        dis.innerHTML = "";
        displayFun(findWords, value);
        break;

      case "synonyms":
        dis.innerHTML = "";
        displayFun(findWords, value);
        break;

      case "antonyms":
        dis.innerHTML = "";
        displayFun(findWords, value);
        break;

      default:
        alert("empty");
        break;
    }
  } catch (error) {
    alert(error);
  }
});
