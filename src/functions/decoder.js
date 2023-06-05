export default function decode(str) {

    let txt = document.createElement("textarea");
    
    txt.innerHTML = str;
    
    return txt.value;
    
    }