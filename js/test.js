var jsonData = [
    { id: 1, image: "../images/VR_Images/dpvre4.png", title: "DP VR", description: "Description 1" },
    { id: 2, image: "../images/VR_Images/dpvrp2.png", title: "DP VR 2", description: "Description 2" },
    { id: 3, image: "../images/VR_Images/metaquest3.png", title: "Quest 3", description: "Description 3" },
    { id: 4, image: "../images/VR_Images/playstationvr2.png", title: "Playstation VR 2", description: "Description 4" },
    { id: 5, image: "../images/VR_Images/applevisionpro.png", title: "Apple Vision Pro", description: "Description 1" },
    { id: 6, image: "../images/VR_Images/dpvrp2.png", title: "DP VR 2", description: "Description 2" },
    { id: 7, image: "../images/VR_Images/metaquest3.png", title: "Quest 3", description: "Description 3" },
    { id: 8, image: "../images/VR_Images/playstationvr2.png", title: "Playstation VR 2", description: "Description 4" },
    { id: 9, image: "../images/VR_Images/dpvre4.png", title: "DP VR", description: "Description 1" },
    { id: 10, image: "../images/VR_Images/dpvrp2.png", title: "DP VR 2", description: "Description 2" }
];


document.addEventListener('DOMContentLoaded', function () {
    // Create a carousel item using the data from the JSON file 
    // Foreach item in jsonData, create a carousel item
    const carouselInner = document.querySelector('.carousel-inner');
    jsonData.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
            <div class="row justify-content-center m-0">
                <div class="card text-center p-0" style="width: 270px; height: 320px;">
                    <div class="card-header p-0 d-flex justify-content-center align-items-center" style="height: 50%;">
                        <button class="btn btn-link text-white" style="height: 100%; width: 100%;" data-bs-target="#infoModal" onclick="loadModalContent(${index})">
                            <img src="${item.image}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                        </button>
                    </div>
                    <div class="card-body" style="height: 50%;">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <button class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#infoModal" onclick="loadModalContent(${index})">
                        פרטים נוספים
                        </button>
                    </div>
                </div>
            </div>
        `;
        carouselInner.appendChild(carouselItem);
    });
    
    // Create a grid item using the data from the JSON file
    // and append it to the main element of the gridWrapper
    function createGrid() {
        const gridWrapper = document.createElement('div');
        gridWrapper.className = 'gridWrapper';
        document.querySelector('main').appendChild(gridWrapper);
        jsonData.forEach((item, index) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'gridItem';
            gridItem.style.display = 'flex';
            gridItem.style.flexDirection = 'column';
            gridItem.innerHTML = `
                <div class="card text-center p-0" style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}" style="width: 100%; flex-grow: 1; object-fit: cover;">
                    <div class="card-body d-flex flex-column" style="flex-grow: 2;">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text" style="flex-grow: 1;">${item.description}</p>
                        <button class="btn btn-primary mt-2" onclick="loadModalContent(${index})">פרטים נוספים</button>
                    </div>
                </div>
            `;
            gridWrapper.appendChild(gridItem);
        });
    }

    // Create the grid container and add it to the main element with the class gridWrapper
    // and then call the function to create the grid items
    createGrid();

    window.loadModalContent = function (index) {
        const modalContent = jsonData[index];
        const modalBody = document.querySelector('#infoModal .modal-body');
        modalBody.innerHTML = `
            <div class="row h-100">
                <div class="col-12 h-50">
                    <img src="${modalContent.image}" class="w-100 h-100" style="object-fit: cover;">
                </div>
                <div class="col-12 h-50 d-flex flex-column justify-content-center align-items-start p-4">
                    <h3>${modalContent.title}</h3>
                    <p>${modalContent.description}</p>
                </div>
            </div>
        `;
    }

    function toggleDisplay() {
        const width = window.innerWidth;
        const gridWrapper = document.querySelector('.gridWrapper');
        const carouselWrapper = document.querySelector('.carouselWrapper');

        if (width >= 992) {
            if (gridWrapper) gridWrapper.style.display = 'grid';
            if (carouselWrapper) carouselWrapper.style.display = 'none';
        } else {
            if (gridWrapper) gridWrapper.style.display = 'none';
            if (carouselWrapper) carouselWrapper.style.display = 'block';
        }
    }

    window.addEventListener('resize', toggleDisplay);
    toggleDisplay(); // Call on load to set the correct initial display
});
