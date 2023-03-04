let seeMore = 6;
let allData = 0;
const loadeUniverse = (universes) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then((response) => response.json())
        .then((data) => {
            displayUniverse(data.data.tools)
            allData = data.data.tools.length;
    })
}

const displayUniverse = (universes) => {
    const openAi = document.getElementById('open-ai');
    
    openAi.textContent = '';
    universes = universes.slice(0, seeMore)

    universes.forEach(universe => {
        const uniDiv = document.createElement('div');
        uniDiv.classList.add('col');
        uniDiv.innerHTML = `
        <div class="card h-100">
                    <img class="rounded m-3 mb-1 img-fluid" src="${universe.image}" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title fw-bold mb-0">Features</h5>
                      <div class="d-flex flex-column ms-1">
                          <small>1. ${universe.features[0]? universe.features[0]:''}</small>
                          <small>2. ${universe.features[1]? universe.features[1]:''}</small>
                          <small>3. ${universe.features[2]? universe.features[2]:'No data Found'}</small>
                      </div>
                      <hr  class="w-[80%] mx-auto">
                      <h5 class="fw-bold">${universe.name}</h5>
                      <div class="d-flex d-flex justify-content-between me-1">
                        <div>
                            <small class="ms-1"><i class="fa-sharp fa-solid fa-calendar-days"></i></small>
                            <small>${universe.published_in}</small>
                        </div>
                        <button onclick="loadAiDetails('${universe.id}')" class="border bg-white border-0"><i class="fa-solid fa-circle-arrow-right fa-2x" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></button>
                      </div>

                    </div>
                  </div>
        `;
        openAi.appendChild(uniDiv)
        toggleSpinner(false)
    })

    const seMoreBtn = document.getElementById('see-more-div');
    if (seeMore > 6) {
        seMoreBtn.classList.add('d-none')
    }
    

    document.getElementById('see-more-btn').addEventListener('click', function () {
        seeMore = allData;
        toggleSpinner(true);
        loadeUniverse()
        console.log(seeMore, universes.length)

        
    })
}


const loadAiDetails = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
      .then((response) => response.json())
        .then((data) => displayAiDetails(data.data));
    
}
    
const displayAiDetails = ai => {
    console.log(ai)
    const upperTitle = document.getElementById('upper-title');
    upperTitle.innerText = ai.description;
    const modalCard2nd = document.getElementById('modal-card-2nd');
    modalCard2nd.innerHTML = `
    <img class="rounded m-3 " src="${ai.image_link[0]}"  alt="...">
    <small><button id="accuracy-button" class="btn-sm position-absolute top-0 mt-4 me-4 end-0 btn btn-danger fw-semibold"><small>${ai.accuracy.score? ai.accuracy.score* 100: 'No accuracy'}% accuracy</small></button></small>
    <div class="card-body text-center">
    <div><h6 class="fw-bold">${ai.input_output_examples[0].input}</h6></div>
    <div>
    <small>${ai.input_output_examples[1].output? ai.input_output_examples[1].output.slice(0, 178):'No! Not Yet! Take a break!!!'}</small>
    </div>
    console.log(ai.input_output_examples[1].output)
    </div>
    `

    // <h6 class="fw-bold">${ai.input_output_examples[0].input}</h6>
    //     <small>${ai.input_output_examples[1].output? ai.input_output_examples[1].output.slice(0, 178):'No! Not Yet! Take a break!!!'}</small>
    // Features infomation 
    document.getElementById('features-1').innerText = ai.features['1']? ai.features['1'].feature_name :'No data Found';
    document.getElementById('features-2').innerText = ai.features['2']? ai.features['2'].feature_name :'No data Found';
    document.getElementById('features-3').innerText = ai.features['3']? ai.features['3'].feature_name :'No data Found';

    // Integrations information 
    document.getElementById('features-4').innerText = ai.integrations[0]? ai.integrations[0]:'No data Found';
    document.getElementById('features-5').innerText = ai.integrations[1]? ai.integrations[1]:'No data Found';
    document.getElementById('features-6').innerText = ai.integrations[2]? ai.integrations[2]:'No data Found';

    // pricing info
    document.getElementById('pricing').innerHTML = `
    <h6 style="font-size: small;" class="col-3 text-success fw-bold rounded me-2 my-auto p-2 bg-white">${ai.pricing[0]?ai.pricing[0].price:'Free of Cost'} <br />${ai.pricing[1].plan}</h6>
    <h6 style="font-size: small;" class="col-3 text-warning fw-bold rounded my-auto p-2 bg-white">${ai.pricing[1] ? ai.pricing[1].price:'Free of Cost'} <br />${ai.pricing[1].plan}</h6>
    <h6 style="font-size: small;" class="col-4 text-danger-emphasis fw-bold mb-0 rounded mx-2 p-2 bg-white">${ai.pricing[2] ? ai.pricing[2].price:'Free of Cost'} <br/>${ai.pricing[2].plan}</h6>
    `
    
    if (ai.accuracy.score === null) {
        const accuracyButton = document.getElementById('accuracy-button');
        accuracyButton.classList.add('d-none')
    }

    
}

// spinner toggle 
const toggleSpinner = isLoading => {
    const loaderSpinner = document.getElementById('load-spinner');
    const cardDiv = document.getElementById('open-ai');
    if (isLoading) {
        loaderSpinner.classList.remove('d-none')
        cardDiv.classList.add('d-none')
    }
    else {
        loaderSpinner.classList.add('d-none')
        cardDiv.classList.remove('d-none')
    }
}





loadeUniverse()