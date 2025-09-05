let loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(json => displayLesson(json.data))
}
let displayLesson = (lessons) =>{
    let levelContainer = document.getElementById('levelContainer');
    levelContainer.innerHTML ='';
    for (const lesson of lessons) {
        let levelBox = document.createElement('div')
        levelBox.innerHTML = `
        <button onclick= "loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary" href=""><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `
        levelContainer.appendChild(levelBox)
    }
}
// load level words
let loadLevelWord = (id) =>{
    let url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWords(data.data))
}
let displayLevelWords = (words)=> {
    let wordContainer = document.getElementById('wordContainer');
    wordContainer.innerHTML =''
    for (const word of words) {
        console.log(word);
        let card = document.createElement('div')
        card.innerHTML = `
            <div class="wordCard bg-white p-6 text-center rounded-lg">
                <h3 class="font-bold text-xl mb-3">${word.word}</h3>
                <p class="mb-2">Meaning /Pronounciation</p>
                <h4><span class="bng text-xl font-bold text-gray-700">"${word.meaning} / ${word.pronunciation}"</span></h4>
                <div class="flex text-white justify-between mt-5">
                        <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        wordContainer.append(card)
    }
}
loadLesson()