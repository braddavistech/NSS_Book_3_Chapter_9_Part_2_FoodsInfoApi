fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
      parsedFoods.forEach(food => {
        fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
          .then(response => response.json())
          .then(productInfo => {
            addFoodInfo(food, productInfo)
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
          })
      })
    })

const addFoodInfo = (food, productInfo) => {
  food.origin = productInfo.product.countries;
  food.sugar = productInfo.product.nutriments.sugars_serving;
  food.fat = productInfo.product.nutriments.fat_serving;
  food.carbs = productInfo.product.nutriments.carbohydrates_serving;
  food.ingredients = productInfo.product.ingredients;
  return food;
}


const foodFactory = (foods) => {
  let boxCont = document.createElement("article");
  boxCont.setAttribute("class", "foodBox");
  let boxTitle = document.createElement("h1");
  boxTitle.innerHTML = foods.name;
  boxCont.appendChild(boxTitle)
  let boxEthnicity = document.createElement("p");
  boxEthnicity.innerHTML = foods.ethnicity;
  boxCont.appendChild(boxEthnicity);
  let boxType = document.createElement("p");
  boxType.innerHTML = foods.type;
  boxCont.appendChild(boxType);
  let boxOrigin = document.createElement("p");
  boxOrigin.innerHTML = foods.origin;
  boxCont.appendChild(boxOrigin);
  return boxCont;
}

const addFoodToDom = (printFood) => {
  let tempHolder = document.querySelector(".foodList");
  tempHolder.appendChild(printFood);
}