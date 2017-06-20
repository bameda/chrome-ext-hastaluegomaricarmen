replacements = [
    // emprender
    {'find': 'brexit',        'replace': 'Hasta luego Mari Carmen'},
    {'find': 'Brexit',        'replace': 'Hasta luego Mari Carmen'},
    {'find': 'BrExit',        'replace': 'Hasta luego Mari Carmen'},
    {'find': 'BREXIT',        'replace': 'HASTA LUEGO MARI CARMEN'},
];


var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if(MutationObserver){
            var obs = new MutationObserver(function(mutations, observer){
				mutations[0].addedNodes.forEach(function(node, idx) {
                    callback(node);
				})
            });
            obs.observe(obj, {childList:true, subtree:true});
        }
        else if(eventListenerSupported){
            obj.addEventListener('DOMNodeInserted', callback, false);
        }
    }
})();

// replace after the page is load
replacements.forEach(function(elem, idx) {
    findAndReplaceDOMText(document.body, {'find': elem.find, 'replace': elem.replace});
});

// replace at every change
observeDOM(document.body ,function(node){
    replacements.forEach(function(elem, idx) {
        findAndReplaceDOMText(node, {'find': elem.find, 'replace': elem.replace});
    });
});

