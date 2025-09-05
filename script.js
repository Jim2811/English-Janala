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
    let url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWords(data))
}
loadLesson()