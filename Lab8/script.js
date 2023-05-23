import { speakHello } from "./SpeakHello.js";
import { speakGoodBye } from "./SpeakGoodBye.js";

let names = [
    "Sophia",
    "Emma",
    "Olivia",
    "Ava",
    "Isabella",
    "Mia",
    "Zoe",
    "Lily",
    "Emily",
    "Grace",
    "Amelia",
    "Charlotte",
    "Harper",
    "Sophie",
    "Ella",
    "Chloe",
    "Mila",
    "Liam",
    "Noah",
    "Oliver",
    "Elijah",
    "William",
    "James",
    "Benjamin",
    "Lucas",
    "Henry",
    "Alexander",
    "Michael",
    "Daniel",
    "Logan",
    "Jackson"
];

console.log("If a name starts with 'J', say Good Bye; otherwise, say Hello");

for (let i = 0; i < names.length; i++) {
    if (names[i][0].toLowerCase() === "j") {
        speakGoodBye(names[i]);
    } else {
        speakHello(names[i]);
    }
}

console.log("If the ASCII sum of a name is even, say Hello; otherwise, say Good Bye");

for (let i = 0; i < names.length; i++) {
    let sum = 0;
    for (let j = 0; j < names[i].length; j++) {
        sum += names[i].charCodeAt(j);
    }
    if (sum % 2 === 0) {
        speakHello(names[i]);
    } else {
        speakGoodBye(names[i]);
    }
}

console.log("If a name ends with 'a', say Good Bye; otherwise, say Hello");

for (let i = 0; i < names.length; i++) {
    if (names[i][names[i].length - 1].toLowerCase() === "a") {
        speakGoodBye(names[i]);
    } else {
        speakHello(names[i]);
    }
}
