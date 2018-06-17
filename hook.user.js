// ==UserScript==
// @name Scaleway HackatonHook
// @namespace Violentmonkey Scripts
// @match https://cloud.scaleway.com/#/*
// @grant none
// ==/UserScript==

console.log("Loading hook")

var sidebarLambdaComponent =
  ' \
<li style="cursor:pointer" ng-class="{active: $state.includes(\'lambda\'), disabled: $state.includes(\'warnings\')}"> \
    <a id="lambda" ui-sref="lambda.list({\'zoneId\': currentZone.id})" ui-sref-opts="{reload: true}"> \
        <div class="actidiv" style="margin-right:3px"></div> \
        <i style="-webkit-text-fill-color: white;-webkit-text-stroke-color: #704384;-webkit-text-stroke-width: 1.2px" class="fas fa-2x fa-bolt"></i> \
        Executors \
    </a> \
</li>';

var fontAwesome = '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" crossorigin="anonymous">'

$(document)
$(".main-view").on("change", function(e) {
  alert("changed")
});


function loadFont() {
    $("head").append(fontAwesome)
}


function sideLambda() {
    $(".nav.nav-main").append(sidebarLambdaComponent)
    $("#lambda").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert("got it")
    })
}


function init() {
    loadFont()
    sideLambda()
    window.addEventListener('hashchange', function() {
        var currentState = $("html").injector().get("$state").current;
        if(currentState.name == "files.list"){
            injectPolicy();
        }
    });

    console.log("Hook complete")
}
var injectPolicy = function(){
    $("body").append(modal);
    $("thead.ng-scope tr").each(function(elem){
        $(this).append(head);
    });

    setTimeout(function () {
        $("tbody.ng-scope tr").each(function(){
            $(this).find("td:last-of-type").before(button)
        });
    }, 1e3)

}
var form = ''

var modal = '<div id="myModal" class="modal fade" role="dialog">\
  <div class="modal-dialog">\
    <!-- Modal content-->\
    <div class="modal-content">\
      <div class="modal-header">\
        <h4 class="modal-title">Manage Policies</h4>\
      </div>\
      <div class="modal-body">\
        '+ form +'\
      </div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
      </div>\
    </div>\
  </div>\
</div>'

var button = '<td width="100"><button data-toggle="modal" data-target="#myModal" class="btn btn-default">Manage Policies</button></td>'

var head = '<th></th>'

init()
