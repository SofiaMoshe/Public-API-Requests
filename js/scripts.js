/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
/**/

const userAPI = 'https://randomuser.me/api/?inc=picture,name,email,cell,location,dob&nat=US&results=12';
const gallery = document.getElementById('gallery');


/***** FETCH FUNCTION ****/

fetch(userAPI)
 .then(response => response.json())
 .then( data => generateData(data.results) )


function generateData (employees){
    for (let i = 0; i < employees.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', i)
        card.innerHTML = `
            <div class="card-img-container">
            <img class="card-img" src="${employees[i].picture.thumbnail}" alt="employee picture">
            </div>

            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employees[i].name.first} ${employees[i].name.last}</h3>
                <p class="card-text">${employees[i].email}</p>
                <p class="card-text cap">${employees[i].location.city}, ${employees[i].location.state} </p>
            </div>
        `;
     
        gallery.appendChild(card);
    
        card.addEventListener ('click', () => displayModal(employees[i]));
    }
 }
   
//Phone Number Formatter
function numberFormat(text){
    return text.replace(DATA.VALIDATORS.DOB_REGEX, '$2/$3/$1');
}

        function displayModal(employee){
            const modalHTML = `
            <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>

                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.thumbnail}" alt="employee picture" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.city}</p>
                    <hr>
                    <p class="modal-text">${employee.cell}</p>
                    <p class="modal-text cap">${employee.location.city}, ${employee.location.state}</p>
                    <p class="modal-text">Birthday: ${employee.dob.date.replace(/(\d{4})-(\d{2})-(\d{2}).+/, '$2/$3/$1')}</p>

                </div>
            </div>
            `;
            gallery.insertAdjacentHTML('afterend', modalHTML)
        }
        
        document.body.addEventListener('click', (e) => {
            if(e.target.closest('#modal-close-btn')) {
                document.querySelector('.modal-container').remove();
            }
        })

