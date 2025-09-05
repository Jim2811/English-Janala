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
        <button class="btn btn-outline btn-primary" href=""><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `
        levelContainer.appendChild(levelBox)
    }
}
loadLesson()