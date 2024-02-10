var jsonData = [
    { id: 1, image: "../images/VR_Images/dpvre4.png", title: "DPVR", description: "DPVR" },
    { id: 2, image: "../images/VR_Images/dpvrp2.png", title: "DPVR 2", description: "DPVR" },
    { id: 3, image: "../images/VR_Images/metaquest3.png", title: "Quest 3", description: "Meta" },
    { id: 4, image: "../images/VR_Images/playstationvr2.png", title: "Playstation VR 2", description: "Sony" },
    { id: 5, image: "../images/VR_Images/applevisionpro.png", title: "Apple Vision Pro", description: "Apple" },
    { id: 6, image: "../images/VR_Images/lenovothinkrealityvrx.png", title: "Thinkreality vrx", description: "Lenovo" },
    { id: 7, image: "../images/VR_Images/nolosonic2_3.png", title: "Nolo 2", description: "Nolo" },
    { id: 8, image: "../images/VR_Images/pico4enterprise_2.png", title: "Pico 4 Enterprise", description: "Bestware" },
    { id: 9, image: "../images/VR_Images/picog3.png", title: "Pico G3", description: "Bestware" },
    { id: 10, image: "../images/VR_Images/shiftallmeganex.png", title: "Meganex", description: "ShiftAll" }
];

async function getUser() {
    const url = `https://randomuser.me/api/?nat=us`;
    const params = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    };
    try {
        const response = await fetch(url, params);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            createUser(data);
        } else {
            console.log('Response was not ok.');
        }
    } catch (error) {
        console.log(error);
    }
}



function createUser(userFromAPI) {
    const avatar = document.getElementById("avatar");
    avatar.innerHTML = ""; // Clear previous content

    // Accessing the first result from the API response
    const user = userFromAPI["results"][0];
    
    // Creating HTML content
    const html = `
        <img src="${user["picture"]["large"]}" class="rounded-circle user-avatar" alt="Avatar" style="width: 30px; height: 30px;">
        <a class="navbar-brand" id="username" href="#">${user["name"]["first"]} ${user["name"]["last"]}</a>
    `;
    avatar.innerHTML = html;

    // Adding click event listener to the image for enlargement
    const img = avatar.querySelector('.user-avatar');
    img.onclick = function() {
        displayImageModal(user["picture"]["large"]);
    };
}

function displayImageModal(imageSrc) {
    // Create modal container
    const modal = document.createElement("div");
    modal.setAttribute("id", "imageModal");
    modal.setAttribute("class", "image-modal");

    // Create close button
    const closeButton = document.createElement("span");
    closeButton.setAttribute("class", "close-btn");
    closeButton.innerHTML = "X";
    closeButton.onclick = function() {
        document.body.removeChild(modal);
    };

    // Create image element
    const img = document.createElement("img");
    img.setAttribute("class", "modal-content");
    img.setAttribute("src", imageSrc);

    // Set image size to 150x150 pixels
    img.style.width = "300px";
    img.style.height = "300px";

    // Append close button and image to modal
    modal.appendChild(closeButton);
    modal.appendChild(img);

    // Append modal to body
    document.body.appendChild(modal);

    // Attach event to close modal if clicking outside the image
    window.onclick = function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    };
}




document.addEventListener('DOMContentLoaded', function () {
    getUser(); // get user from API
    // Create carousel items
    const carouselInner = document.querySelector('.carousel-inner');
    jsonData.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
            <div class="row justify-content-center m-0">
                <div class="card text-center p-0" style="width: 270px; height: 360px;">
                    <div class="card-header p-0 d-flex justify-content-center align-items-center" style="height: 50%;">
                        <img src="${item.image}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                    </div>
                    <div class="card-body" style="height: 50%;">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <button class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#infoModal">
                            פרטים נוספים
                        </button>
                    </div>
                </div>
            </div>
        `;
        carouselInner.appendChild(carouselItem);
        // Attach event listener to the button
        carouselItem.querySelector('button').addEventListener('click', () => loadModalContent(index));
    });

    createGrid(); // Create grid items

    function createGrid() {
        const gridWrapper = document.createElement('div'); // Grid wrapper
        gridWrapper.className = 'gridWrapper';
        document.querySelector('main').appendChild(gridWrapper);
        // Create grid items
        jsonData.forEach((item, index) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'gridItem';
            gridItem.style.display = 'flex';
            gridItem.style.flexDirection = 'column';
            gridItem.innerHTML = `
                <div class="card text-center p-0" style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                    <div>    
                        <img src="${item.image}" class="card-img-top" alt="${item.title}" style="width: 100%; flex-grow: 1; object-fit: cover;">
                    </div>    
                    <div class="row card-body d-flex flex-column" style="flex-grow: 2;">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text" style="flex-grow: 1;">${item.description}</p>
                            <button class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#infoModal">
                                פרטים נוספים
                            </button>
                    </div>
                </div>
            `;
            gridWrapper.appendChild(gridItem);
            // Attach event listener to the button
            gridItem.querySelector('button').addEventListener('click', () => loadModalContent(index));
        });
    }

    // load the modal content based on the index
    window.loadModalContent = function(index) { 
        const modalContent = jsonData[index];
        const modalBody = document.querySelector('#infoModal .modal-body');
        modalBody.innerHTML = `
        <div class="row h-100">
        <div class="col-12 h-50 d-flex justify-content-center align-items-center">
            <img src="${modalContent.image}" class="w-50" style="object-fit: cover;">
        </div>
        <div class="col-12 h-50 d-flex flex-column justify-content-center align-items-start p-4">
            <h3>${modalContent.title}</h3>
            <p>${modalContent.description}</p>
            <a class="btn btn-success" href="https://trends.google.com/trends/explore?date=today%205-y&q=${modalContent.title}&hl=en-EN" target="_blank" class="btn btn-primary">חיפוש ב-Google Trends</a>      
            </div>
    </div>
    
        `;
    }


    function toggleDisplay() { // toggle display based on the screen width
        const width = window.innerWidth;
        const gridWrapper = document.querySelector('.gridWrapper');
        const carouselWrapper = document.querySelector('.carouselWrapper');
        
        if (width >= 992) {
            gridWrapper.style.display = 'grid';
            carouselWrapper.style.display = 'none';
        } else {
            gridWrapper.style.display = 'none';
            carouselWrapper.style.display = 'block';
        }
    }

    window.addEventListener('resize', toggleDisplay);
    toggleDisplay(); // Ensure the correct display on load
});
