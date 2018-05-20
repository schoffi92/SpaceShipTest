

document.addEventListener("DOMContentLoaded", function () {
    var elements = document.getElementsByClassName("cloak");
    for (var e=0;e<elements.length;e++) {
        elements[e].classList.remove("cloak");
    }
});