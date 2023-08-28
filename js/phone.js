const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

  const data = await res.json();
  const phones = data.data;
  //console.log(phones)
  displayPhones(phones);
}




const displayPhones = phones => {

  //console.log(phones)
  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.textContent = '';


  //display show all button if there are more than 12 phones

  const showAllContaienr = document.getElementById('show-all-container')
  if (phones.length > 12) {
    showAllContaienr.classList.remove('hidden');

  }
  else {
    showAllContaienr.classList.add('hidden')
  }
  phones = phones.slice(0, 12);

  phones.forEach(phone => {
    console.log(phone)

    // 1 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card  bg-green-300 shadow-xl p-4`
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        
        `;
    phoneContainer.appendChild(phoneCard);
  });

  toggleLoadingSpiner(false)


}

const handleSearch = () => {
  const searchField = document.getElementById('input-field');
  const searchText = searchField.value;
  toggleLoadingSpiner(true)
  loadPhone(searchText);
}


// const handleSearch2 = () => {
//   const searchField = document.getElementById('input-field2');
//   const searchText = searchField.value;
  
//   toggleLoadingSpiner(true)

//   loadPhone(searchText);
// }


const toggleLoadingSpiner  = (isLoading) =>{
    
  const loadingSpiner = document.getElementById('loading-spinner');
    
  if(isLoading){
    loadingSpiner.classList.remove('hidden');
  }
  else{
    loadingSpiner.classList.add('hidden')
  }


}

// handle show all

const handleShowDetails = async (id) => {
 
   console.log('clicked show details',id)

  //  load data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;
  
  showPhoneDetail(phone) 
}          

const showPhoneDetail = (phone) =>{

  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="">
  <p> <span>Storage:</span>${phone.mainFeatures.storage}</p>
  
  
  `

  show_modal.showModal()


}

