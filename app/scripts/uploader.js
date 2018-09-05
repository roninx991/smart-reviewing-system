// Import jquery
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

// Import Sweetalert
import swal from 'sweetalert';

// Import bootstrap
import 'bootstrap';

// Import the page's CSS. Webpack will know what to do with it.
import "../styles/uploader.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import simplestorage_artifacts from '../../build/contracts/SimpleStorage.json'
var User = contract(simplestorage_artifacts);
var ipfsHash;
var arrayBuffer, buffer;
var load = 0;
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('localhost','5001',{protocol: 'http'});


window.App = {

	onSubmit: function(event) {
		event.preventDefault();
		
		User.deployed().then(function(contractInstance) {
			ipfs.files.add(buffer,function (error, result) {
				if(error){
					console.log(error);
				}
				ipfsHash = result[0].hash;
				console.log('ipfsHash', ipfsHash);
			});
		
			console.log('Web-account address: ',web3.eth.accounts[0]);
			
			//Setting timeout of 3 secs to get ipfshash value
			setTimeout(function(){			
				contractInstance.insertDoc(web3.eth.accounts[0],ipfsHash, {gas: 200000, from: web3.eth.accounts[0]}).then(function() {
					swal("Success", "Document uploaded successfully", "success");
		      	}).catch(function(e) {
			        // There was an error! Handle it.
			        console.log('Error uploading document:', eth, ':', e);
			        swal("Something went wrong!", "Error in uploading document. Note: Duplicate documents not allowed to be uploaded", "error");

		    	});		
			}, 500);	
	    });
	},
	
	captureFile: function(event){
			console.log('capture file...');
			event.preventDefault();
			const file = event.target.files[0];
		    document.getElementById("file-selected").innerHTML = "File selected: " + file.name;
			const reader = new FileReader();
			reader.readAsArrayBuffer(file);		
			reader.onloadend = () => {
			buffer = new Buffer(reader.result);
			console.log('buffer', buffer);
		}
	},
	
	start: function() {
		// event.preventDefault();
		var self = this;
		var c;
		document.getElementById("file-selected").innerHTML = "No files selected";
		// set the provider for the User abstraction
		if(load > 0)
		{
			User.setProvider(web3.currentProvider);
			User.deployed().then(function(contractInstance) {
				contractInstance.displayDocCount().then(function(count) {
					c = parseInt(count);
					document.getElementById("uploads").style.display = "none";
					document.getElementById("no-uploads").style.display = "block";
					document.getElementById("no-uploads").innerHTML = "No files uploaded";								
					if (c > 0) {
						document.getElementById("uploads").style.display="block";
						for (var i = 0; i < c; i++) {
							contractInstance.displayHash(i).then(function(h) {
								var hash = h;
								contractInstance.isOwner(web3.eth.accounts[0], hash).then(function(ans) {
									if(ans) {
										contractInstance.displayDocStatus(hash).then(function(stat) {
											var s;
											if(stat == 0)
												s = "Accepted";
											else if(stat == 1)
												s = "Pending...";
											else
												s = "Rejected";
											document.getElementById("uploads").style.display = "block";
											document.getElementById("no-uploads").style.display = "none";
											document.getElementById("uploads").innerHTML += "<div class='files'><span class='hash'>" + hash + "</span><span class='file-status'>Status: " + s + "</span></div>";
										});
									}
								});
							});
						}
					}
				}).catch(function(e) {
					console.log("Error: ", e);
				});
			});
		}
		else
		{
			load++;
		}
	},

	displayHash: function(num) {
		var self = this;
		User.deployed().then(function(contractInstance) {
			num = parseInt(num);
			contractInstance.displayHash(num).then(function(hash) {
				return hash;
			}).catch(function(e) {
				console.log("Error: ", e);
			});
		});
	},

	displayDocStatus: function(str) {
		User.deployed().then(function(contractInstance) {
			contractInstance.displayDocStatus(str).then(function(stat) {
				stat = parseInt(stat);
				return stat;
				// console.log("Status: ", stat);
			}).catch(function(e) {
				console.log("Error: ", e);
			});
		});		
	},

	isOwner: function(str) {
		User.deployed().then(function(contractInstance) {
			contractInstance.isOwner(web3.eth.accounts[0], str).then(function(ans) {
				// console.log("Is owner? : ", ans);
				return ans;
			}).catch(function(e) {
				console.log("Error: ", e);
			});
		});		
	},

	getDocCount: function() {
		User.deployed().then(function(contractInstance) {
			contractInstance.displayDocCount().then(function(count) {
				count = parseInt(count);
				// console.log("Count: ", count);
				return count;
			}).catch(function(e) {
				console.log("Error: ", e);
			});
		});
	}

};

// ===============================Window Loading =============================

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source.");
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
	App.start();

  } else {
    console.warn("No web3 detected. Please use MetaMask or Mist browser.");
  }

  
});
