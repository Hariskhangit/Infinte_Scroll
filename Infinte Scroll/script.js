const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;


// unsplash API
const count = 30;
const apiKey = 'R59WKWLsJokq2Ps2p2kkAQmAzth4FgtbqJFGzHQIJmg';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded

function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready=true;
        loader.hidden=true;
    }
}

// helper function to set-attribute on DOM elemets

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}


// create elements for links & PHOTOS ,ADD TO DOM

function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //create anchor link <a> to-unsplash
        const item = document.createElement('a');
        
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');

        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // event listner, check when each is finished loading

        img.addEventListener('load', imageLoaded)
        // put image <img> inside <a> then put both insdid imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}
 

// get photos from unsplash api

async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();

    } catch (error){
        // catches error here
    }
}

//check to see if srolling near bootom of page, load more photos

window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 & ready){
        ready=false;
        getPhotos();
    }
})

// on load

getPhotos();