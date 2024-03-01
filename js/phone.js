const loadPhone = async(searchText ='iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)
    // 1:
    const phonesContainer = document.getElementById('phones-container');

    //  clear phone container before adding new cards
    phonesContainer.textContent = '';

    // display Show button if there are more then 12 phones
    const showAllBtn = document.getElementById('show-all-btn');
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden')
    }
    else{
        showAllBtn.classList.add('hidden')
    }

    // console.log(phones.length)

    // display only 12 phones if not show all
   if(!isShowAll){
    phones = phones.slice(0, 12)
   }

    phones.forEach(phone => {
        // console.log(phone)
        //2: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
        // 3: set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.slug}</p>
          <div class="card-actions justify-center">
            <button onclick = "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;

        //4: appendChild
        phonesContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSp(false)
}

// 

const handleShowDetails = async (id) =>{
    // console.log('clicked', id)
    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data)
    const phone = data.data;
    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
        <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
    `;
    // show the modal
    show_details_modal.showModal()
}


// handle search btn
const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleLoadingSp(true)
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSp = (isLoading) => {
    const loadingSp = document.getElementById('loading-sp');
    if(isLoading){
        loadingSp.classList.remove('hidden');
    }
    else{
        loadingSp.classList.add('hidden');
    }
}



// handle Show All

const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();