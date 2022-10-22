const {invoke} = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;
let romanInputEl;
let romanMsgEl;
let listInput1;
let listInput2;
let listMsg;
let array1;
let array2;

window.addEventListener("DOMContentLoaded", () => {
    greetInputEl = document.querySelector("#greet-input");
    greetMsgEl = document.querySelector("#greet-msg");
});

window.addEventListener("DOMContentLoaded", () => {
    romanInputEl = document.querySelector("#roman-input");
    romanMsgEl = document.querySelector("#roman-msg");
});

window.addEventListener("DOMContentLoaded", () => {
    listInput1 = document.querySelector("#list1-input");
    listInput2 = document.querySelector("#list2-input");
    array1 = JSON.parse("[" + listInput1 + "]");
    array2 = JSON.parse("[" + listInput2 + "]");
    listMsg = document.querySelector("#list-msg");
});

async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {name: greetInputEl.value});
}

async function roman_to_int() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    romanMsgEl.textContent = await invoke("roman_to_int", {s: romanInputEl.value});
}

async function merge_list() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    listMsg.textContent = await invoke("append_vec", {a: array1, b: array2});
}

window.roman_to_int = roman_to_int;
window.greet = greet;
window.merge_list = merge_list;
