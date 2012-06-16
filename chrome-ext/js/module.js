loader.loadWithScriptTag('dependency1').then(function (d1) {
    console.log("D1 Loaded", d1.f1());
    console.log("D2 will not be Loaded in Packaged App");
});
loader.loadWithXhr('dependency2').then(function (d2) {
    console.log("D2 Loaded", d2.f2());
    console.log("D1 will not be loaded in Content Script");
});
