// ==UserScript==
// @name Scaleway HackatonHook
// @namespace Violentmonkey Scripts
// @match https://cloud.scaleway.com/#/*
// @grant none
// ==/UserScript==

console.log("Loading hook")

var sidebarLambdaComponent =
  ' \
<li style="cursor:pointer"> \
    <a id="lambda"> \
        <div class="actidiv" style="margin-right:3px"></div> \
        <i style="-webkit-text-fill-color: white;-webkit-text-stroke-color: #704384;-webkit-text-stroke-width: 1.2px" class="fas fa-2x fa-bolt"></i> \
        Lambda \
    </a> \
</li>';

var fontAwesome = '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" crossorigin="anonymous">'

var lambdaModal = '<div id="lambdaModal" class="modal fade" role="dialog">\
  <div class="modal-dialog">\
    <!-- Modal content-->\
    <div class="modal-content">\
      <div class="modal-header">\
        <h4 class="modal-title">Create lambda</h4>\
      </div>\
      <div class="modal-body">'
+
      '<div class="col-xs-12 col-sm-12 nopadding ng-scope">\
          <div class="center">\
              <form>\
                <div class="form-group">\
                  <label for="code-typeLabel">code-type</label>\
                  <select class="form-control" id="code-type">\
                    <option>csharp</option>\
                    <option>go</option>\
                    <option>node</option>\
                    <option>python</option>\
                    <option>python3</option>\
                    <option>ruby</option>\
                  </select>\
                </div>\
                <div class="form-group">\
                  <label for="exampleInputPassword1">Name</label>\
                  <input type="text" class="form-control" id="codeName" placeholder="name">\
                </div>\
                <div class="form-group">\
                  <label for="exampleFormControlFile1">file input</label>\
                  <input type="file" class="form-control-file" id="file">\
                </div>\
                <button type="submit" class="btn btn-primary">Submit</button>\
              </form>\
          </div>\
      </div>'
+
      '</div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
      </div>\
    </div>\
  </div>\
</div>';

var lambdaBodyStart ='\
<div class="col-xs-12 col-sm-12 nopadding ng-scope">\
  <div class="row page-header ng-scope">\
    <div class="col-md-8 nopadding">\
      <h1 class="ng-binding">Lambda</h1>\
    </div>\
    <div class="col-md-4 pull-right search-field nopadding">\
      <div class="input-group input-group-sm search-group"><span class="input-group-btn">\
      <button type="button" class="btn btn-default"><i class="fa fa-search fa-large"></i></button></span>\
      <input type="text" placeholder="Search bucket" class="form-control ng-pristine ng-untouched ng-valid">\
      </div>\
    </div>\
  </div>\
  <div class="row button-bar ng-scope">\
    <div class="col-md-8 nopadding"></div>\
    <div class="col-md-4 nopadding">\
      <button id="create-lambda" class="btn btn-primary btn-xl pull-right ng-binding" data-toggle="modal" data-target="#lambdaModal" > Create lambda</button>\
    </div>\
  </div>\
  <div class="row ng-scope">\
    <div class="col-md-12 nopadding">\
      <table class="table ng-scope ng-table">\
        <thead ng-include="templates.header" class="ng-scope">\
          <tr class="ng-scope">\
          <th class="ng-binding ng-scope">Name</th>\
        </thead>\
        <tbody class="ng-scope">';
var lambdaBodyEnd =
        '</tbody>\
      </table>\
    </div>\
  </div>\
</div>\
';

var genLambdaBody = function(list){
    var tableContent = "";
    for (var i = list.length - 1; i >= 0; i--) {
        tableContent = tableContent.concat('<tr class="ng-table-group"><td width="100">'+list[i]+'</td></tr>');
    }
    return lambdaBodyStart + tableContent + lambdaBodyEnd;
}

function loadFont() {
    $("head").append(fontAwesome)
}


function sideLambda() {
    $(".nav.nav-main").append(sidebarLambdaComponent)
    $("#lambda").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.history.pushState("", "", '/#/lambda');
        $("div[ui-view='']").html(genLambdaBody(["name 1", "name 2", "name 3"]));
        $("body").append(lambdaModal);
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
