angular.module("project",[]).controller("AppController",function(e){$.fn.serializeObject=function(){var e={},o=this.serializeArray();return $.each(o,function(){e[this.name]?(e[this.name].push||(e[this.name]=[e[this.name]]),e[this.name].push(this.value||"")):e[this.name]=this.value||""}),e},e.salvarClick=function(){var o=JSON.stringify($("form").serializeObject());e.insertItemDB(o)},e.saveFile=function(e,o,t){function n(o){o.root.getFile(e,{create:!0},r,i)}function r(e){e.createWriter(a,i)}function a(e){e.onwriteend=function(o){console.log("finished writing"),void 0!==t&&t(e)},e.write(o)}function i(e){console.log("Error: ",e.code)}var c="export-file.txt";(void 0===e||null===e)&&(e=c),window.requestFileSystem(LocalFileSystem.PERSISTENT,0,n,i)},e.convertToCSV=function(e){var o="object"!=typeof e?JSON.parse(e):e,t="sep=,\r\n",n="",r=o[0];for(var a in o[0]){var i=a+"";n+='"'+i.replace(/"/g,'""')+'",'}n=n.slice(0,-1),t+=n+"\r\n";for(var c=0;c<o.length;c++){var n="";for(var a in o[c]){var i=o[c][a]+"";n+='"'+i.replace(/"/g,'""')+'",'}n=n.slice(0,-1),t+=n+"\r\n"}return t},e.insertItemDB=function(e){function o(o){o.executeSql("CREATE TABLE IF NOT EXISTS DADOS (id, data)"),o.executeSql("INSERT INTO DADOS (id, data) VALUES (1,'"+e+"')")}function t(e){console.log(e)}function n(){console.log("Gravado no Banco!")}var r=window.openDatabase("questionario","1.0","Questionario DB",1e6);r.transaction(o,t,n)},e.getItensFromDB=function(){function o(e){e.executeSql("SELECT * FROM DADOS",[],n,t)}function t(e){console.log(e)}function n(o,t){e.dataExport=[];var n=t.rows.length;console.log("DADOS table: "+n+" rows found.");for(var r=0;n>r;r++)e.dataExport.push(JSON.parse(t.rows.item(r).data));var a=e.convertToCSV(e.dataExport);navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)?e.saveFile("export.csv",a):window.open("data:text/csv;charset=utf-8,"+escape(a)),alert("Arquivo Exportado")}var r=window.openDatabase("questionario","1.0","Questionario DB",1e6);r.transaction(o,t)}});