

export function pApp(el) {

  el.innerHTML = `
    <pre id="weatherIn"></pre>
    <input
        id="myInput"
        placeholder="Укажите город"
        required
        autofocus
      />
    <button type="submit" id="userbutton">Получить прогноз</button>
    <pre id="weatherInfo"></pre>`;

    // Получаем указатели на нужные элементы
    const weatherInEl = el.querySelector("#weatherIn"); // указатель на поле вывода
    const weatherInfoEl = el.querySelector("#weatherInfo"); // указатель на поле вывода
    const buttonEl = el.querySelector("#userbutton"); // указатель на кнопку
    const input = el.querySelector("input");
    let myCaller = 0;
    


    getForecastInMyCity();

    buttonEl.addEventListener("click", () => {
  
        const cityName = input.value;
        input.value = "";

        myCaller = 2;
        getForecast(cityName, myCaller);
    });

    
    async function getForecastInMyCity() {
        
        let response = await fetch(`https://get.geojs.io/v1/ip/geo.json`); 
        let Data = await response.json();

        myCaller = 1;
        getForecast(Data.city, myCaller);
    
     };
    

    async function getForecast(cityName, myCaller) {


      try {
        
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=1684d3bcd6433559b8c400a5ef312ab2`); 

        if (response.ok) {
          
          let jsonData = await response.json();
          
          if (myCaller === 1) {createBlocks(jsonData, weatherInEl, 0);};
          if (myCaller === 2) {createBlocks(jsonData, weatherInfoEl, 0);}; 
        
        } else {
        
          // Индивидуальные сообщения для ошибочных HTTP-кодов
          if (response.status === 404) throw new Error('Неверно указан город!');
          if (response.status === 400) throw new Error('Вы не указали город! Укажите название города в поле ввода.');
          // Для остальных ошибок
          throw new Error(`${response.status}: Что-то пошло не так! Обратитесь к разработчику`);
        
        }
      } catch (error) {
           createBlocks(null, weatherInfoEl, 1, error);
      }     

    }; 
    

  function createBlocks (obj, tagPointer, catchErr, error) {

      deleteOldTag ();

      if (catchErr === 0) {
        //weatherInfoEl.innerHTML = JSON.stringify(jsonData, null, 2); // выведет на экран весь результат json
        const newP1 = document.createElement('p');
        newP1.innerHTML = "Выбранный город: " + obj.name;
        tagPointer.appendChild(newP1);

        const newP2 = document.createElement('p');
        newP2.innerHTML = `${obj.weather[0].description} \nТемпература: ${obj.main.temp}&deg;C`;
        tagPointer.appendChild(newP2);

        const newP3 = document.createElement('p');
        newP3.innerHTML = 
        `Ощущается как: ${obj.main.feels_like}&deg;C
        Максимальная температура: ${obj.main.temp_max}&deg;C
        Минимальная температура:  ${obj.main.temp_min}&deg;C
        Атмосферное давление: ${obj.main.pressure} мм.рт.ст
        Влажность: ${obj.main.humidity}% `;

        tagPointer.appendChild(newP3);
      };
      if (catchErr === 1) {
          const newP4 = document.createElement('p');
          newP4.innerHTML = error;
          tagPointer.appendChild(newP4);
      };

  };

  
  function deleteOldTag () {

    let pList = weatherInfoEl.querySelectorAll("p");

    if (pList.length > 0) {
      pList.forEach(p => {
      p.remove(); // Удаляем каждый найденный <p>
      });
    }

  };
  

};


