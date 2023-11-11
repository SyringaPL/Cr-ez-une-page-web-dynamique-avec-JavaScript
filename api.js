//url de l'api pour recup les projets de l'architecte : 
const apiUrl = 'http://localhost:5678/api/works';
//selection de l'élement du DOM .class : "gallery"
const gallery = document.querySelector('.gallery');

//utilisation de la fonction fetch pour faire une requête sur l'api : 
fetch(apiUrl)//promise
    
  .then(response => {
      //verification que la réponse est dans la plage 200-299(ok), sinon Error
    if (!response.ok) { //si non ok alors false = echec
      //interruption de l'exec programme et passage à la clause catch
      throw new Error('La requête a échoué');
    }
    return response.json(); // Analyse la réponse JSON
  })
  //si tout est ok, appel de la fonction de gestion des données : 
  .then(data => {
    if (data && data.length >0) {
    // Ici, 'data' contient les projets récupérés depuis l'API
            for (let i = 0; i < data.length; i++){
            const project = data[i];

            //créer les élements figure + img + figcaption pour chaque projet
            const figure = document.createElement('figure');
            const img =document.createElement('img');
            const figcaption = document.createElement('figcaption')

            //les relier à leur url et leur titre
            img.src = project.imageUrl;
            img.alt = project.title;
            figcaption.textContent = project.title;

            //les creer dans le parent
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }}
     else {
    console.error('Les données de projet ne sont pas définies ou vides.')
  }
  })
  //gestion des erreurs qui pourraient se produire à la récup des données ou pendant leur traitement: 
  .catch(error => {
    //fonction appelée en cas d'erreur ("error" => détail sur l'erreur, message etc)
    console.error('Une erreur s\'est produite:', error);
  });






