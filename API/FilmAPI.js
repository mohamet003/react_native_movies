
export function getFilmByText(text,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=c157271dd82ec05fe66b5a8bd951f4ff&language=fr&query='+text+'&page='+page+'&include_adult=true'
    return fetch(url)
        .then((response)=> response.json())
        .catch((error)=>console.log(error()))
 }
 export function getImage(name) {
     return 'https://image.tmdb.org/t/p/w500/'+name
 }