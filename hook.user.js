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
	console.log("Hook complete")
}


init()


