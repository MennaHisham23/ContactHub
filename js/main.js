var btnAdd=document.getElementById('addContactBtn');
var searchInput=document.getElementById('searchInput');
var contactinfoInput =document.getElementById("contactInfo");
var TotalCardInput = document.getElementById("totalContactsCard");
var FavoriteCountInput = document.getElementById("favoriteContactsCard");
var FavoriteCard = document.getElementById("FavoritesCard");

// Modal Inputs
var nameInput = document.getElementById("nameInput");
var phoneInput = document.getElementById("phoneInput");
var emailInput = document.getElementById("emailInput");
var addressInput = document.getElementById("addressInput");
var groupInput = document.getElementById("groupInput");
var notesInput = document.getElementById("notesInput");
var favoriteCheck = document.getElementById("favoriteCheck");
var emergencyCheck = document.getElementById("emergencyCheck");
var saveContactBtn = document.getElementById("saveContactBtn");
var totalContactsCount=document.getElementById("totalContactsCount");
var favoriteCount=document.getElementById("favoriteCount");
var emergencyCount=document.getElementById("emergencyCount");
var favoritesList = document.getElementById("favoritesListContainer");
var emergencyList = document.getElementById("emergencyListContainer");


var rowContacts=document.getElementById("rowContacts");


var ContactList = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : [];
// Add Contact
function addContact(){
    var contact={
    name:nameInput.value,
    phone:phoneInput.value,
    email:emailInput.value,
    address:addressInput.value,
    group:groupInput.value,
    
    isFavorite:favoriteCheck.checked,
    isEmergency:emergencyCheck.checked
}
ContactList.push(contact);
console.log(ContactList);
clearForm();

let Modal=document.getElementById("contactModal");
let bootstrapModal=bootstrap.Modal.getInstance(Modal);
bootstrapModal.hide();


Swal.fire({
  title: "Added!",
  text: "Contact has been added successfully.",
  icon: "success"
});  

displayContacts();


localStorage.setItem("contacts", JSON.stringify(ContactList));

}

// Clear Form
function clearForm() {
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    addressInput.value = "";
    groupInput.value = "Select a group";
    notesInput.value = "";
    favoriteCheck.checked = false;
    emergencyCheck.checked = false;
}

