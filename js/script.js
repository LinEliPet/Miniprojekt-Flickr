
const btn = document.querySelector('button');
console.log(btn);

btn.addEventListener('click', function (event) {
    const input = document.querySelector('input');
    console.log(input.value);

    clearImages();
    clearError();



    //Lägg till din egna KEY
    const KEY = 'e57639ddd9fe83b92646890ce062c815';
    let searchText = input.value;

    //Vi söker endast på 1foto per sida och 1 sida
    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;

    fetch(url).then(
        function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw 'Something went wrong. :(';
            }
        }
    ).then(
        function (data) {
            console.log(data);
            //Vi hämtar första bilden här:
            getImageUrl(data.photos.photo[0]);
        }
    ).catch(
        function (error) {
            console.log(error);
            const h1 = document.createElement('h1');
            h1.innerText = 'Could not find';
            document.body.append(h1);
        }
    );

    //Pusslar ihop bild-urlen
    function getImageUrl(photoObject) {
        let photo = photoObject;
        let size = 'm';

        let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

        // console.log(imgUrl);
        displayImg(imgUrl);
    }

    //Visar bilden
    function displayImg(url) {
        let img = document.createElement('img');
        img.src = url;

        document.body.appendChild(img);
    }

    //Tar bort bilden
    function clearImages() {
        const images = document.querySelectorAll('img');
        console.log(images);

        for (const img of images) {
            img.remove();
        }
    }

})

function clearError() {
    const h1 = document.querySelector('h1');
    console.log(h1);
    if (h1 != null) {
        h1.remove();
    }
}