// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
function createAlbumSelect() {
    fetch("https://jsonplaceholder.typicode.com/albums")
        .then(response => response.json())
        .then(data => {
            const albumSelection = document.getElementById("album-selection");
            const albumSelect = document.createElement("select");
            albumSelect.id = "album-select";
            
            const notSelected = document.createElement("option");
            notSelected.value = "-1";
            notSelected.innerHTML = "-- Select an album";
            notSelected.disabled = true;
            albumSelect.appendChild("not-selected");
            
            data
                .map(album => {
                    const option = document.createElement("option" );
                    option.setAttribute("value", album.id);
                    option.setAttribute("data-user-id", album.userId);
                    option.innerHTML = album.title;
                    return option;
                })
                .forEach(option => {
                    albumSelect.appendChild(option)
                });
            albumSelection.appendChild(albumSelect)
            
            const viewAlbumButton = document.createElement("button");
            viewAlbumButton.on("click", selectAlbum);
            
        }).catch(err => {
           console.log(err); 
    });
}

function selectAlbum(event) {
    const albumSelect = document.getElementById("album-select");
    const selectedAlbumId = albumSelect.options[albumSelect.selectedIndex].value;
    if(selectedAlbumId == -1) //not selected
    {
        document.getElementById("album-photos").innerHtml = "";
        document.getElementById("photo-comments").innerHtml = "";
    }
    
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId}`)
        .then(response => response.json())
        .then(data => {
           const albumPhotos = document.getElementById("album-photos");
           
           data
               .map(albumPhoto => {
                   const wrapper = document.createElement("div");
                   wrapper.classList.add("photo-list-item");
                   wrapper.id = `photo-${albumPhoto.id}-wrapper`;
                   const photoThumbnail = document.createElement("img");
                   photoThumbnail.id = `photo-${albumPhoto.id}-image`;
                   photoThumbnail.src = albumPhoto.thumbnailUrl;
                   photoThumbnail.alt = albumPhoto.title;
                   
                   wrapper.appendChild(photoThumbnail);
                   
                   const commentButton = document.createElement("button");
                   commentButton.id = `photo-${albumPhoto.id}-button`;
                   commentButton.setAttribute("data-id", albumPhoto.id)
                   commentButton.on("click", showComments);
                   commentButton.innerHTML = "Comments"
                   return wrapper;
               })
               .forEach(wrapper => albumPhotos.appendChild(wrapper))
        })
        .catch(err => {
            console.log(err);
        }); 
}

function showComments(event){
    const photoId = event.target["data-id"];
    alert(photoId);
}