// Display 
function displayContacts() {

  if (ContactList.length === 0) {
    rowContacts.innerHTML = `
      <div class="contact-info mt-5 py-5" id="contactInfo">
        <div class="full d-flex justify-content-center align-items-center mb-1 mt-4 py-4">
          <div class="icon-full d-flex justify-content-center align-items-center rounded-4">
            <i class="fa-solid fa-address-book"></i>
          </div>
        </div>
        <div class="justify-content-center align-items-center text-center">
          <h2>No contacts found</h2>
          <p>Click "Add Contact" to get started</p>
        </div>
      </div>
    `;
  
    totalContactsCount.innerHTML = 0;
    favoriteCount.innerHTML = 0;
    emergencyCount.innerHTML = 0;
    return;
}
 let allDataBox = "";
   let favBox="";
    let emrBox="";
      let favSum = 0;
      let emergencySum = 0;
    
    for (let i = 0; i < ContactList.length; i++) {
        if (ContactList[i].isFavorite) {
            favSum++;
            let nameParts = ContactList[i].name.trim().split(" ");
            let initials = "";
            if(nameParts.length >= 2){
                initials = nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
            } else {
                initials = nameParts[0][0].toUpperCase();
            }
            favBox += `<div class="sidebar-contact-card">
        <div class="sidebar-contact-avatar" style="background-color: #DFAFF2;">
          ${initials}
        </div>

        <div class="sidebar-contact-info">
          <h5>${ContactList[i].name}</h5>
          <p>${ContactList[i].phone}</p>
        </div>

        <button class="sidebar-call-btn- favorites-call""window.location.href='tel:${ContactList[i].phone}'">
          <i class="fa-solid fa-phone"></i>
        </button>
      </div> `




  }

        if (ContactList[i].isEmergency) {
            emergencySum++;

let nameParts = ContactList[i].name.trim().split(" ");
            let initials = "";
            if(nameParts.length >= 2){
                initials = nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
            } else {
                initials = nameParts[0][0].toUpperCase();
            }

            emrBox += `<div class="sidebar-contact-card">
        <div class="sidebar-contact-avatar" style="background-color: #DFAFF2;">
         ${initials}
        </div>

        <div class="sidebar-contact-info">
          <h5>${ContactList[i].name}</h5>
          <p>${ContactList[i].phone}</p>
        </div>

        <button class="sidebar-call-btn- favorites-call" onclick="window.location.href='tel:${ContactList[i].phone}'">
          <i   class="fa-solid fa-phone"></i>
        </button>
      </div> `
  }

  // الافاتار
  let name = ContactList[i].name.trim(); 
let initials = "";
let nameParts = name.split(" "); 

if(nameParts.length >= 2){
    initials = nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
}else if(nameParts.length === 1){
    initials = nameParts[0][0].toUpperCase(); 
}


        allDataBox += ` <div class=" col-md-6">
      <div class="profile-card">
        <div class="row align-items-center mb-3">
          <div class="col-auto">
           <div class="avatar-photo">
           ${initials}

  ${ContactList[i].isFavorite
    ? `<span class="avatar-badge-fav">
         <i class="fa-solid fa-star"></i>
       </span>`
    : ""}

  ${ContactList[i].isEmergency
    ? `<span class="avatar-badge">
         <i class="fa-solid fa-heart-pulse"></i>
       </span>`
    : ""}
</div>
          </div>
          <div class="col">
            <h5 class="mb-1 name-style">${ContactList[i].name}</h5>
            <div class="d-flex align-items-center text-muted">

              <div class="icon-colorphone me-2">
             <i class="fa-solid fa-phone"></i>
             </div>
              <span>${ContactList[i].phone}</span>
            </div>
          </div>
        </div>

       ${ContactList[i].email ? `
<div class="row mb-3">
  <div class="col">
    <div class="d-flex align-items-center text-muted">
      <div class="icon-color-envolop me-2">
        <i class="fa-solid fa-envelope"></i>
      </div>
      <span>${ContactList[i].email}</span>
    </div>
  </div>
</div>` : ""}


     ${ContactList[i].address ? `
<div class="row mb-3">
  <div class="col">
    <div class="d-flex align-items-center text-muted">
      <div class="icon-colorlocation me-2">
        <i class="fa-solid fa-location-dot"></i>
      </div>
      <span>${ContactList[i].address}</span>
    </div>
  </div>
</div>` : ""}

       ${ContactList[i].group && ContactList[i].group !== "Select a group" ? `
<div class="row mb-3">
  <div class="col gap-2 d-flex">
    <span class="friends">${ContactList[i].group}</span>
    ${ContactList[i].isEmergency ? `<span class="Emergency"><i class="fa-solid fa-heart-pulse"></i>Emergency</span>` : ""}
  </div>
</div>` : ""}

        <hr class="my-3">

        <div class="contact-actions row">
          <div class="col d-flex align-items-center  justify-content-between">
            <div class="d-flex justify-content-center align-items-center gap-3">
            <a href="tel:01000652625" class="phone-style d-flex justify-content-center align-items-center">
        <i class="fa-solid fa-phone"></i>
      </a>
               <a href="mailto:mennahisham993@gmal.com" class="envelope-style d-flex justify-content-center align-items-center">
        <i class="fa-solid fa-envelope"></i>
      </a>
           </div>
          <div class="d-flex justify-content-center align-items-center gap-2">
    <div onclick="toggleFavorite(${i})">
        <i class="fa-regular fa-star star-style d-flex justify-content-center align-items-center ${ContactList[i].isFavorite ? 'favorite' : ''}"></i>
    </div>
    <div onclick="toggleEmergency(${i})">
        <i class="fa-solid fa-heart-pulse heart-style d-flex justify-content-center align-items-center ${ContactList[i].isEmergency ? 'emergency' : ''}"></i>
    </div>
    <div class="pencil-icon" onclick="editContact(${i})">
    <i class="fa-solid fa-pencil pencile-style d-flex justify-content-center align-items-center"></i>
</div>
    <div onclick="deleteContact(${i})">
        <i class="fa-solid fa-trash trash-style d-flex justify-content-center align-items-center"></i>
    </div>
</div>

          </div>
        </div>
      </div>
    </div> `;
    }

    rowContacts.innerHTML = allDataBox;
    totalContactsCount.innerHTML=ContactList.length;
    favoritesList.innerHTML = favBox;
emergencyList.innerHTML = emrBox;
favoriteCount.innerHTML = favSum;
emergencyCount.innerHTML = emergencySum;


}

