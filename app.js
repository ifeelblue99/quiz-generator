const textArea = document.getElementById("q-area")
const correctAns = document.getElementById("q-correct")
const wrongAns1 = document.getElementById("q-wrong1")
const wrongAns2 = document.getElementById("q-wrong2")
const wrongAns3 = document.getElementById("q-wrong3")
const saveBtn = document.getElementById("q-save-btn")
const resetBtn = document.getElementById("q-reset-btn")
const readyBtn = document.getElementById("q-ready-btn")

const questionContainer = document.getElementById("cont")
questionContainer.style.flexWrap =  "wrap"

let userInputs = [] 

let questionObj = JSON.parse(localStorage.getItem("q")) || []


// add question
const addQuestion = (q, opt, ans, num)=>{
    questionObj.push({
        q,
        opt,
        ans,
        num
    })

    localStorage.setItem("q", JSON.stringify(questionObj))
}

// show question
const createQEl = (question)=>{

    const div = document.createElement("div")
    const span = document.createElement("span")
    const button = document.createElement("button")

    div.classList.add("q-box")

    button.classList.add(question.num)
    button.classList.add("del-btn")
    span.innerText = "question "+question.num+" "
    button.innerText = "X"
    div.append(span, button)
    questionContainer.appendChild(div)
}

// del button
function deleteBtn(index){

    if(questionObj.length === 1){
        localStorage.clear()
        questionContainer.innerHTML = ""
        questionObj = []
        return
    }
    

    // delete question 
    questionObj = questionObj.filter(item => item.num !== index)

    localStorage.setItem("q", JSON.stringify(questionObj))

    questionContainer.innerHTML = ""

    questionObj.forEach(createQEl)

}

questionContainer.addEventListener("click", event=>{
    const isBtn = event.target.nodeName === "BUTTON"
    if(!isBtn) return

    let classArray = Array.from(event.target.classList)
    console.log(classArray)

    deleteBtn(parseInt(classArray[0], 10))
})


// initialize
questionContainer.innerHTML = ""
questionObj.forEach(createQEl)


// save btn
saveBtn.addEventListener("click", ()=>{
    /*********************** check empty inputs *****************************/
    userInputs = [
        textArea.value,
        correctAns.value,
        wrongAns1.value,
        wrongAns2.value,
        wrongAns3.value,
    ]
    let i = 0
    userInputs.forEach(element => {
        !element?i++:true
    });
    //i?console.log(formObj):true
    if(i){
        console.log("empty input!") 
        return
    } 
    /********************************************************/

    // give questions a number
    let questionOrder = 0
    if(localStorage.getItem("q") !== null){
        questionOrder = JSON.parse(localStorage.getItem("q")).length
    }

    // add question
    addQuestion(
        userInputs[0],
        userInputs.slice(1),
        userInputs[1],
        questionOrder
    ) 


    // reindexing
    questionObj.forEach( el=> {
        el.num = questionObj.indexOf(el)
    });


    // create question elements
    questionContainer.innerHTML = ""
    questionObj.forEach(createQEl)

})


// reset 
resetBtn.addEventListener("click", ()=>{
    localStorage.clear()
    questionContainer.innerHTML = ""
    questionObj = []
})

// ready button
readyBtn.addEventListener("click", ()=>{
    if(questionObj.length !== 0){
        window.open("quiz.html", "_self")
    }else{
        textArea.textContent = "First add a question"
    }
})
