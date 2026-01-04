//import { pApp } from "./GetWeather.js";
import { pApp } from "./OldGetWeather.js";
//import { getForecast } from "./GetWeather.js";


describe("pApp", () => {
  let el;
  let input;
  let button;
  let weatherInfoEl;
  
  beforeEach(() => {
    el = document.createElement("div");
    pApp(el);
    input = el.querySelector("input");
    button = el.querySelector("button");
    weatherInfoEl = el.querySelector("#weatherInfo");
  });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: 'mocked data' }),
      //text: () => Promise.resolve('mocked text'),
      status: 200
    })
  );

  const enterText = (text) => {
    input.value = text;
    input.dispatchEvent(new Event("input"));
  };
  const clickButton = () => button.click();
  const isButtonVisible = () => !button.hidden;
  //const getParagraphs = () => Array.from(el.querySelectorAll("p")).map((el) => el.innerHTML);
//const getParagraphs = () => Array.from(weatherInfoEl.querySelectorAll("p")).map((weatherInfoEl) => weatherInfoEl.innerHTML);
//const getCountP = () => weatherInfoEl.querySelectorAll("p").length;


  it("shows initial markup", () => {
    expect(input).not.toBe(null);
    expect(button).not.toBe(null);
    expect(isButtonVisible()).toBe(true);
    
  });

  it("button does not disappears on entering text", () => {
    enterText("123");
    enterText("");
    expect(isButtonVisible()).toBe(true);
  });

  it("Checking that the input field is cleared after pressing the button", () => {
    const text = `${Math.random()}`;
    enterText(text);
    clickButton();
    expect(input.value.length).toEqual(0);
    expect(isButtonVisible()).toBe(true);
  });
  
/*
  test('должен получать данные', async () => {
  const data = await getForecast();
  expect(data).toEqual({ data: 'Mocked Data' });
  
  });
*/
  /*
it("If the user has not filled in the input field, an error occurs", () => {
    //const text = `${Math.random()}`;
    const text = ``;
    enterText(text);
    clickButton();
    expect(getParagraphs()).toEqual([
      "Error: Вы не указали город! Укажите название города в поле ввода.",
    ]);
  });
 
it("If the user has not filled in the input field, an error occurs", () => {
    const text = `ываывпавап`;
    enterText(text);
    clickButton();
    expect(getParagraphs()[2]).toEqual([
      "Error: Неверно указан город!",
    ]);
  });



  it("we get three <p>", () => {
    const text = `moscow`;
    enterText(text);
    clickButton();
    expect(getCountP()).toEqual(3);
  });
  


  it("if user choose moscow", () => {
    const text = `moscow`;
    enterText(text);
    clickButton();
    expect(getParagraphs()).toEqual([
      "Выбранный город: Moscow",
      "overcast clouds Температура: 0.83°C",
      "Ощущается как: -1.57°C Максимальная температура: 0.93°C Минимальная температура:  0.24°C Атмосферное давление: 1022 мм.рт.стВлажность: 76% ",
    
    ]);
  });

  it("if user choose moscow _first p", () => {
    const text = `moscow`;
    enterText(text);
    clickButton();
    setTimeout(() => { }, 5000);

    expect(getParagraphs()[0]).toEqual("Выбранный город: Moscow");
  });
*/
  
});