displayContacts();
// ************* Favorite toogle *************
function toggleFavorite(index) {
    ContactList[index].isFavorite = !ContactList[index].isFavorite;
    localStorage.setItem("contacts", JSON.stringify(ContactList));

    displayContacts();
    displayFavorites();
    displayEmergency();
}


function displayFavorites() {
    let favBox = "";
    let favSum = 0;

    for (let i = 0; i < ContactList.length; i++) {
        if (ContactList[i].isFavorite) {
            favSum++;

            let nameParts = ContactList[i].name.trim().split(" ");
            let initials = nameParts[0][0].toUpperCase() + (nameParts[1] ? nameParts[1][0].toUpperCase() : "");

           favBox+= `
            <div class="sidebar-contact-card">
                <div class="sidebar-contact-avatar"style="background-color: #DFAFF2;">${initials}</div>
                <div class="sidebar-contact-info">
                    <h5>${ContactList[i].name}</h5>
                    <p>${ContactList[i].phone}</p>
                </div>

                <button class="sidebar-call-btn- favorites-call" onclick="window.location.href='tel:${ContactList[i].phone}'">
                    <i class="fa-solid fa-phone"></i>
                </button>
            </div>`;
        }
    }

    if (favSum === 0) {
        favoritesList.innerHTML = `<p class="text-center p-5 text-muted">No favorites yet</p>`;
    } else {
        favoritesList.innerHTML = favBox;
    }

    favoriteCount.innerHTML = favSum;
}

   


// ************* Emergency toggle *************
function toggleEmergency(index) {
    ContactList[index].isEmergency = !ContactList[index].isEmergency;
    localStorage.setItem("contacts", JSON.stringify(ContactList));

    displayContacts();
    displayFavorites();
    displayEmergency();
}


function displayEmergency() {
    let emrBox = "";
    let emergencySum = 0;

    for (let i = 0; i < ContactList.length; i++) {
        if (ContactList[i].isEmergency) {
            emergencySum++;

            let nameParts = ContactList[i].name.trim().split(" ");
            let initials = nameParts[0][0].toUpperCase() + (nameParts[1] ? nameParts[1][0].toUpperCase() : "");

            emrBox += `
            <div class="sidebar-contact-card">
                <div class="sidebar-contact-avatar"style="background-color: #DFAFF2;">${initials}</div>
                <div class="sidebar-contact-info">
                    <h5>${ContactList[i].name}</h5>
                    <p>${ContactList[i].phone}</p>
                </div>

                <button class="sidebar-call-btn- favorites-call" onclick="window.location.href='tel:${ContactList[i].phone}'">
                    <i class="fa-solid fa-phone"></i>
                </button>
            </div>`;
        }
    }

    if (emergencySum === 0) {
        emergencyList.innerHTML = `<p class="text-center p-5 text-muted">No emergency contacts yet</p>`;
    } else {
        emergencyList.innerHTML = emrBox;
    }

    emergencyCount.innerHTML = emergencySum;
}

// ******************


// delete contact
function deleteContact(index){

 
  Swal.fire({
        title: "Delete Contact?",
        text: "Are you sure you want to delete this contact? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#606773",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        if (result.isConfirmed) {

          
            ContactList.splice(index, 1);
            localStorage.setItem("contacts", JSON.stringify(ContactList));

            displayContacts();
            displayFavorites();
            displayEmergency();

            Swal.fire({
                title: "Deleted!",
                text: "The contact has been removed.",
                icon: "success"
            });
        }
    });
}

