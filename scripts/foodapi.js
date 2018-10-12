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
  console.log(foods);
  let boxCont = document.createElement("article");
  boxCont.setAttribute("class", "foodBox");
  let boxTitle = document.createElement("h1");
  boxTitle.innerHTML = foods.name;
  boxCont.appendChild(boxTitle)
  let boxEthnicity = document.createElement("p");
  boxEthnicity.innerHTML = "Genre: " + foods.ethnicity;
  boxCont.appendChild(boxEthnicity);
  let boxType = document.createElement("p");
  boxType.innerHTML = "Type: " + foods.type;
  boxCont.appendChild(boxType);
  let boxOrigin = document.createElement("p");
  boxOrigin.innerHTML = "Origin: " + foods.origin;
  boxCont.appendChild(boxOrigin);
  let boxSugar = document.createElement("p");
  boxSugar.innerHTML = "Sugar per Serving: " + foods.sugar;
  boxCont.appendChild(boxSugar);
  let boxFat = document.createElement("p");
  boxFat.innerHTML = "Fat per Serving: " + foods.fat;
  boxCont.appendChild(boxFat);
  let boxCarbs = document.createElement("p");
  boxCarbs.innerHTML = "Carbs per Serving: " + foods.carbs;
  boxCont.appendChild(boxCarbs);
  let boxIngred = document.createElement("p");
  let tempString = "Ingredients: " + foods.ingredients[0].text;
  for(let i = 1; i < foods.ingredients.length; i++){
    tempString +=  ", " + foods.ingredients[i].text;
  }
  tempString += ".";
  console.log(tempString);
  boxIngred.innerHTML = tempString;
  boxCont.appendChild(boxIngred);
  return boxCont;
}

const addFoodToDom = (printFood) => {
  let tempHolder = document.querySelector(".foodList");
  tempHolder.appendChild(printFood);
}