const bookButton = document.getElementById("book-a-visit")
const completeButton = document.getElementById("complete-visit")

bookButton.addEventListener("click", function () {
    bookButton.style.display = "none";
    completeButton.style.display = "block";
});

completeButton.addEventListener("click", function () {
    completeButton.style.display = "none";
    bookButton.style.display = "block";
    
    // (function(c, e, k, l, a) {
    //     c[e] = c[e] || {};
    //     for(c[e].q = c[e].q || []; a < l.length;) {
    //     k(l[a++], c[e]);
    //     }
    // })(window, "extole", function(c, e) {
    //     e[c] = e[c] || function() {
    //     e.q.push([c, arguments]);
    //     };
    // }, ["createZone"], 0);
    
    // // Call Extole to register the conversion event
    // const email = localStorage.getItem("email");
    // extole.createZone({
    //     name: 'conversion',
    //     data: {
    //     "email": email,
    //     }
    // });
});
      