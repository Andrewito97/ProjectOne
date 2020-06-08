export default function clearInput(input) {
    input.click();
    browser.keys(['Control', 'a']);
    browser.keys(['Backspace']);
};
