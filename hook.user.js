// ==UserScript==
// @name Scaleway HackatonHook
// @namespace Violentmonkey Scripts
// @match https://cloud.scaleway.com/#/*
// @grant none
// ==/UserScript==

console.log("Loading hook")

//Sidebar
var sidebarLambdaComponent =
    ' \
<li style="cursor:pointer" id="lambda_sideMenu"> \
    <a id="lambda"> \
        <div class="actidiv" style="margin-right:3px"></div> \
        <i style="-webkit-text-fill-color: white;-webkit-text-stroke-color: #704384;-webkit-text-stroke-width: 1.2px" class="fas fa-2x fa-bolt"></i> \
        Executors \
    </a> \
</li>';
var fontAwesome = '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" crossorigin="anonymous">'

//Policies template
var policyForm =
  '<form id="policyForm" class="form-horizontal m-5"><fieldset> \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="in_endpoint">IN endpoint</label> \
  <div class="col-md-8"> \
  <input id="in_endpoint" name="in_endpoint" type="text" placeholder="" class="form-control input-md" required="" /> \
  </div> \
</div> \
 \
 <div class="form-group"> \
 <label class="col-md-4 control-label" for="in_bucket">IN bucket</label> \
 <div class="col-md-8"> \
 <input id="in_bucket" name="in_bucket" type="text" placeholder="" class="form-control input-md" /> \
 </div> \
 </div> \
 \
 <div class="form-group"> \
   <label class="col-md-4 control-label" for="in_path">IN path</label>  \
   <div class="col-md-8"> \
   <input id="in_bucket" name="in_path" type="text" placeholder="/" class="form-control input-md" /> \
   </div> \
 </div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="in_key">IN access key</label> \
  <div class="col-md-8"> \
  <input id="in_key" name="in_key" type="text" placeholder="" class="form-control input-md" /> \
  </div> \
</div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="in_secret">IN secret key</label> \
  <div class="col-md-8"> \
  <input id="in_secret" name="in_secret" type="text" placeholder="" class="form-control input-md" /> \
  </div> \
</div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="out_endpoint">OUT endpoint</label> \
  <div class="col-md-8"> \
  <input id="out_endpoint" name="out_endpoint" type="text" placeholder="" class="form-control input-md" /> \
  </div> \
</div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="out_bucket">OUT bucket</label> \
  <div class="col-md-8"> \
  <input id="out_bucket" name="out_bucket" type="text" placeholder="" class="form-control input-md" /> \
  </div> \
</div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="out_path">OUT path</label> \
  <div class="col-md-8"> \
  <input id="in_path" name="out_path" type="text" placeholder="/" class="form-control input-md" /> \
  </div> \
</div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="out_key">OUT key</label> \
  <div class="col-md-8"> \
  <input id="out_key" name="out_key" type="text" placeholder="" class="form-control input-md" /> \
  </div> \
</div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="out_secret">OUT secret</label> \
  <div class="col-md-8"> \
  <input id="out_secret" name="out_secret" type="text" placeholder="" class="form-control input-md" /> \
  </div> \
</div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="rule_filter">Field filter</label> \
  <div class="col-md-8"> \
    <select id="rule_filter" name="rule_type" class="form-control"> \
      <option value="regex">Regex</option> \
      <option value="date">Date</option> \
      <option value="size">Size</option> \
    </select> \
  </div> \
</div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="rule_compare_op">Compare operation</label> \
  <div class="col-md-8"> \
    <select id="rule_compare_op" name="rule_compare_op" class="form-control"> \
      <option value="eq">==</option> \
      <option value="gt">&gt;</option> \
      <option value="ge">&gt;=</option> \
      <option value="lt">&lt;</option> \
      <option value="le">&lt;=</option> \
      <option value="ne">not</option> \
      <option value="cont">contains</option> \
    </select> \
  </div> \
</div> \
 \
<div class="form-group"> \
  <label class="col-md-4 control-label" for="rule_value">Match value</label> \
  <div class="col-md-8"> \
  <input id="rule_value" name="rule_value" type="text" placeholder="" class="form-control input-md" /> \
  </div> \
</div> \
 \
 <div class="form-group">\
  <label class="col-md-4 control-label" for="parallelization">Parallelization</label>\
  	<div class="col-md-4">\
      <input type="checkbox" name="parallelization" id="parallelization" value="true">\
  	</div>\
</div>\
\
<div class="form-group"> \
  <label class="col-md-4 control-label" for="operations">Operation type</label> \
  <div class="col-md-8"> \
    <select id="operations" name="operations" class="form-control"> \
      <option value="move">Move</option> \
      <option value="copy">Copy</option> \
    </select> \
  </div> \
</div> \
 \
</fieldset>';

