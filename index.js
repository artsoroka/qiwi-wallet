const request = require('request'); 
const Promise = require('bluebird'); 

function Qiwi(token){
  const apiKey = token || null; 
  this.headers = {
  	"Accept"       : "application/json", 
  	"Content-Type" : "application/json",
  	"Authorization": "Bearer " + apiKey
  };
}; 

Qiwi.prototype._makeRequest = function(params, callback){
  const options = {
  	url    : params.url, 
  	method : params.method, 
  	headers: this.headers
  }; 

  if( params.data ){
  	options.data = {
  		body: JSON.stringify(params.data)
  	};
  }  
  
  request(options, function(err, response, body){
  	if( err ) return callback(err, null); 
  	
  	if( ! body || body.length <= 0) return callback('empty response'); 

  	var data = null; 
  	try{
  		data = JSON.parse(body); 
  	}catch(e){
  		return callback(e); 
  	}

  	callback(null, data); 
  })

}; 

Qiwi.prototype.getProfile = function(){
  const self = this; 

  return new Promise(function(resolve, reject){
    self._makeRequest({
      url: 'https://edge.qiwi.com/person-profile/v1/profile/current', 
      method: 'GET'
    }, function(err, response){
      if( err ) return reject(err); 
      resolve(response); 
    }); 
  }); 
}; 

module.exports = Qiwi; 