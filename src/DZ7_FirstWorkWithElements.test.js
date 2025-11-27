import { pApp } from "./DZ7_FirstWorkWithElements.js";

describe("pApp", () => {
  let el;
  let input;
  let button;
  beforeEach(() => {
    el = document.createElement("div");
    pApp(el);
    input = el.querySelector("input");
    button = el.querySelector("button");
  });

  const enterText = (text) => {
    input.value = text;
    input.dispatchEvent(new Event("input"));
  };
  const clickButton = () => button.click();
  const isButtonVisible = () => !button.hidden;
  const getParagraphs = () =>
    Array.from(el.querySelectorAll("p")).map((el) => el.innerHTML);

  it("shows initial markup", () => {
    expect(input).not.toBe(null);
    expect(button).not.toBe(null);
    expect(isButtonVisible()).toBe(false);
    expect(getParagraphs()).toEqual(["Текст первого параграфа", "Текст второго параграфа", "Текст третьего параграфа"]);
  });

  it("button appears on entering text", () => {
    enterText("123");
    expect(isButtonVisible()).toBe(true);
  });

  it("button disappears on entering text", () => {
    enterText("123");
    enterText("");
    expect(isButtonVisible()).toBe(false);
  });

  it("adds paragraph with text from input", () => {
    const text = `${Math.random()}`;
    enterText(text);
    clickButton();
    expect(getParagraphs()).toEqual(["Текст первого параграфа", "Текст второго параграфа", "Текст третьего параграфа", text]);
  });

  it("adds paragraph with text from input", () => {
    const text1 = `${Math.random()}`;
    enterText(text1);
    clickButton();
    const text2 = `${Math.random()}`;
    enterText(text2);
    clickButton();
    const text3 = `${Math.random()}`;
    enterText(text3);
    clickButton();
    expect(getParagraphs()).toEqual(["Текст второго параграфа", "Текст третьего параграфа", text1, text2, text3]);
  }); 


  it("Checking that the input field is cleared after pressing the button", () => {
    const text4 = `${Math.random()}`;
    enterText(text4);
    clickButton();
    expect(input.value.length).toEqual(0);
    expect(isButtonVisible()).toBe(false);
  }); 


it("a new paragraph is added if a space is entered", () => {
    const text = " ";
    enterText(text);
    clickButton();
    expect(getParagraphs()).toEqual(["Текст первого параграфа", "Текст второго параграфа", "Текст третьего параграфа", " "]);
  }); 


it("button will not be broken", () => {
    const text1 = `${Math.random()}`;
    enterText(text1);
    clickButton();
    const text2 = `${Math.random()}`;
    enterText(text2);
    clickButton();
    const text3 = `${Math.random()}`;
    enterText(text3);
    clickButton();
    const text4 = `${Math.random()}`;
    enterText(text4);
    clickButton();
    expect(getParagraphs()).toEqual(["Текст третьего параграфа", text1, text2, text3, text4]);
    expect(isButtonVisible()).toBe(false);
    expect(input.value.length).toEqual(0);
  }); 

  it("button will never be broken", () => {
    const text1 = `${Math.random()}`;
    enterText(text1);
    clickButton();
    const text2 = `${Math.random()}`;
    enterText(text2);
    clickButton();
    const text3 = `${Math.random()}`;
    enterText(text3);
    clickButton();
    const text4 = `${Math.random()}`;
    enterText(text4);
    clickButton();
    const text5 = `${Math.random()}`;
    enterText(text5);
    clickButton();
    expect(getParagraphs()).toEqual([text1, text2, text3, text4, text5]);
    expect(isButtonVisible()).toBe(false);
    expect(input.value.length).toEqual(0);
  }); 


});

