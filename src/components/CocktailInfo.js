import React from 'react'

const CocktailInfo = ({ selectedCocktail, saveOffline, btnData, isMainPage }) => {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const data = {
            ingredient: selectedCocktail[`strIngredient${i}`],
            measurement: selectedCocktail[`strMeasure${i}`]
        }
        if (data.ingredient) {
            ingredients.push(data);
        } else break;
    }
  return (
      <div className="cocktail-wrapper">
          <div className="cocktail-header">
              <div>
                  <h1>{selectedCocktail.strDrink}</h1>
                  <small>{selectedCocktail.strAlcoholic}</small>
              </div>
              {
                isMainPage ? <button className="offline-btn" onClick={saveOffline}>{btnData}</button> : ''
              }
          </div>

          <div className="cocktail-details">
              <div className="cocktail-details-ingredients">
                  <div>
                      <h2>Ingredients</h2>
                      <ul>
                              {
                                  ingredients.map((data, key) => (
                                      <li key={key} style={{ textTransform: 'capitalize' }}>{data.ingredient} : {data.measurement}</li>
                                  ))
                              }
                          </ul>
                  </div>
                  <div className="img-wrapper ">
                      <img src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink}></img>
                  </div>
              </div>
              <h2>Instructions</h2>
              <p>
                  {selectedCocktail.strInstructions}
              </p>
              <p><b>Serve in:</b> {selectedCocktail.strGlass}</p>
          </div>
      </div>
  )
}

export default CocktailInfo
