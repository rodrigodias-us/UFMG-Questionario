angular.module('project', [])

.controller('AppController', function($scope){

	$.fn.serializeObject = function()
	{
	   var o = {};
	   var a = this.serializeArray();
	   $.each(a, function() {
	       if (o[this.name]) {
	           if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else {
	           o[this.name] = this.value || '';
	       }
	   });
	   return o;
	};
	
	$scope.db = window.openDatabase("questionario", "1.0", "Questionario DB", 1000000);
	
	$scope.salvarClick = function(){
		
		var dataArray = $('form').serializeArray();
		
		var jsonData = JSON.stringify($('form').serializeObject());
				
		$scope.insertItemDB(jsonData);
		// $scope.saveDataLocal(dataArray);
		// var data = $scope.convertToCSV(dataArray);
	};
	
	$scope.saveDataLocal = function(data){
		var dataLocal = localStorage.getItem('dados');
		
		if(typeof(dataLocal) == "undefined"){
			dataLocal = [];
		}
		console.log(dataLocal);
		
		dataLocal.push('teste');
		
		localStorage.setItem('dados', dataLocal);
		
		return true;
	}
	$scope.saveFile = function(filename, data, callback) {
		var defaultFileName =  'export-file.txt';
 
		if (filename === undefined || filename === null) {
			filename = defaultFileName;
		}
 
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
 
		function gotFS(fileSystem) {
			fileSystem.root.getFile(filename, {create: true}, gotFileEntry, fail);
		}
		function gotFileEntry(fileEntry) {
			fileEntry.createWriter(gotFileWriter, fail);
		}
		function gotFileWriter(writer) {
			writer.onwriteend = function(evt) {
				console.log('finished writing');
				if (callback !== undefined) {
					callback(writer);
				}
			};
			writer.write(data);
		}
 
		function fail(error) {
			console.log('Error: ', error.code);
		}
	}
	$scope.convertToCSV = function (objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';

		for (var i = 0; i < array.length; i++) {
			var line = '';
			for (var index in array[i]) {
				if (line != '') line += ','

				line += array[i][index];
			}

			str += line + '\r\n';
		}

		return str;
	}
	
	$scope.insertItemDB = function (jsonData) {
		function query(tx){
			tx.executeSql('DROP TABLE IF EXISTS DADOS'); // COMENTAR PARA NAO APAGAR OS DADOS
			tx.executeSql('CREATE TABLE IF NOT EXISTS DADOS (id unique, data)');
			tx.executeSql("INSERT INTO DADOS (id, data) VALUES (1,'" + jsonData + "')");
		}
		function error(err) {
			console.log(err);
		}
		function success() {
			console.log("Gravado no Banco!");
		}
		$scope.db.transaction(query, error, success);
	}
	$scope.getItensFromDB = function () {
		function queryDB(tx){
			tx.executeSql('SELECT * FROM DADOS', [], success, error);
		}
		function error(err) {
			alert("Error processing SQL: "+err);
		}
		function success(tx, results) {
			var len = results.rows.length;
			console.log("DADOS table: " + len + " rows found.");
			for (var i=0; i<len; i++){
				console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
			}
		}
		$scope.db.transaction(queryDB, error);
	}
});
