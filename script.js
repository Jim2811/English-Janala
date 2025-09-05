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
    if(words.length === 0){
        wordContainer.innerHTML =`
        <div class="text-center col-span-full my-7">
                <img src="assets/alert-error.png" class="mx-auto mb-3">
                <p><span class="bng">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</span></p>
                <h2 class="font-semibold text-[34px] mt-3"><span class="bng">নেক্সট Lesson এ যান</span></h2>
            </div>
        `
        return
    };
    for (const word of words) {
        let card = document.createElement('div')
        card.innerHTML = `
            <div class="wordCard bg-white p-6 text-center rounded-lg">
                <h3 class="font-bold text-xl mb-3">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h3>
                <p class="mb-2">Meaning /Pronounciation</p>
                <h4><span class="bng text-xl font-bold text-gray-700">"${word.meaning ? word.meaning: 'অর্থ পাওয়া যায়নি' } / ${word.pronunciation ?word.pronunciation : 'উচ্চারণ পাওয়া যায়নি' }"</span></h4>
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