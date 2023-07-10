const displays = document.querySelector('.displays');

const perPage = 3;
let currentPage = 1;

  const  arrayLocal =JSON.parse(localStorage.getItem("memories"));
  
const displayLocalData = ()=>{
const startIndex = (currentPage - 1 ) * perPage;
const endIndex = startIndex + perPage;
console.log(startIndex,endIndex)
 
   
    const items = arrayLocal.slice(startIndex,endIndex);
    console.log(items)
    displays.innerHTML = ''

   
    items.forEach((string) => {

      let markUp = `

      <div class="display courner dis">

   
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

  
    </div>
</div>
      
      `  
      displays.insertAdjacentHTML('beforebegin', markUp);
    });

    currentPage++
};


displayLocalData();


window.addEventListener('scroll', ()=>{
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  if(scrollTop + clientHeight >= scrollHeight){
    displayLocalData();
  }
});