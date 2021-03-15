page = {
    page1: "http://localhost/work2/page1.html"
    , page2: "http://localhost/work2/page2.html"
};
js = ["http://localhost/work2/js/forPage1.js",
    "http://localhost/work2/js/forPage2.js"];
async function loadPage() {
    for ([key, value] of Object.entries(page)) {
        $("#" + key).hide();
        await $.ajax({
            type: "post",
            url: value,
            success: (res) => {
                $("#" + key).append(res);
            }
        });
    }
}
function loadJS() {
    js.forEach((url) => {
        $.ajax({
            type: "post",
            url: url
        });
    });
}
async function loadAsset() {
    await loadPage();
    loadJS();
    delete (page);
    delete (js);
};
loadAsset();
$("#indexButton").click(() => {

    $("#indexButton").hide();
    $("#page1").fadeIn(500);
});