var policyModal = '<div id="policyModal" class="modal fade" role="dialog">\
	<div class="modal-dialog">\
	<div class="modal-content">\
		<div class="modal-header">\
			<h4 class="modal-title">Add Bucket Policy</h4>\
		</div>\
		<div class="modal-body">\
			'+ policyForm + '\
		</div>\
		<div class="modal-footer">\
				<div class="form-group"> \
					<div class="col-md-4" style="text-align:left"> \
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\
					</div> \
					<div class="col-md-8"> \
						<label class="btn btn-default"> \
							Import configuration \
							<input name="import_config" type="file" class="hidden" hidden /> \
						</label> \
						<button name="create" class="btn btn-primary">Create</button> \
					</div> \
				</div>\
			</div>\
		</div>\
	</div>\
</div>'

var policyButton = '<td width="100"><button data-endpoint="beta.scalewaydata.com" data-bucket="BUCKET_NAME" class="policyBucketButton btn btn-default">Manage Policies</butto></td>'
var globalPolicyButton = '<button  class="policyBucketButton btn btn-default">Add Policy</butto>'

var policyHead = '<th></th>'

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
              </form>\
          </div>\
      </div>'
    +
    '</div>\
	  <div class="modal-footer">\
		  <div clas="col-md-12"> \
		  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
		  <button type="submit" class="btn btn-primary">Create</button>\
      </div>\
    </div>\
  </div>\
</div>';

var lambdaBodyStart = '\
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
      <button id="create-lambda" class="btn btn-primary btn-xl pull-right ng-binding" data-toggle="modal" data-target="#lambdaModal"> Create lambda</button>\
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


function lambdaInjector() {
	$(".nav.nav-main").append(sidebarLambdaComponent)
	$("body").append(lambdaModal);

	$("#lambda").off("click.lambda").on("click.lambda", function (e) {
		$("#lambda_sideMenu").toggleClass("active", true)
        $(".nav.nav-main li.active").first().toggleClass("active", false)
        e.preventDefault();
        e.stopPropagation();
        window.history.pushState("", "", '/#/lambda');
		$("div[ui-view='']").html(genLambdaBody(["name 1", "name 2", "name 3"]));
		lambdaFormHandler()
    })
}



function lambdaFormHandler() {

}

var policiesInjector = function() {
    $("body").append(policyModal);
    window.addEventListener('hashchange', function() {
        var currentState = $("html").injector().get("$state").current;
        $("#lambda_sideMenu").toggleClass("active", false)
        if (currentState.name == "files.list") {
            injectPolicy();
        }
    });
}

var injectPolicy = function(){
    $("thead.ng-scope tr").each(function(elem){
        $(this).append(policyHead);
    });

    var int = setInterval(function () {
        if ($(".loading.ng-hide").length === 0) {
			return ;
		}

		clearInterval(int)

		$(".button-bar div:nth-child(2) > button:nth-child(1)").remove()
        $(".button-bar div:nth-child(2) button:last-of-type").before(globalPolicyButton);

        $("tbody.ng-scope tr").each(function(){
			var bucket_name = $(this).find("td:first-of-type a").text()
			$(this).find("td:last-of-type").before(policyButton.replace("BUCKET_NAME", bucket_name))
			policyFormHandler()
		});
		
        $(".policyBucketButton").click(function () {
            var endpoint_name = $(this).data("endpoint")
			var bucket_name = $(this).data("bucket");
			$("#policyForm input").each(function () {
				$(this).prop("checked", false)
				$(this).val("")

                if ($(this).attr("name") === "in_endpoint") {
                    $(this).val(endpoint_name)
				}

                if ($(this).attr("name") === "in_bucket") {
                    $(this).val(bucket_name)
				}
			})
			$("#policyModal").modal('show');
		})
    }, 5e2)
}

