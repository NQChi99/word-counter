// proměnné
const numberWords = document.getElementById("words-number");
const numberCharacters = document.getElementById("characters-number");
const numberSentences = document.getElementById("sentences-number");
const numberParagraphs = document.getElementById("paragraphs-number");

const textInput = document.getElementById("textInput");

// funkce na počet znaků
const countCharacters = () => {
    let str = textInput.value;
    return str.length;
}

// funkce na počet slov
const countWords = () => {
    let str = textInput.value;
    let splitWord = str.trim().split(/\s+/);

    if (str.length === 0) {
        return 0;
    }
    return splitWord.length;
}

// funkce na počet vět
const countSentences = () => {
    let str = textInput.value;
    return (str.match(/[.!?]+/g) || []).length;
}

// funkce na počet odstavců
const countParagraphs = () => {
    let str = textInput.value.trim();

    if (str.length === 0) {
        return 0;
    }

    return str.split(/\n\s*\n|\n+/).filter(p => p.trim().length > 0).length;
}

textInput.addEventListener("input", () => {
    numberWords.textContent = countWords();
    numberCharacters.textContent = countCharacters();
    numberSentences.textContent = countSentences();
    numberParagraphs.textContent = countParagraphs();
})