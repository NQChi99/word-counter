// proměnné
const numberWords = document.getElementById("words-number");
const numberCharacters = document.getElementById("characters-number");
const numberSentences = document.getElementById("sentences-number");
const numberParagraphs = document.getElementById("paragraphs-number");

const textInput = document.getElementById("textInput");

const copyBtn = document.getElementById("copy");
const pasteBtn = document.getElementById("paste");
const clearBtn = document.getElementById("clear");

const pastedTooltip = document.getElementById("tooltip-pasted");
const copiedTooltip = document.getElementById("tooltip-copied");
const clearedTooltip = document.getElementById("tooltip-cleared");

const keyword = document.getElementById("keyword");

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

// funkce na všechna počítadla
const countAll = () => {
    numberWords.textContent = countWords();
    numberCharacters.textContent = countCharacters();
    numberSentences.textContent = countSentences();
    numberParagraphs.textContent = countParagraphs();
}

// funkce na vypsání keywords
const getKeywords = () => {
    let str = textInput.value.trim();

    if (str.length === 0) {
        keyword.innerHTML = "";
        return;
    }
    // text rozdělí na slova, malá písmena, zachytí jakékoli písmeno v Unicode
    let words = str.toLowerCase().match(/\p{L}{2,}/gu);

    // objekt slovo:počet
    let wordCount = {};

    // spočítá výskyt slova
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // převede objekt na pole párů [slovo, počet], seřadí pole podle počtu, ukáže jen prvních 10 slov
    let sorted = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 10);

    // vypíše každé slovo jako samotný element
    keyword.innerHTML = "";
    sorted.forEach(([word, count]) => {
        let row = document.createElement("div");
        row.classList.add("keyword-row");

        let wordEl = document.createElement("span");
        wordEl.textContent = word;

        let countEl = document.createElement("span");
        countEl.textContent = count;

        row.appendChild(wordEl);
        row.appendChild(countEl);
        keyword.appendChild(row);
    });
}

textInput.addEventListener("input", () => {
    countAll();
    getKeywords();
})

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(textInput.value);

    copiedTooltip.style.opacity = "1";
    setTimeout(() => {
        copiedTooltip.style.opacity = "0";
    }, 2000);
})

pasteBtn.addEventListener("click", () => {
    navigator.clipboard
        .readText()
        .then((clipText) => {
            textInput.value = clipText;
            countAll();
            getKeywords();
        });

    pastedTooltip.style.opacity = "1";
    setTimeout(() => {
        pastedTooltip.style.opacity = "0";
    }, 2000);
})

clearBtn.addEventListener("click", () => {
    textInput.value = "";
    keyword.innerHTML = "";
    countAll();

    clearedTooltip.style.opacity = "1";
    setTimeout(() => {
        clearedTooltip.style.opacity = "0";
    }, 2000)
})