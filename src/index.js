console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function () {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      const images = data.message; 
      const dogImageContainer = document.getElementById('dog-image-container');

      images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        dogImageContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching images:', error));

  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        const breedObj = data.message;
        const dogBreedslist = document.getElementById('dog-breeds');

        for(const breed in breedObj) {
            const listItem = document.createElement('li');
            listItem.textContent = breed;
            dogBreedslist.appendChild(listItem);
        }
        const listItems = document.querySelectorAll('#dog-breeds li');

        listItems.forEach(item => {
            item.addEventListener('click', function () {
                this.style.color = 'blue';
            });
          });

        const breedDropdown = document.getElementById('breed-dropdown');
      
        breedDropdown.addEventListener('change', function () {
            const selectedLetter = this.value;
            const breedListItems = dogBreedslist.getElementsByTagName('li');
    
            for (const listItem of breedListItems) {
              const breedName = listItem.textContent;
    
              if (breedName.startsWith(selectedLetter)) {
                listItem.style.display = 'block';
              } else {
                listItem.style.display = 'none';
              }
            }
          });
        })
        .catch(error => console.error('Error fetching breeds:', error));
    });