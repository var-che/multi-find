(function(){
    var markInstance = new Mark(document.body);
    console.log(markInstance)
    /*
    Log the storage area that changed,
    then for each item changed,
    log its old value and its new value.
    */
    function logStorageChange(changes, area) {
        console.log("Change in storage area: " + area);
    
        var changedItems = Object.keys(changes);
    
        for (var item of changedItems) {
            console.log(item + " has changed:");
            console.log("Old value: ");
            console.log(changes[item].oldValue);
            console.log("New value: ");
            console.log(changes[item].newValue);

            performMark(changes[item].newValue);
        }
    }
    
    browser.storage.onChanged.addListener(logStorageChange);


    
    function performMark(value) {
        console.log('performMark', value)
        // Remove previous marked elements and mark
        // the new keyword inside the context
        markInstance.mark(value);
    };
})();