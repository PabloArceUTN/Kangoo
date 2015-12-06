/**
* @developer Jose Pablo Arce
* @developer Susana Corrales
*
* Application NameSpace
*/
var KANGOO = KANGOO || {
  /**
  * This create dependencies for the applicaiton. [localStorage],[Cookies],[@Overides]
  * calls : boot.js -- 'Allways in each loaded view', this.KANGOO.rememberMe
  */
  defaultApp: function(){
    if (localStorage["kangoo"]==undefined) {
      localStorage.setItem("kangoo", "[{\"username\": \"null\",\"token\":\"false\"}]");
    }
  },

  /**
  * Return a localStorage.kangoo
  * return : JSON
  * calls  : boot.js -- 'Allways in each loaded view'
  */
  loadLogUser: function () {
    return jQuery.parseJSON(localStorage.kangoo);
  },

  /**
  * Manage and Save an user information into the localStorage
  * calls : log.js
  */
  rememberMe: function(pUsername, pToken){
    //Prevent an eventual failure with the undefined key into the localStorage
    KANGOO.defaultApp();

    //Save the user
    localStorage.setItem("kangoo","[{\"username\":\""+pUsername+"\",\"token\":\""+
      pToken+"\"}]");
  },

  /**
  * Create a token;
  * return : String random
  * calls  : log.js
  */
  getToken: function() {
    return rand() + rand();
  },

  /**
  * Generate a multi-keys
  * return : String Math function
  * calls  : this.KANGOO.getToken
  */
  rand: function() {
    return Math.random().toString(36).substr(2); // remove `0.`
  },

  /**
  * Execute an Ajax Post to set the output mail
  *
  * calls : Not Yet
  */
  outputGate: function(){

  },
  /**
  * ExecutE an Ajax Post to get the next 10 mails in the output gate...
  */
  outputAjaxPOST: function(start, end){
    $.ajax({
      data:  {"start" : start ,"end" : end},
      url:   '/kangoo/dashboard/outputCharger',
      type:  'post',
      beforeSend: function () {
        console.log("Processing new stack of mails...");
      },
      success:  function (response) {
        var objPost = "";
      //**
      console.log(response);
      // try {
      //   objPost = jQuery.parseJSON(response);
      //   //**
      //   console.log(objPost);
      //   if (objPost.res == "successful") {
      //     location.reload();
      //   }
      // } catch (e) {
      //   alert("Woops! Kangoos have some problems here... (: Calm, tray to close your session and/or loging again :)");
      //   console.log(e);
      // }
    }
  });
  },

  /**
  * Draw a new sent rows...
  * @param POST responce
  */
  appendSentRows: function(post){
    var objPost = jQuery.parseJSON(post);
    $("#tableBody tr").remove();
    for (var i = 0; i < objPost.mails.length; i++) {
      $('#tableBody').append( '<tr value="objPost.mails[i].id_user"">'+
      '<td>' + objPost.mails[i].username + '</td>'+
      '<td>' + objPost.mails[i].email + '</td>'+
      '<td>' + objPost.mails[i].id_user + '</td>'+
      '</tr>' );
    };
    localStorage.setItem("finalLoop", objPost.finalLoop);
    localStorage.setItem("initialLoop", objPost.initialLoop);
    localStorage.setItem("diference", objPost.diference);
  },
  /**
  * Call the next 10 mail
  */
  callStack: function(indexTo){
    $.ajax({
    data:  {"sentstack" : indexTo },
    url:   '/kangoo/dashboard/outputCharger',
    type:  'post',
    beforeSend: function () {
      console.log("Processing post mails count and get new stack");
    },
    success:  function (response) {
      KANGOO.appendSentRows(response);
    }
  });
  },
  sayHello: function (){
    alert("Hello");
  },
};
