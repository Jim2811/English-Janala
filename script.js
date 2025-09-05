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
        <button id ="lessonBtn-${lesson.level_no}" onclick= "loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary lesson-Btn" href=""><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `
        levelContainer.appendChild(levelBox)
    }
}
// load level words
let loadLevelWord = (id) =>{
    let url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive()
        let lessonBtn = document.getElementById(`lessonBtn-${id}`)
        lessonBtn.classList.add('active')
        displayLevelWords(data.data)
    })
}
// remove active class from lesson buttons
let removeActive = () =>{
    let lessonBtnn = document.querySelectorAll('.lesson-Btn')
    // console.log(lessonBtnn);
    lessonBtnn.forEach((btn)=>{
        btn.classList.remove('active')
    })
}
// load word detail by clicking the info button
let loadWordDetail = (id) =>{
    let url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayWordDetails(data.data))
}
/* 
id
: 
5
level
: 
1
meaning
: 
"আগ্রহী"
partsOfSpeech
: 
"adjective"
points
: 
1
pronunciation
: 
"ইগার"
sentence
: 
"The kids were eager to open their gifts."
synonyms
: 
(3) ['enthusiastic', 'excited', 'keen']
word
: 
"Eager"
*/
let displayWordDetails = (data)=>{
    let word_details_container = document.getElementById('word-details-container')
    let my_modal_5 = document.getElementById('my_modal_5')
    my_modal_5.showModal()
    // load synonyms
    let createElements = (arr) =>{
        if(arr.length > 0){
            let htmlElement= arr.map((el)=> `<span class='btn'>${el}</span>`)
            console.log(htmlElement);
            return htmlElement.join(" ") 
        }
        else{
            let somarthok = 'কোন সমার্থক শব্দ পাওয়া যায়নি';
            return somarthok
        }
    }
    word_details_container.innerHTML = `
    <div>
            <h2 class="font-bold text-2xl">${data.word} (<i class="fa-solid fa-microphone-lines"></i>:${data.pronunciation ?data.pronunciation: 'প্রনাউন্সিয়েশন পাওয়া যায়নি' })</h2>
        </div>
        <div>
            <p class="font-bold">Meaning</p>
            <p class="bng">${data.meaning ? data.meaning : 'অর্থ পাওয়া যায়নি'}</p>
        </div>
        <div>
            <p class="font-bold">Example</p>
            <p>${data.sentence? data.sentence : 'বাক্য পাওয়া যায়নি'}</p>
        </div>
        <div>
            <p class="font-bold bng">সমার্থক শব্দ গুলো</p>
            <div class="flex flex-wrap gap-2">
                ${createElements(data.synonyms)}
            </div>
        </div>
    `
}
// display level words
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
    // display word meanings
    for (const word of words) {
        let card = document.createElement('div')
        card.innerHTML = `
            <div class="wordCard bg-white p-6 text-center rounded-lg">
                <h3 class="font-bold text-xl mb-3">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h3>
                <p class="mb-2">Meaning /Pronounciation</p>
                <h4><span class="bng text-xl font-bold text-gray-700">"${word.meaning ? word.meaning: 'অর্থ পাওয়া যায়নি' } / ${word.pronunciation ?word.pronunciation : 'উচ্চারণ পাওয়া যায়নি' }"</span></h4>
                <div class="flex text-white justify-between mt-5">
                        <button class="btn" onclick="loadWordDetail(${word.id})"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        wordContainer.append(card)
    }
}
loadLesson()