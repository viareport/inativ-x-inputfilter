var TestSuite = require('spatester').TestSuite;

var testSuite = new TestSuite("x-inputfilter test", {});

Testem.useCustomAdapter(function(socket) {
    testSuite.setSocket(socket);
});

testSuite.addTest("Input filter test", function(scenario, asserter) {
    var inputSelector = "#filter input";
    var eraserSelector = "#filter .eraser";

    scenario
        .wait(inputSelector)
        .fill(inputSelector, 'ceci est un texte');

    // Guard asserts
    asserter.assertTrue(function() {
        return asserter.value(inputSelector)() === "ceci est un texte";
    }, 'Le contenu de l\'input doit être "ceci est un texte"');

    scenario
        .click(eraserSelector);

    asserter.assertTrue(function() {
        return asserter.value(inputSelector)() === "";
    }, 'Après un clic sur erase, le contenu de l\'input doit être vide');
});

testSuite.addTest("Input filter propagation test", function(scenario, asserter) {
    var inputWrapper = document.getElementById("inputFilterWrapper");

    var isDivClicked = false;
    var monTest = this;
    inputWrapper.addEventListener('click', function clickOnDiv(e) {
        monTest.isDivClicked = true;
    });

    scenario
        .click("#filter input");

    asserter.assertTrue(function() {
        return monTest.isDivClicked;
    }, 'Le click sur l\'input doit être propagé');
});

document.addEventListener('DOMComponentsLoaded', function(){
    testSuite.run();
});