var editIndex = null;
function editContact(index) {
    editIndex = index; 
    let contact = ContactList[index];

    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
    addressInput.value = contact.address;
    groupInput.value = contact.group;
    notesInput.value = contact.notes || "";
    favoriteCheck.checked = contact.isFavorite;
    emergencyCheck.checked = contact.isEmergency;


    let Modal = document.getElementById("contactModal");
    let bootstrapModal = new bootstrap.Modal(Modal);
    bootstrapModal.show();
}


saveContactBtn.onclick = function() {
    if (editIndex !== null) {
        
        ContactList[editIndex].name = nameInput.value;
        ContactList[editIndex].phone = phoneInput.value;
        ContactList[editIndex].email = emailInput.value;
        ContactList[editIndex].address = addressInput.value;
        ContactList[editIndex].group = groupInput.value;
        ContactList[editIndex].notes = notesInput.value;
        ContactList[editIndex].isFavorite = favoriteCheck.checked;
        ContactList[editIndex].isEmergency = emergencyCheck.checked;

        Swal.fire({
            title: "Updated!",
            text: "Contact has been updated successfully.",
            icon: "success"
        });

        editIndex = null; 
    } else {
      
        addContact();
        return; 
    }

    localStorage.setItem("contacts", JSON.stringify(ContactList));
    displayContacts();
    displayFavorites();
    displayEmergency();

    clearForm();

    // Hide the modal
    let Modal = document.getElementById("contactModal");
    let bootstrapModal = bootstrap.Modal.getInstance(Modal);
    bootstrapModal.hide();}

// search***********
searchInput.oninput = function() {
    let query = searchInput.value.toLowerCase().trim();

  
    if (query === "") {
        displayContacts();
        return;
    }

    let filteredContacts = ContactList.filter(contact => {
        return (contact.name && contact.name.toLowerCase().includes(query)) ||
               (contact.phone && contact.phone.toLowerCase().includes(query)) ||
               (contact.email && contact.email.toLowerCase().includes(query));
    });

    displayFilteredContacts(filteredContacts);
}


