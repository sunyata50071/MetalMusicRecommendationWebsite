import { recordsData } from "/data.js"

const genreRadios = document.getElementById("genre-radios")
const generateRecords = document.getElementById("generate-record-btn")
const albumModal = document.getElementById("album-modal")
const modalInner = document.getElementById("album-modal-inner")
const modalCloseBtn = document.getElementById("album-modal-close-btn")


genreRadios.addEventListener("change", highlightCheckedOption)
generateRecords.addEventListener("click", renderRecord)
modalCloseBtn.addEventListener("click", closeBtn)


function highlightCheckedOption(e){
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function getMatchingRecordArray(){     

    const selectedRecord = document.querySelector('input[type="radio"]:checked').value
    const matchingRecordArray = recordsData.filter(function(record){
            return record.genreTag.includes(selectedRecord)
    })
    return matchingRecordArray 
}  


function getSingleRecordObject(){
    const recordsArray = getMatchingRecordArray()
    
    if(recordsArray.length === 1){
        return recordsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * recordsArray.length)
        return recordsArray[randomNumber]
    }
}

function renderRecord(){
    const recordObject = getSingleRecordObject()
    modalInner.innerHTML =  `
        <img 
        class="album-img" 
        src="${recordObject.recordCover}"
        alt="${recordObject.alt}"
        >
        `
    albumModal.style.display = 'flex'
}

function getRecordsArray(records){
    const recordsArray = []    
    for (let record of records){
        for (let album of record.genreTag){
            if (!recordsArray.includes(album)){
                recordsArray.push(album)
            }
        }
    }
    return recordsArray
}

function renderRecordRadios(records){
        
    let radioItems = ``
    const choices = getRecordsArray(records)
    for (let album of choices){
        radioItems += `
        <div class="radio">
            <label for="${album}">${album}</label>
            <input
            type="radio"
            id="${album}"
            value="${album}"
            name="records"
            >
        </div>`
    }
    genreRadios.innerHTML = radioItems
}

renderRecordRadios(recordsData)

function closeBtn() {
    albumModal.style.display="none"
}
