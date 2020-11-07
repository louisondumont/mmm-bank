/* Magic Mirror
 * Node Helper: mmm-bank
 *
 * By 
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
const https = require('https')


module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "mmm-bank-NOTIFICATION_TEST") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			// Send notification
			this.sendNotificationTest(this.anotherFunction()); //Is possible send objects :)
		}
		if(notification === 'mmm-bank-PLAID_QUERY') {
			var self = this;
			var config = payload.config;


			const data = JSON.stringify({"client_id":config.plaid.client_id, "secret":config.plaid.secret, "access_token":config.plaid.access_token}) 
			const options = {
				hostname: 'development.plaid.com',
				  port: 443,
				  path: '/accounts/balance/get',
				  method: 'POST',
				  headers: {
					      'Content-Type': 'application/json',
					      'Content-Length': data.length
					    }
			}

			var chunks_of_data =[];
			const req = https.request(options, res => {
				  console.log(`statusCode: ${res.statusCode}`)


				  res.on('data', d => {
					  chunks_of_data.push(d);
					    })
					res.on('end', () =>{
								        	var response = JSON.parse(Buffer.concat(chunks_of_data).toString());
										self.sendSocketNotification('mmm-bank-PLAID_RESPONSE', response);
									})
			})

			req.on('error', error => {
				  console.error(error)
			})

			req.write(data);
			req.end();



		}
	},

	// Example function send notification test
	sendNotificationTest: function(payload) {
		this.sendSocketNotification("mmm-bank-NOTIFICATION_TEST", payload);
	},

	// this you can create extra routes for your module
	extraRoutes: function() {
		var self = this;
		this.expressApp.get("/mmm-bank/extra_route", function(req, res) {
			// call another function
			values = self.anotherFunction();
			res.send(values);
		});
	},

	// Test another function
	anotherFunction: function() {
		return {date: new Date()};
	}
});