function displayFilteredContacts(list) {
    if (list.length === 0) {
        rowContacts.innerHTML = `
        <div class="contact-info mt-5 py-5" id="contactInfo">
            <div class="full d-flex justify-content-center align-items-center mb-1 mt-4 py-4">
                <div class="icon-full d-flex justify-content-center align-items-center rounded-4">
                    <i class="fa-solid fa-address-book"></i>
                </div>
            </div>
            <div class="justify-content-center align-items-center text-center">
                <h2>No contacts found</h2>
                <p>Try another search</p>
            </div>
        </div>`;
        
      
        displayFavorites();
        displayEmergency();
        
        return;
    }

    let allDataBox = "";

    for (let i = 0; i < list.length; i++) {
    
        let name = list[i].name.trim(); 
        let initials = "";
        let nameParts = name.split(" "); 

        if(nameParts.length >= 2){
            initials = nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
        }else if(nameParts.length === 1){
            initials = nameParts[0][0].toUpperCase(); 
        }

        allDataBox += ` <div class=" col-md-6">
      <div class="profile-card">
        <div class="row align-items-center mb-3">
          <div class="col-auto">
           <div class="avatar-photo">
           ${initials}

  ${list[i].isFavorite
    ? `<span class="avatar-badge-fav">
         <i class="fa-solid fa-star"></i>
       </span>`
    : ""}

  ${list[i].isEmergency
    ? `<span class="avatar-badge">
         <i class="fa-solid fa-heart-pulse"></i>
       </span>`
    : ""}
</div>
          </div>
          <div class="col">
            <h5 class="mb-1 name-style">${list[i].name}</h5>
            <div class="d-flex align-items-center text-muted">

              <div class="icon-colorphone me-2">
             <i class="fa-solid fa-phone"></i>
             </div>
              <span>${list[i].phone}</span>
            </div>
          </div>
        </div>

       ${list[i].email ? `
<div class="row mb-3">
  <div class="col">
    <div class="d-flex align-items-center text-muted">
      <div class="icon-color-envolop me-2">
        <i class="fa-solid fa-envelope"></i>
      </div>
      <span>${list[i].email}</span>
    </div>
  </div>
</div>` : ""}


     ${list[i].address ? `
<div class="row mb-3">
  <div class="col">
    <div class="d-flex align-items-center text-muted">
      <div class="icon-colorlocation me-2">
        <i class="fa-solid fa-location-dot"></i>
      </div>
      <span>${list[i].address}</span>
    </div>
  </div>
</div>` : ""}

       ${list[i].group && list[i].group !== "Select a group" ? `
<div class="row mb-3">
  <div class="col gap-2 d-flex">
    <span class="friends">${list[i].group}</span>
    ${list[i].isEmergency ? `<span class="Emergency"><i class="fa-solid fa-heart-pulse"></i>Emergency</span>` : ""}
  </div>
</div>` : ""}

        <hr class="my-3">

        <div class="contact-actions row">
          <div class="col d-flex align-items-center  justify-content-between">
            <div class="d-flex justify-content-center align-items-center gap-3">
            <a href="tel:${list[i].phone}" class="phone-style d-flex justify-content-center align-items-center">
        <i class="fa-solid fa-phone"></i>
      </a>
               <a href="mailto:${list[i].email}" class="envelope-style d-flex justify-content-center align-items-center">
        <i class="fa-solid fa-envelope"></i>
      </a>
           </div>
          <div class="d-flex justify-content-center align-items-center gap-2">
    <div onclick="toggleFavorite(${ContactList.indexOf(list[i])})">
        <i class="fa-regular fa-star star-style d-flex justify-content-center align-items-center ${list[i].isFavorite ? 'favorite' : ''}"></i>
    </div>
    <div onclick="toggleEmergency(${ContactList.indexOf(list[i])})">
        <i class="fa-solid fa-heart-pulse heart-style d-flex justify-content-center align-items-center ${list[i].isEmergency ? 'emergency' : ''}"></i>
    </div>
    <div class="pencil-icon" onclick="editContact(${ContactList.indexOf(list[i])})">
        <i class="fa-solid fa-pencil pencile-style d-flex justify-content-center align-items-center"></i>
    </div>
    <div onclick="deleteContact(${ContactList.indexOf(list[i])})">
        <i class="fa-solid fa-trash trash-style d-flex justify-content-center align-items-center"></i>
    </div>
</div>

          </div>
        </div>
      </div>
    </div> `;
    }

    rowContacts.innerHTML = allDataBox;
    
   
    displayFavorites();
    displayEmergency();
}

    // validation
 

function validateForm() {
    // name
    if (nameInput.value.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter the contact's name!"
        });
        return false;
    }

    // phone
    let phonePattern = /^[0-9]{10,15}$/; 
    if (!phonePattern.test(phoneInput.value.trim())) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter a valid phone number (10-15 digits)!"
        });
        return false;
    }
// email
    if (emailInput.value.trim() !== "") {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid email address!"
            });
            return false;
        }
    }

 
    return true; 
}


saveContactBtn.onclick = function() {
    if (!validateForm()) return; 

    let contact = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim(),
        address: addressInput.value.trim(),
        group: groupInput.value,
        notes: notesInput.value.trim(),
        isFavorite: favoriteCheck.checked,
        isEmergency: emergencyCheck.checked
    };

    if (editIndex !== null) {
        
        ContactList[editIndex] = contact;
        Swal.fire({ title: "Updated!", text: "Contact has been updated successfully.", icon: "success" });
        editIndex = null;
    } else {
        
        ContactList.push(contact);
        Swal.fire({ title: "Added!", text: "Contact has been added successfully.", icon: "success" });
    }

    localStorage.setItem("contacts", JSON.stringify(ContactList));
    displayContacts();
    displayFavorites();
    displayEmergency();
    clearForm();

    
    let Modal = document.getElementById("contactModal");
    let bootstrapModal = bootstrap.Modal.getInstance(Modal);
    bootstrapModal.hide();
};
