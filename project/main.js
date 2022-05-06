// URL DE LA API NO NEEDS API KEY
const URL_API_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';

// NEEDS API KEY - FAVORITES CATS
const URL_API_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?limit=';

// NEEDS API KEY - DELETE
const URL_API_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

// UPLOAD PHOTO OF CAT
const URL_API_FAVOURITES_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';


const spanError = document.getElementById("cats-error");

async function loadRandomCats () {
    const response = await fetch(URL_API_RANDOM);
    const data = await response.json();


    if (response.status !== 200) {
        spanError.innerHTML = "Hubo Un Error :( " + response.status + data.message;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
    
        img1.src= data[0].url    
        img2.src= data[1].url

        btn1.onclick = () => saveFavouritesCats(data[0].id);
        btn2.onclick = () => saveFavouritesCats(data[1].id);
    }
};

async function loadFavoriteCats () {
    const res = await fetch(URL_API_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': '2cf7d421-36c2-4347-a2e1-f502d3826859',
        },
    });
    const data = await res.json();
    console.log("FAV CATS")
    console.log(data);
    
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo Un Error :(" + res.status;
    } else {// por cada elemento de data sacamos la iformacion de un fato
        const section = document.getElementById('favorite-cats');
        section.innerHTML = "";

        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('.');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(cat => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('sacar al gato de favoritos');

            img.src = cat.image.url;
            btn.appendChild(btnText);
            btn.onclick = () => deleFavouriteCats(cat.id);

            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
};

async function saveFavouritesCats (id) {
    const res = await fetch(URL_API_FAVOURITES,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '2cf7d421-36c2-4347-a2e1-f502d3826859',
        },
        body: JSON.stringify({
            image_id: id,
        })
    });
    const data = await res.json();
    console.log(res);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo Un Error :(" + res.status + data.message;
    } else {
        console.log('the cat is save in favourites');
        loadFavoriteCats();
    }
};


async function deleFavouriteCats (id) {
    const res = await fetch(URL_API_FAVOURITES_DELETE(id),{
        method: 'DELETE' ,
        headers: {
            'X-API-KEY': '2cf7d421-36c2-4347-a2e1-f502d3826859',
        }
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo Un Error :(" + res.status + data.message;
    } else {
        console.log('the cat has been delete from the favourites');
        loadFavoriteCats();
    }
};

async function uploadCatPhoto () {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(URL_API_FAVOURITES_UPLOAD, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/formdata',
            'X-API-KEY': '2cf7d421-36c2-4347-a2e1-f502d3826859',
        },
        body: formData
    });

    const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavouritesCats(data.id);
    }
}
loadRandomCats();
loadFavoriteCats();

console.log("GRACIAS :3");
