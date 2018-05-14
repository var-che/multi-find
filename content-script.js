(function(){
    var markInstance = new Mark(document.body);
    
    initialize();
    function initialize() {
        console.log('Initializing')
        let gettingState = browser.storage.local.get("STATE");
        gettingState.then((res)=>{

            console.log(res["STATE"], ' Is the response from this')
            if(res["STATE"]){
                let gettingItem = browser.storage.local.get("WORDS");
                gettingItem.then(onGot, onError);
            }

        }, onError)
        
    }
    /*
    Log the storage area that changed,
    then for each item changed,
    log its old value and its new value.
    */
    var list_of_words = ''
    function logStorageChange(changes, area) {
        console.log("Change in storage area: " + area);
    
        var changedItems = Object.keys(changes);
        
        for (var item of changedItems) {
            console.log(item + " has changed:");
            console.log("Old value: ");
            console.log(changes[item].oldValue);
            console.log("New value: ");
            console.log(changes[item].newValue);

            if(item === 'WORDS'){
                //performMark(changes[item].newValue);
                performMark(changes[item].newValue);
                list_of_words = changes[item].newValue;
            }

            if(item === 'STATE' && changes[item].newValue === false){
                //console.log('should be unmarked', changes[item].newValue)
                markInstance.unmark()
            }
            if(item === 'STATE' && changes[item].newValue === true){
                // console.log('should be MARKED', list_of_words);
                browser.storage.local.get("WORDS")
                    .then((res)=>{
                        console.log(res["WORDS"], 'Shoud be marked');
                        performMark(res["WORDS"]);
                    }, onError)
                // performMark(list_of_words);
            }
        }
    }
    
    

    browser.storage.onChanged.addListener(logStorageChange);

    function onGot(item) {
      
      performMark(item["WORDS"]);

    }

    function onError(error) {
      console.log(`Error: ${error}`);
    }
    
    function performMark(value) {
        //console.log('performMark', value) // xar,mar,marian
        // Remove previous marked elements and mark
        // the new keyword inside the context
        markInstance.unmark({
            done: function(){
              var partsOfStr = value.split(','); // se xer master

              for(item in partsOfStr){
                markInstance.mark(partsOfStr[item]);
              }   
          }
        });
    };

    
})();
