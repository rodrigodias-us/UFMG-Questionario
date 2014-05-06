angular.module('project', [])

.controller('AppController', function($scope){
	
	$scope.pre_form_1 = '0';
	$scope.pre_form_2 = '0';
	$scope.pre_form_3 = '0';
	$scope.pre_form_4 = '0';
	$scope.has_children = '0';
	$scope.numero = '';
	

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
	
	$scope.salvarClick = function(){
		var jsonData = JSON.stringify($('form').serializeObject());
		$scope.insertItemDB(jsonData);
	};
	
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
				alert('Arquivo Salvo com Sucesso!');
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

		var str = 'sep=,\r\n';
		var line = '';
		
		var head = array[0];
		for (var index in array[0]) {
			var value = index + "";
			line += '"' + value.replace(/"/g, '""') + '",';
		}

		line = line.slice(0, -1);
		str += line + '\r\n';

		for (var i = 0; i < array.length; i++) {
			var line = '';

			for (var index in array[i]) {
				var value = array[i][index] + "";
				line += '"' + value.replace(/"/g, '""') + '",';
			}

			line = line.slice(0, -1);
			str += line + '\r\n';
		}
		return str;
    
	}
	
	$scope.insertItemDB = function (jsonData) {
		var db = window.openDatabase("questionario", "1.0", "Questionario DB", 1000000);
		
		function query(tx){
			// tx.executeSql('DROP TABLE IF EXISTS DADOS'); // COMENTAR PARA NAO APAGAR OS DADOS
			tx.executeSql('CREATE TABLE IF NOT EXISTS DADOS (id, data)');
			tx.executeSql("INSERT INTO DADOS (id, data) VALUES (1,'" + jsonData + "')");
		}
		function error(err) {
			console.log(err);
		}
		function success() {
			alert("Gravado no Banco!");
			$('form')[0].reset();
			$('html, body').scrollTop(0);
            $('.linha-marcada').removeClass("linha-marcada");
		}
		db.transaction(query, error, success);
	}
	$scope.getItensFromDB = function () {
		var db = window.openDatabase("questionario", "1.0", "Questionario DB", 1000000);
		
		function queryDB(tx){
			tx.executeSql('SELECT * FROM DADOS', [], success, error);
		}
		function error(err) {
			console.log(err);
		}
		function success(tx, results) {
			$scope.dataExport = [];
			var len = results.rows.length;
			console.log("DADOS table: " + len + " rows found.");
			for (var i=0; i<len; i++){
				$scope.dataExport.push(JSON.parse(results.rows.item(i).data));
			}
			var csv = $scope.convertToCSV($scope.dataExport);
			$scope.saveFile('export.csv', csv);
			alert("Arquivo Exportado");
		}
		db.transaction(queryDB, error);
	}
	$scope.clearDB = function () {
		var db = window.openDatabase("questionario", "1.0", "Questionario DB", 1000000);
		
		function query(tx){
			tx.executeSql('DROP TABLE IF EXISTS DADOS'); // COMENTAR PARA NAO APAGAR OS DADOS
			tx.executeSql('CREATE TABLE IF NOT EXISTS DADOS (id, data)');
		}
		function error(err) {
			console.log(err);
		}
		function success() {
			alert("Dados Excluidos!");
		}
		if(confirm("Tem certeza que deseja apagar todos os dados?")){
			db.transaction(query, error, success);
		}
	}
	
	$scope.changeNumber = function(){
		$scope.pre_num = $scope.pre_form_1 + $scope.pre_form_2 + $scope.pre_form_3 + $scope.pre_form_4 + $scope.has_children;
		$scope.numero_full = $scope.pre_num + $scope.numero;
		$("#numero").val('[' + $scope.numero_full + ']');
	}
	$scope.changeNumber();
});
