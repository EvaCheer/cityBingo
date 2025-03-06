async function getList(fileName) {
    const response = await fetch(fileName);
    const text = await response.text();
    return text.split(',').map(word => word.trim()).filter(Boolean);
}

function getRandomWordsFromList(numberOfWords, list) {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfWords);
}

function mergeTwoArrays(adjectivesList, nounsList) {
    return adjectivesList.map((adj, index) => `${adj} ${nounsList[index]}`);
}

async function createBingoList(fileName1, fileName2, numberOfWords) {
    const adjectivesFullList = await getList(fileName1);
    const nounsFullList = await getList(fileName2);

    const adjectivesChosenList = getRandomWordsFromList(numberOfWords, adjectivesFullList);
    const nounsChosenList = getRandomWordsFromList(numberOfWords, nounsFullList);
    return mergeTwoArrays(adjectivesChosenList, nounsChosenList);
}

async function main() {
    const fileName1 = "http://127.0.0.1:5500/adjectives.txt";
    const fileName2 = "http://127.0.0.1:5500/nouns.txt";
    const gridSizeOfBingo = 4;
    const numberOfWords = gridSizeOfBingo * gridSizeOfBingo;

    const bingoList = await createBingoList(fileName1, fileName2, numberOfWords);
    console.log("Generated Bingo List:", bingoList);

    const bingoGrid = document.getElementById("bingoGrid");
    bingoList.forEach((item) => {
        const div = document.createElement("div");
        div.className = "bingo-item";
        div.textContent = item; // Add the "adjective + noun"
        bingoGrid.appendChild(div);
    });
}

main();