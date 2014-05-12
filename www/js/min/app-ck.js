angular.module("project",[]).controller("AppController",function(e){$.fn.serializeObject=function(){var e={},o=this.serializeArray();return $.each(o,function(){e[this.name]?(e[this.name].push||(e[this.name]=[e[this.name]]),e[this.name].push(this.value||"")):e[this.name]=this.value||""}),e},e.salvarClick=function(){var o=JSON.stringify($("form").serializeObject());e.insertItemDB(o)},e.resetForm=function(){e.pre_form_1="0",e.pre_form_2="0",e.pre_form_3="0",e.pre_form_4="0",$('[ng-model="pre_form_4"]').css("background","initial"),$('[ng-model="pre_form_4"]').css("color","initial"),e.has_children="0",e.numero="",e.$$phase||e.$apply(),e.changeNumber()},e.saveFile=function(e,o,r){function n(o){o.root.getFile(e,{create:!0},a,i)}function a(e){e.createWriter(t,i)}function t(e){e.onwriteend=function(o){alert("Arquivo Salvo com Sucesso!"),void 0!==r&&r(e)},e.write(o)}function i(e){console.log("Error: ",e.code)}var c="export-file.txt";(void 0===e||null===e)&&(e=c),window.requestFileSystem(LocalFileSystem.PERSISTENT,0,n,i)},e.convertToCSV=function(e){var o="object"!=typeof e?JSON.parse(e):e,r="sep=,\r\n",n="",a=o[0];for(var t in o[0]){var i=t+"";n+='"'+i.replace(/"/g,'""')+'",'}n=n.slice(0,-1),r+=n+"\r\n";for(var c=0;c<o.length;c++){var n="";for(var t in o[c]){var i=o[c][t]+"";n+='"'+i.replace(/"/g,'""')+'",'}n=n.slice(0,-1),r+=n+"\r\n"}return r},e.insertItemDB=function(o){function r(e){e.executeSql("CREATE TABLE IF NOT EXISTS DADOS (id, data)"),e.executeSql("INSERT INTO DADOS (id, data) VALUES (1,'"+o+"')")}function n(e){console.log(e)}function a(){alert("Gravado no Banco!"),$("form")[0].reset(),e.resetForm(),$("html, body").scrollTop(0),$(".linha-marcada").removeClass("linha-marcada")}var t=window.openDatabase("questionario","1.0","Questionario DB",1e6);t.transaction(r,n,a)},e.getItensFromDB=function(){function o(e){e.executeSql("SELECT * FROM DADOS",[],n,r)}function r(e){console.log(e)}function n(o,r){e.dataExport=[];var n=r.rows.length;console.log("DADOS table: "+n+" rows found.");for(var a=0;n>a;a++)e.dataExport.push(JSON.parse(r.rows.item(a).data));var t=e.convertToCSV(e.dataExport);e.saveFile("export.csv",t),alert("Arquivo Exportado")}var a=window.openDatabase("questionario","1.0","Questionario DB",1e6);a.transaction(o,r)},e.clearDB=function(){function e(e){e.executeSql("DROP TABLE IF EXISTS DADOS"),e.executeSql("CREATE TABLE IF NOT EXISTS DADOS (id, data)")}function o(e){console.log(e)}function r(){alert("Dados Excluidos!")}var n=window.openDatabase("questionario","1.0","Questionario DB",1e6);confirm("Tem certeza que deseja apagar todos os dados?")&&n.transaction(e,o,r)},e.changeNumber=function(){e.pre_num=e.pre_form_1+e.pre_form_2+e.pre_form_3+e.pre_form_4+e.has_children,e.numero_full=e.pre_num+e.numero,$("#numero").val("["+e.numero_full+"]"),e.$$phase||e.$apply()},e.resetForm()});