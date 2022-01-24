const finishBtn = document.getElementById("finish-btn")
const quizQBox = document.getElementById("quiz-q-box")
const questionCard = document.getElementsByClassName("q-card")

let questions = JSON.parse(localStorage.getItem("q")) || []


const displayQuestions = (obj)=>{

    const div = document.createElement("div")
    const h2 = document.createElement("h2")

    let questionNum = obj.num
    let options = obj.opt

    // randomize options
    options.sort(()=> Math.random() - 0.5)

    // add clases
    div.classList.add("q-card")
    div.id = `${questionNum}`

    // question
    h2.textContent = obj.q
    
    // set options
    options.forEach(el => {
        div.innerHTML += `
        <label for="${questionNum}">
            <input class="radio-btn" type="radio" name="${questionNum}" 
                id="${questionNum}" value="${el}"> ${el}<br>
        </label> `
    });

    // append
    div.append(h2)
    quizQBox.append(div)
}

// initialize questions
questions.forEach(displayQuestions); 


// change this part
finishBtn.addEventListener("click", ()=>{
    document.getElementById("title").textContent = "I will fix this part soon."
    document.getElementById("title").style.backgroundColor = "#ff0000"

})