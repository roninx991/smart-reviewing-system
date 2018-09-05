// Import jquery
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

// Import Sweetalert

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import user_artifacts from '../../build/contracts/User.json'
var User = contract(user_artifacts);

var accounts;
var account;

window.App = {

  // Fetches user with given index from the blockchain
  // see pattern at: https://ethereum.stackexchange.com/questions/26464/how-to-chain-functions-in-truffle-framework
  // current web3 call to getUserByIndex doesn't work well (it doesn't properly return bytes & bytes16 on same return / decoding it fails)
  // so we call for each individual datapoint for now
  getUser: function() {

    var eth = $('#sign-in-eth-address').val();

    console.log('signing in user having wallet address', eth);

    User.deployed().then(function(contractInstance) {

      contractInstance.getUser(eth).then(function(obj) {
        // todo: maybe refresh users here but this could take a while... needs spinner / or message to refresh
        console.log(obj);

      }).catch(function(e) {
        // There was an error! Handle it.
        console.log('error signing user:', eth, ':', e);
        swal("Something went wrong!", "Error in signing in", "error");

      });
    
    }); 


  },  

  // Fetch all users from the blockchain - eventually we'll probably need to paginate this
  // getUsers: function() {
  //   var self = this;

  //   var instanceUsed;

  //   User.deployed().then(function(contractInstance) {

  //     instanceUsed = contractInstance;

  //     return instanceUsed.getUserCount.call();

  //   }).then(function(userCount) {

  //     userCount = userCount.toNumber();

  //     console.log('User count', userCount);

  //     var rowCount = 0;
  //     var usersDiv = $('#users-div');
  //     var currentRow;

  //     for(var i = 0; i < userCount; i++) {

  //       var userCardId = 'user-card-' + i;

  //       if(i % 4 == 0) {
  //         var currentRowId = 'user-row-' + rowCount;
  //         var userRowTemplate = '<div class="row" id="' + currentRowId + '"></div>';
  //         usersDiv.append(userRowTemplate);
  //         currentRow = $('#' + currentRowId);
  //         rowCount++;
  //       }

  //       var userTemplate = `
  //         <div class="col-lg-3 mt-1 mb-1" id="` + userCardId + `">
  //           <div class="card bg-gradient-primary text-white card-profile p-1">
  //             <div class="card-body">
  //               <h5 class="card-title"></h5>
  //               <h6 class="card-subtitle mb-2"></h6>
  //               <p class="card-text"></p>        
  //               <p class="eth-address m-0 p-0">
  //                 <span class="card-eth-address"></span>
  //               </p>
  //             </div>
  //           </div>
  //         </div>`;

  //       currentRow.append(userTemplate);

  //     }

  //     console.log("getting users...");
  //     for(var i = 0; i < userCount; i++) {
  //       self.getAUser(instanceUsed, i);
  //     }

  //   });

  // },

  start: function() {
    var self = this;

    // set the provider for the User abstraction
    User.setProvider(web3.currentProvider);

    // trigger create user when sign up is clicked
    // $('#sign-up-button').click(function() {
    //   self.createUser();
    //   return false;
    // });

    // $('#sign-in-button').click(function() {
    //   self.getUser();
    //   return false;
    // });
    // populate users
    //self.getUsers();
  },

  createUser: function() {
    var eth = $('#sign-up-eth-address').val();
    var category = $('#sign-up-user-type').val();

    console.log('creating user on eth for', eth, category);

    User.deployed().then(function(contractInstance) {

      contractInstance.insertUser(eth, category, {gas: 200000, from: web3.eth.accounts[0]}).then(function(index) {
        // todo: maybe refresh users here but this could take a while... needs spinner / or message to refresh
        console.log(index);
        swal("Success", "User created successfully", "success");
        
      }).catch(function(e) {
        // There was an error! Handle it.
        console.log('error creating user:', eth, ':', e);
        swal("Something went wrong!", "Error in creating user", "error");

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
  } else {
    console.warn("No web3 detected. Please use MetaMask or Mist browser.");
  }

App.start();
  
});


