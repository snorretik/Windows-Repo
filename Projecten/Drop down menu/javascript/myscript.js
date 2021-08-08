// javascript text
function setPerItem(string) {
    let element = document.querySelector(`#${string}-item`);
    element.addEventListener('mouseenter', (e) => {
        let elList = document.querySelector(`#${string}-list`)

        elList.hidden ? elList.hidden = false : elList.hidden = true;

        elList.addEventListener('mouseleave', (e) => {
            elList.hidden = true;
        })
    })
}

setPerItem("topics");
setPerItem("store");
setPerItem("explore");