var policyFormHandler = function () {
	$("#policyModal input[name=import_config]").off("change.formpI").on("change.formpI", function() {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
		reader.readAsText(this.files[0]);
        function onReaderLoad(event) {
            var obj = JSON.parse(event.target.result);
            Object.keys(obj).forEach(function (key) {
                console.log(typeof obj[key] === 'boolean')
				if (typeof obj[key] === 'boolean') {
					$("#policyForm input[name=" + key + "]").prop("checked", obj[key]);
                    console.log($("#policyForm input[name=" + key + "]"))
				} else {
                    if ($("#policyForm input[name=" + key + "]").length > 0) {
                        $("#policyForm input[name=" + key + "]").val(obj[key]).prop("checked", obj[key]);
                    } else {
                        $("#policyForm select[name=" + key + "]").val(obj[key]);
					}
				}
			})
        }
	})

    $("#policyModal button[name=create]").off("click.create").on("click.create", function () {
		var form = queryStringToJSON($("#policyForm").serialize())
		delete form.parallelization
    	form.parallelisation = $("#parallelization").is(':checked')

		console.log(JSON.stringify(form))

		$.ajax ({
			type: "POST",
			url: 'https://localhost/system/policy',
			contentType: 'application/json',
			data: JSON.stringify(form),
			always: function() {
				$("#policyModal").modal('hide');
				toastr.success("Policy applied")
			}
		})
	})
}

var queryStringToJSON = function (queryString) {
    if (queryString.indexOf('?') > -1) {
        queryString = queryString.split('?')[1];
    }
    var pairs = queryString.split('&');
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return result;
}

var getTxt = function(uri) {
    $.ajax({
        url: uri,
        success: function(data) {
            fileContent = data;
            return data
        }
    });
}

var toastrInjector = function() {
    $.getScript("//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js", function () {
		toastr.options.allowHtml = true,
		toastr.options.autoDismiss = true,
		toastr.options.closeButton = true,
		toastr.options.closeHtml = "<button>&times;</button>",
		toastr.options.containerId = "toast-container",
		toastr.options.extendedTimeOut = 1e3,
		toastr.options.closeMethod = 'fadeOut';
		toastr.options.hideDuration = 1e3;
        toastr.options.hideMethod = 'fadeOut';
		toastr.options.closeDuration = 1e3;
		toastr.options.iconClasses = {
			error: "toast-error",
			info: "toast-info",
			success: "toast-success",
			warning: "toast-warning"
		};
			
		toastr.options.maxOpened = 0;
		toastr.options.messageClass = "toast-message";
		toastr.options.newestOnTop = !0;
		toastr.options.onHidden = null;
		toastr.options.onShown = null;
		toastr.options.positionClass = "toast-top-right";
		toastr.options.preventDuplicates = !1;
		toastr.options.preventOpenDuplicates = !1;
		toastr.options.progressBar = true;
		toastr.options.tapToDismiss = true;
		toastr.options.target = "body";
		toastr.options.timeOut = 5e3;
		toastr.options.titleClass = "toast-title";
		toastr.options.toastClass = "toast";


		toastr.success("Injection completed 😎")
	})
}


function init() {
    loadFont()
    lambdaInjector()
	policiesInjector()
	toastrInjector()
    $(".zone-menu > li > a").html('<div class="intl-tel-input"><img class="iti-flag hk"></div> hkg1')
    $("li[ui-sref='service.list']").html("<b>Hackaton Developer Account</b>")
    console.log("Hook complete")
}


init()
