var e = document.querySelector('#lol');
var p = document.querySelector('#onoff');
var b = document.querySelector('#switcher');

function logging(e){
  browser.storage.local.set({"WORDS": e.target.value})
    .then(()=>{
      
    }, onError)
}

e.addEventListener('keyup', logging);


function onError(error) {
  console.log(error);
}

initialize();
// {"WORDS": STRING}
function initialize() {
  var gettingAllStorageItems = browser.storage.local.get();
    gettingAllStorageItems.then((results) => {

      // GETTING WORDS FROM MEMORY

      if(results["STATE"] === undefined) {
        browser.storage.local.set({"STATE" : true})
          .then((result)=>{
            e.innerText = '';

          }, onError)
      }else{
        e.innerText = results["WORDS"];
      }
      
      
  }, onError);
}

function switchingState(e){
  browser.storage.local.get()
    .then((result)=>{
      browser.storage.local.set({"STATE" : !result["STATE"]})
        .then(()=>{
          

        }, onError)
    }, onError)
}

b.addEventListener('click', switchingState);