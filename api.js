function getWorksFilteredByCategory (categoryId){

    //url de l'api pour recup les projets de l'architecte : 
    const apiUrl = 'http://localhost:5678/api/works';
    //selection de l'élement du DOM avec la classe "gallery" :
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

          //efface la galerie avant d'incorporer les nouveaux projets:
            gallery.innerHTML = ''

        // Ici, 'data' contient les projets récupérés depuis l'API
                for (let i = 0; i < data.length; i++){
                const project = data[i];
                //recuperation id de la categorie du projet
                  const projectCategoryId = project.category.id;
                  //est ce que l'id de la categorie du projet correspond à l'id de la categorie souhaitée ?
                  if (categoryId === projectCategoryId || categoryId===undefined){
                    //c'est la catégorie recherchée, alors :
                  
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
                  }
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
    }

  //mise en place du filtre : 
  const apiCategoriesUrl = 'http://localhost:5678/api/categories';

  fetch(apiCategoriesUrl)

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
        //creation du formulaire bouton radio en dehors de la boucle

        //Ajout du formulaire bouton radio   
        const categoriesFiltersContainer = document.getElementById('categories_filters');
          
          console.log(typeof categoriesFiltersContainer);

          //creation du bouton 'tous'
          let buttonAll =createRadioButton(undefined,'Tous','true');
          console.log(buttonAll);

          categoriesFiltersContainer.appendChild(buttonAll.button);
          categoriesFiltersContainer.appendChild(buttonAll.label);
        
            //creation du bouton 'tous'
            //let buttonAll = document.createElement('input');
            //buttonAll.type = 'radio';
            //buttonAll.name = 'filter';
            //buttonAll.value = 'all';
            //buttonAll.checked = true; //cochez par défaut le bouton 'tous'

            //creation du label 'tous'
            //let labelAll = document.createElement('label');
            //labelAll.textContent = 'Tous';
            //labelAll.classList.add('filterButton')
            //labelAll.appendChild(buttonAll); //on place l'input dans le label
            //formButton.appendChild(labelAll); //on place le label dans la div 'filtre'

        if(data && data.length >0) {
        
          //data recup depuis api /catagories
        for (let i =0; i<data.length; i++) {
          const filters = data[i];
          console.log(filters);

          //creation des boutons radio!!) 
          let radioButton = createRadioButton(filters.id, filters.name, false);
          categoriesFiltersContainer.appendChild(radioButton.button);
          categoriesFiltersContainer.appendChild(radioButton.label);


        }

      }
    })
    .catch(error => {
      console.error('une erreur s\'est produite :', error);
    });

    function createRadioButton(categoryId, labelText, checked){
      let radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = 'filter';
      radioButton.value = labelText;
      radioButton.checked = checked;

      let label = document.createElement('label');
      label.textContent = labelText;
      label.classList.add('filterButton');
      


      radioButton.addEventListener('click', function() {
      getWorksFilteredByCategory(categoryId);
      });

      return {
        button: radioButton,
        label : label
      };
    }

    getWorksFilteredByCategory();











