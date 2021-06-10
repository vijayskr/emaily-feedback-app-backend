/*
//General FETCH

function fetchAlbums () {
    fetch("https://api-thirukkural.vercel.app/api?num=1")
    .then( res => res.json())
    .then(json => console.log(json));
}

fetchAlbums();
*/

//ES2017 syntax - async await
async function fetchAlbums() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const jsonres = await res.json();
  console.log(jsonres);
}

fetchAlbums();
