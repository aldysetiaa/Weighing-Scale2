
     (adsbygoogle = window.adsbygoogle || []).push({});
     
var API = 'http://sys-krng.konveksi-serang.com/API/api/';
// var API = 'http://localhost/erp_krng/api/';
 $(document).ready(function() {  
 		$('#data').show();   
 		 $('#login').hide();

      	$("head").append("<style type='text/css'>body { background: #3f51b5; }</style>");
      	$("head").append("<style type='text/css'>body { background: #fff; }</style>");
      	
 		$('#sign').on('click', function() {  
 			 var user = $('#user').val();
 			 var pass = $('#password').val();
 			 if (user == 'ccrm' && pass == '12345') {
 					$('#login').hide();
 					$('#data').show();
      				$("head").append("<style type='text/css'>body { background: #fff; }</style>");

 			 }else{
 			 	$('#gagal').html('Gagal Login!');
 			 }
		 });



	});

// PILIH BARU / LAMA
 $(document).ready(function() {  
 		$('#lama').hide();
       	$('#pilih').on('change', function() {  
 			 var pil = $('#pilih').val(); 
 			 if (pil == 0) {
 			 	$('#baru').show(); 
 			 	$('#lama').hide(); 
 			 }else if(pil == 1){
 			 	$('#baru').hide(); 
 			 	$('#lama').show(); 
 			 
 			 }
		 });
       	   	$('#timbangtimbang').on('click', function() {  
 			 console.log('aldy');
 			 //list data otomatis
  	           $.ajax({ 
			        url: API+'timbangan/timbang', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $('#tampil').empty();
				        tr = $('<tr/>');
		                    tr.append("<th>No</th>");
		                    tr.append("<th>Kode Timbang</th>");
		                    tr.append("<th>Nomor Polisi</th>");
		                    tr.append("<th>Sopir</th>");
		                    tr.append("<th>Tgl & Jam</th>");
		                    tr.append("<th>Berat Kosong</th>");
		                    $('#tampil').append(tr);
		                    
				        console.log(response.length); 
				       var no =1;
				      for (var i = 0; i < response.length; i++) {
		                    tr = $('<tr/>');
		                    tr.append("<td>" + no + "</td>");
		                    tr.append("<td  style='background-color: green; color: white; font-weight: bold; text-align:center;'>" + response[i]['no_record'] + "</td>"); 
		                    tr.append("<td>" + response[i]['nomor_polisi'] + "</td>");
		                    tr.append("<td>" + response[i]['nama_dtl'] + "</td>");
		                    tr.append("<td>" + response[i]['tgl_masuk'] + "</td>");
		                    tr.append("<td>" + response[i]['tara'] + "</td>");
		                    $('#tampil').append(tr);
		                    no++;
		              }
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 
		 });

	}); 
 // ======================================= TABEL DATA KOSONG ====================//
 

// ==================== KODE LAMA / TIMBANG ISI ============ //
 $(document).ready(function() {  
	var input = document.getElementById("kodeLama");
	input.addEventListener("keyup", function(event) {
      var kodeLama = document.getElementById('kodeLama').value; 
	  if (event.keyCode === 13) { 
	   		event.preventDefault();
	           $.ajax({ 
			        url:  API+'/timbangan/lama/record/',
			        data : 'record='+kodeLama,
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $("#idLama").val(response.id); 
				        $("#kode_tankLama").val(response.kode_tank); 
				        $("#no_polisiLama").val(response.nomor_polisi); 
				        $("#sttsLama").val(response.status_tank); 
				        $("#sopirLama").val(response.sopir); 
				        $("#tglmasukLama").val(response.tgl_masuk); 
				        $("#tbkosongLama").val(response.tara); 
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
				        $("#kodeLama").val('ID Tidak diketahui!'); 
			        }
			    }); 
	       }
	   });

	       	$('#tbiLama').on('click',function(){
       		 var hsl = $('#hasilkgLama').val(); 
 			 if (hsl > 20) {
 					$('#bruttoLama').val(hsl); 
 					if ($('#bruttoLama').val() > 1) {
 						// $('#tbiLama').hide(); 
 						var bt = $('#bruttoLama').val();
 						var bk = $('#tbkosongLama').val();
 						$('#nettoLama').val(bt-bk);
 					}


 			 } 
       	})

    $('#save_hasilLama').on('click', function() {     
    	 
    	var kode = $('#kodeLama').val();
    	var bruto = $('#bruttoLama').val();
    	var netto = $('#nettoLama').val();
    	var id = $('#idLama').val();
 		
                $.ajax({ 
			        url:  API+'/timbangan/netto',
			        type: 'POST',
			        data : {id:id,bruto:bruto,netto:netto,kode:kode}, 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){  
			        $('#infoLama').html(response.kode+' '+response.message); 
			                   $.ajax({ 
			        url: API+'timbangan/timbang', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        console.log(response.length); 
				        $('#tampil').empty(); 
				        document.getElementById("dataFormLama").reset();
				         tr = $('<tr/>');
		                    tr.append("<th>No</th>");
		                    tr.append("<th>Kode Timbang</th>");
		                    tr.append("<th>Nomor Polisi</th>");
		                    tr.append("<th>Sopir</th>");
		                    tr.append("<th>Tgl & Jam</th>");
		                    tr.append("<th>Berat Kosong</th>");
		                    $('#tampil').append(tr);

		                    
				       var no =1;
				      for (var i = 0; i < response.length; i++) {
		                    tr = $('<tr/>');
		                    tr.append("<td>" + no + "</td>");
		                    tr.append("<td  style='background-color: green; color: white; font-weight: bold; text-align:center;'>" + response[i]['no_record'] + "</td>"); 
		                    tr.append("<td>" + response[i]['nomor_polisi'] + "</td>");
		                    tr.append("<td>" + response[i]['nama_dtl'] + "</td>");
		                    tr.append("<td>" + response[i]['tgl_masuk'] + "</td>");
		                    tr.append("<td>" + response[i]['tara'] + "</td>");
		                    $('#tampil').append(tr);
		                    no++;
		              }
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 
 			        },
			    error: function(){
			       console.log('error');
			    }
			    });  
    });    

});
	     
  // ====================+++++++++++++++++++++++++++++++++++=======================
// TOMBOL TIMBANG HILANG dan MUNCUL
 $(document).ready(function() {   
 
//no record otomatis
  	           $.ajax({ 
			        url: API+'timbangan/record', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $("#kode").val(response.id_timbang); 
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 

//++++++++++++++++++++++++++++++++ RESET data ++++++++++++++++++++++++++++++++++++++//
    
       	$('#reset_data').on('click', function() {
     
     		console.log('klikk reset');   
       		document.getElementById("dataForm").reset();
       		//no record otomatis
  	           $.ajax({ 
			        url: API+'timbangan/record', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $("#kode").val(response.id_timbang); 
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 
		 }); 

       	     	$('#reset_dataLama').on('click', function() {
     
     				console.log('klikk reset');   
     				 //list data otomatis
  	           $.ajax({ 
			        url: API+'timbangan/timbang', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        console.log(response.length); 
				        $('#tampil').empty();
				        tr = $('<tr/>');
		                    tr.append("<th>No</th>");
		                    tr.append("<th>Kode Timbang</th>");
		                    tr.append("<th>Nomor Polisi</th>");
		                    tr.append("<th>Sopir</th>");
		                    tr.append("<th>Tgl & Jam</th>");
		                    tr.append("<th>Berat Kosong</th>");
		                    $('#tampil').append(tr);
		                    
				       var no =1;
				      for (var i = 0; i < response.length; i++) {
		                    tr = $('<tr/>');
		                    tr.append("<td>" + no + "</td>");
		                    tr.append("<td  style='background-color: green; color: white; font-weight: bold; text-align:center;'>" + response[i]['no_record'] + "</td>"); 
		                    tr.append("<td>" + response[i]['nomor_polisi'] + "</td>");
		                    tr.append("<td>" + response[i]['nama_dtl'] + "</td>");
		                    tr.append("<td>" + response[i]['tgl_masuk'] + "</td>");
		                    tr.append("<td>" + response[i]['tara'] + "</td>");
		                    $('#tampil').append(tr);
		                    no++;
		              }
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 
       				document.getElementById("dataFormLama").reset();
       	 
		 }); 
//++++++++++++++++++++++++++++++++ RESET DATA ++++++++++++++++++++++++++++++++++++++//




 		if ($('#tglmasuk').val() === '') {
 			$('#tbk').hide();
 			$('#tbi').hide();
 		}

       	$('#tbk').on('click', function() {  
 			 var hsl = $('#hasilkg').val();  
 			 if (hsl > 20) {
 					$('#tbkosong').val(hsl); 
 					if ($('#tbkosong').val() > 1) {
 						$('#tbi').show();
 						$('#tbk').hide();
 					}

 			 } 
		 });
       	// TB ISI
       	$('#tbi').on('click',function(){
       		 var hsl = $('#hasilkg').val(); 
 			 if (hsl > 20) {
 					$('#brutto').val(hsl); 
 					if ($('#brutto').val() > 1) {
 						$('#tbi').hide(); 
 						var bt = $('#brutto').val();
 						var bk = $('#tbkosong').val();
 						$('#netto').val(bt-bk);
 					}


 			 } 
       	})

	});
 
// ON ENTER / SCAN
 $(document).ready(function() {  
	var input = document.getElementById("aa");
	input.addEventListener("keyup", function(event) {
      var aa = document.getElementById('aa').value; 
	  if (event.keyCode === 13) {
	   event.preventDefault();
	           $.ajax({ 
			        url: API+'data/users',
			        data : 'id='+aa,
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $("#aa").val(response.name); 
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error);
				        $("#aa").val('Driver Tidak diketahui!'); 
			        }
			    }); 

  	}
	});
});
// 
// ON ENTER / SCAN NOMOR KARTU DRIVER
 $(document).ready(function() {  
	var input = document.getElementById("sopir");
	input.addEventListener("keyup", function(event) {
      var sopir = document.getElementById('sopir').value; 
	  if (event.keyCode === 13) {
	  	if ($('#stts').val() == 'Ready') {
	   event.preventDefault();
	           $.ajax({ 
			        url:  API+'/timbangan/driver/',
			        data : 'nomor='+sopir,
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $("#id_sopir").val(response.id_sopir); 
				        $("#sopir").val(response.sopir); 
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error);
				        $("#id_sopir").val('00'); 
				        $("#sopir").val('Driver Tidak diketahui!'); 
			        }
			    }); 
	            // TGL MASUK
 		var d = new Date();
 		months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
 		var tgl,hrs,mnt,dtk;
 		var dt = d.getDate().toString(); 
 		       if (dt.length == 1) {
                        tgl = '0'+d.getDate(); 
                      }else{
                        tgl =  d.getDate();
                      }
         var jm = d.getHours().toString(); 
 		       if (jm.length == 1) {
                       hrs = '0'+d.getHours(); 
                      }else{
                        hrs =  d.getHours();
                      }
          var hh = d.getMinutes().toString(); 
 		       if (hh.length == 1) {
                       mnt = '0'+d.getMinutes(); 
                      }else{
                        mnt =  d.getMinutes();
                      }
          var dtt = d.getSeconds().toString(); 
 		       if (dtt.length == 1) {
                       dtk = '0'+d.getSeconds(); 
                      }else{
                        dtk =  d.getSeconds();
                      }
		$("#tglmasuk").val(d.getFullYear()+'-'+months[d.getMonth()]+'-'+tgl+' '+hrs+':'+mnt+':'+dtk);
  		$('#tbk').show();
  	}else{
  		$('#stcar').html('Kartu Mobil belum di Scan /Not Ready');

  	}
  	}
	});
});
// 
// ON ENTER / SCAN NOMOR KARTU CAR
 $(document).ready(function() {  
	var input = document.getElementById("kode_tank");
	input.addEventListener("keyup", function(event) {
      var car = document.getElementById('kode_tank').value; 
	  if (event.keyCode === 13) {
	   event.preventDefault();
	           $.ajax({ 
			        url:  API+'/timbangan/car/',
			        data : 'nomor='+car,
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $("#id_car").val(response.id_car); 
				        $("#kode_tank").val(response.kode_tank); 
				        $("#no_polisi").val(response.nomor_polisi); 
				        $("#stts").val(response.status_tank);
				        if (response.status_tank != 'Ready') {
				        	$("#stcar").html("Status Mobil Tidak Ready!");
				        }else{
				        	$("#stcar").html("");
				        } 

			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error);
				        $("#id_car").val('00'); 
				        $("#kode_tank").val('Mobil Tidak diketahui!'); 
				         $("#no_polisi").val(""); 
				        $("#stts").val(""); 
				        	$("#stcar").html(""); 
			        }
			    }); 
  	}
	});
});
// 
 
 $(document).ready(function() {  
    $('#save_hasil').on('click', function() {     
    	var kode =  $('#kode').val();
    	var car = $('#id_car').val();
    	var driver = $('#id_sopir').val();
    	var dateIn = $('#tglmasuk').val();
    	var tara = $('#tbkosong').val();
    	var bruto = $('#brutto').val();
    	var netto = $('#netto').val();
 		
                $.ajax({ 
			        url:  API+'/timbangan/hasil',
			        type: 'POST',
			        data : {kode:kode,id_mobil:car,id_driver:driver,tgl_masuk:dateIn,tara:tara,bruto:bruto,netto:netto}, 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){  
			        $('#info').html(response.kode+' '+response.message); 
 			        },
			    error: function(){
			       console.log('error');
			    }
			    });  
    });   
});
 /*



KPCC PROGRAM WEIGHING
By. ALdy Setiawan


 */
    $.ajax({ 
			        url: API+'kpcc/record', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $("#kodekpcc").val(response.no_record); 
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 

//++++++++++++++++++++++++++++++++ RESET DATA ++++++++++++++++++++++++++++++++++++++//
    
       
 $(document).ready(function() {  
 		$('#reset_datakpcc').on('click', function() {
     
     		console.log('klikk reset');   
       		document.getElementById("dataFormkpcc").reset();
       		//no record otomatis
  	           $.ajax({ 
			        url: API+'kpcc/record', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $("#kodekpcc").val(response.no_record); 
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 
		 }); 

// INSERT HASIL
    $('#save_hasilkpcc').on('click', function() {     
    	var car = $('#no_polisikpcc').val();
    	var vendor = $('#vendor').val();
    	var driver = $('#sopirkpcc').val(); 
    	var kgkpcc = $('#tbkosongkpcc').val(); 
 		
                $.ajax({ 
			        url:  API+'/kpcc/hasil',
			        type: 'POST',
			        data : {vendor:vendor, nopol:car, driver:driver, tara:kgkpcc}, 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){  
			        $('#infokpcc').html(response.kode+' '+response.message); 
 			        },
			    error: function(){
			       console.log('error');
			    }
			    });  
    });   
});

// LOAD DATA TIMBANG ISI

 $(document).ready(function() {  
  	$('#tikapcc').on('click', function() {  
 			 console.log('aldy');
 			 //list data otomatis
  	           $.ajax({ 
			        url: API+'kpcc/timbang', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $('#tampilkpcc').empty();
				        tr = $('<tr/>');
		                    tr.append("<th>No</th>");
		                    tr.append("<th>Vendor</th>");
		                    tr.append("<th>Kode Timbang</th>");
		                    tr.append("<th>Nomor Polisi</th>");
		                    tr.append("<th>Sopir</th>");
		                    tr.append("<th>Tgl & Jam</th>");
		                    tr.append("<th>Berat Kosong</th>");
		                    $('#tampilkpcc').append(tr);
		                    
				        console.log(response.length); 
				       var no =1;
				      for (var i = 0; i < response.length; i++) {
		                    tr = $('<tr/>');
		                    tr.append("<td><a target='_BLANK' href='http://sys-krng.xyz/aa/a/" + no + "'>" + no + "</a></td>");
		                    tr.append("<td>" + response[i]['nama_vendor'] + "</td>");
		                    tr.append("<td  style='background-color: green; color: white; font-weight: bold; text-align:center;'>" + response[i]['no_record'] + "</td>"); 
		                    tr.append("<td>" + response[i]['nomor_polisi'] + "</td>");
		                    tr.append("<td>" + response[i]['nama_sopir'] + "</td>");
		                    tr.append("<td>" + response[i]['tgl_masuk'] + "</td>");
		                    tr.append("<td>" + response[i]['tara'] + "</td>");
		                    $('#tampilkpcc').append(tr);
		                    no++;
		              }
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 
		 });
  });

 // ==================== KODE LAMA /`` TIMBANG ISI KPCC============ //
 $(document).ready(function() {  
	var input = document.getElementById("kodeLamakpcc");
	input.addEventListener("keyup", function(event) {
      var kodeLama = document.getElementById('kodeLamakpcc').value; 
	  if (event.keyCode === 13) { 
	   		event.preventDefault();
	           $.ajax({ 
			        url:  API+'/kpcc/lama/record/',
			        data : 'record='+kodeLama,
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	    
				        $("#no_polisiLamakpcc").val(response.nomor_polisi);  
				        $("#sopirLamakpcc").val(response.sopir); 
				        $("#tglmasukLamakpcc").val(response.tgl_masuk); 
				        $("#tbkosongLamakpcc").val(response.tara); 
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
				        $("#kodeLamakpcc").val('ID Tidak diketahui!'); 
			        }
			    }); 
	       }
	   });

	$('#reset_dataLamakpcc').on('click', function() {
     
     				console.log('klikk reset');   
     				 //list data otomatis
  	     $.ajax({ 
			        url: API+'kpcc/timbang', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        $('#tampilkpcc').empty();
				        tr = $('<tr/>');
		                    tr.append("<th>No</th>");
		                    tr.append("<th>Vendor</th>");
		                    tr.append("<th>Kode Timbang</th>");
		                    tr.append("<th>Nomor Polisi</th>");
		                    tr.append("<th>Sopir</th>");
		                    tr.append("<th>Tgl & Jam</th>");
		                    tr.append("<th>Berat Kosong</th>");
		                    $('#tampilkpcc').append(tr);
		                    
				        console.log(response.length); 
				       var no =1;
				      for (var i = 0; i < response.length; i++) {
		                    tr = $('<tr/>');
		                    tr.append("<td><a target='_BLANK' href='http://sys-krng.xyz/aa/a/" + no + "'>" + no + "</a></td>");
		                    tr.append("<td>" + response[i]['nama_vendor'] + "</td>");
		                    tr.append("<td  style='background-color: green; color: white; font-weight: bold; text-align:center;'>" + response[i]['no_record'] + "</td>"); 
		                    tr.append("<td>" + response[i]['nomor_polisi'] + "</td>");
		                    tr.append("<td>" + response[i]['nama_sopir'] + "</td>");
		                    tr.append("<td>" + response[i]['tgl_masuk'] + "</td>");
		                    tr.append("<td>" + response[i]['tara'] + "</td>");
		                    $('#tampilkpcc').append(tr);
		                    no++;
		              }
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 
       				document.getElementById("dataFormLamakpcc").reset();
       	 
		 }); 
//++++++++++++++++++++++++++++++++ RESET DATA ++++++++++++++++++++++++++++++++++++++//

    $('#save_hasilLamakpcc').on('click', function() {     
    	 
    	var kode = $('#kodeLamakpcc').val();
    	var bruto = $('#bruttoLamakpcc').val();
    	var netto = $('#nettoLamakpcc').val(); 
 		
                $.ajax({ 
			        url:  API+'/kpcc/netto',
			        type: 'POST',
			        data : {kode:kode,bruto:bruto,netto:netto}, 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){  
			        $('#infoLamakpcc').html(response.kode+' '+response.message); 
			                   $.ajax({ 
			        url: API+'kpcc/timbang', 
			        type: "get", 
			        dataType: "json",
			        timeout: 10000,
			        success: function(response){ 
			        console.log(response);	  
				        console.log(response.length); 
				        $('#tampilkpcc').empty(); 
				        document.getElementById("dataFormLama").reset();
				        tr = $('<tr/>');
		                    tr.append("<th>No</th>");
		                    tr.append("<th>Vendor</th>");
		                    tr.append("<th>Kode Timbang</th>");
		                    tr.append("<th>Nomor Polisi</th>");
		                    tr.append("<th>Sopir</th>");
		                    tr.append("<th>Tgl & Jam</th>");
		                    tr.append("<th>Berat Kosong</th>");
		                    $('#tampilkpcc').append(tr);
		                    
				        console.log(response.length); 
				       var no =1;
				      for (var i = 0; i < response.length; i++) {
		                    tr = $('<tr/>');
		                    tr.append("<td><a target='_BLANK' href='http://sys-krng.xyz/aa/a/" + no + "'>" + no + "</a></td>");
		                    tr.append("<td>" + response[i]['nama_vendor'] + "</td>");
		                    tr.append("<td  style='background-color: green; color: white; font-weight: bold; text-align:center;'>" + response[i]['no_record'] + "</td>"); 
		                    tr.append("<td>" + response[i]['nomor_polisi'] + "</td>");
		                    tr.append("<td>" + response[i]['nama_sopir'] + "</td>");
		                    tr.append("<td>" + response[i]['tgl_masuk'] + "</td>");
		                    tr.append("<td>" + response[i]['tara'] + "</td>");
		                    $('#tampilkpcc').append(tr);
		                    no++;
		              }
			        },
			        error : function(xhr, response, error){
			        	console.log(xhr);
			        	console.log(response);
			        	console.log(error); 
			        }
			    }); 
 			        },
			    error: function(){
			       console.log('error');
			    }
			    });  
    });  
	            	// TB ISI
       	   	$('#tbiLamakpcc').on('click',function(){
       		 var hsl = $('#hasilkgLamakpcc').val(); 
 			 if (hsl > 20) {
 					$('#bruttoLamakpcc').val(hsl); 
 					if ($('#bruttoLamakpcc').val() > 1) {
 						// $('#tbiLama').hide(); 
 						var bt = $('#bruttoLamakpcc').val();
 						var bk = $('#tbkosongLamakpcc').val();
 						$('#nettoLamakpcc').val(bt-bk);
		 					}
		 			 } 
		       	})
       	   	
       	   	$('#tbkkpcc').on('click', function() {  
       	   		console.log('tbkkpcc');
 			 var hsl = $('#hasilkgkpcc').val();  
 			 if (hsl > 20) {
 					$('#tbkosongkpcc').val(hsl); 
 					if ($('#tbkosongkpcc').val() > 1) {
 			 
 						$('#tbkkpcc').hide();
 					}

 			 } 
		 });
  
     
});
	     
  // ====================+++++++++++++++++++++++++++++++++++=======================

/*



 SETTING TIMBANGAN

 */

var connectionOptions = {
	"bitrate": 9600,
	"dataBits": "eight",
	"parityBit": "no",
	"stopBits": "one",
	"receiveTimeout": 500,
	"sendTimeout": 500
};

var connectionId = -1;
var selectedPort = "";
var selectedSpeed = 9600;
var connected = false;

$(function() {
	
	// get the available COM posts and add them to the combo list
	chrome.serial.getDevices(function(ports) {
		
		// sort the ports based on their names (path)
		ports.sort(function(a, b) {
			a = a.path.replace("COM", "");
			b = b.path.replace("COM", "");
			return a-b;
		});
		for (var i = 0; i < ports.length; i++) {
			var portName = ports[i].path;
			var newOption = '<option value="' + portName + '">' + portName + '</option>';
			$("#serial_ports_combobox").append(newOption);
		}
	});
	
	// update the GUI with the starting state (disconnected)
	updateGUI();
	
	// bind a click event on the "connect" button
	$("#connect_button").bind("click", function(event, ui) {
		
		if(!connected) {
			
			// try to connect to the selected port with the selected speed
			selectedPort = $("#serial_ports_combobox").val();
			selectedSpeed = $("#baud_rates_combobox").val();
			connectionOptions.bitrate = parseInt(selectedSpeed);
			chrome.serial.connect(selectedPort, connectionOptions, onConnect);
		}
		else {
			// try to connect to the selected port
			chrome.serial.disconnect(connectionId, onDisconnect);			
		}
	});
	
	// bind a click event on the "send" button
	$("#send_button").bind("click", function(event, ui) {
		
		if(connected) {
			
			var textToSend = $("#send_text").val();
			
			// add the selected end of line
			if($("#endofline_combobox").val() == "NL") textToSend += '\n';
			else if($("#endofline_combobox").val() == "CR") textToSend += '\r';
			else if($("#endofline_combobox").val() == "NLCR") textToSend += '\r\n';
			
			// send data
			chrome.serial.send(connectionId, convertStringToArrayBuffer(textToSend), function(sendInfo) {
				if(sendInfo.error) $.modal('<div id="title">Unable to send data: ' + sendInfo.error + '</div>');
			});
		}
	});	
});

// Update GUI function, enable/disable controls based on the connection status
function updateGUI() {
	
	if(connected) {
		$("#send_text").prop('disabled', false);
		$("#endofline_combobox").prop('disabled', false);
		$("#send_button").prop('disabled', false);
		$("#serial_ports_combobox").prop('disabled', true);
		$("#baud_rates_combobox").prop('disabled', true);
		$("#connect_button").prop('value', 'Disconnect');
	}
	else {
		$("#send_text").prop('disabled', true);
		$("#endofline_combobox").prop('disabled', true);
		$("#send_button").prop('disabled', true);
		$("#serial_ports_combobox").prop('disabled', false);
		$("#baud_rates_combobox").prop('disabled', false);
		$("#connect_button").prop('value', 'Connect');
	}
}

// Callback function for the connect method
function onConnect(connectionInfo) {
	
	// check if the connection was successful
	if(connectionInfo) {
		
		connectionId = connectionInfo.connectionId;
		connected = true;
		updateGUI();
		chrome.serial.onReceive.addListener(onReceive);
		
	// if not, show the error message
	} else {
		if (chrome.runtime.lastError && chrome.runtime.lastError.message) 
			errorMsg = chrome.runtime.lastError.message;
		else 
			errorMsg = "Failed to connect to the port.";
		$.modal('<div id="title">' + errorMsg + '</div>');
	}
}

// Callback function for the disconnect method
function onDisconnect(result) {
	
	if(result) {
		connected = false;
		updateGUI();
	} 
	else $.modal('<div id="title">Unable to disconnect</div>');
}

// Callback function when new data is received
function onReceive(info) {
	
	// check if data is coming from the serial we opened
	if (info.connectionId == connectionId && info.data) {
		
		// convert the ArrayBuffer to string and add to the textarea
		var str = convertArrayBufferToString(info.data);
		var potong =  str;
		$("#receive_textarea").append(potong);  
		var isi = $("#receive_textarea").val();
		var isi2 = isi.split('+');
		var htg = isi2.length-1;
		var hasil = isi2[htg].substring(0,6);
		$("#hasilkg").val(hasil);
		$("#hasilkgLama").val(hasil);

		$("#receive_textarea").scrollTop($("#receive_textarea")[0].scrollHeight);
	}
}

// Convert an array buffer to string
function convertArrayBufferToString(buf) {
	
	var bufView = new Uint8Array(buf);
	var encodedString = String.fromCharCode.apply(null, bufView);
	return decodeURIComponent(encodedString);
}

// convert a string to array buffer
var convertStringToArrayBuffer=function(str) {
	
	var buf = new ArrayBuffer(str.length);
	var bufView = new Uint8Array(buf);
	for (var i = 0; i < str.length; i++) bufView[i] = str.charCodeAt(i);
	return buf;
};