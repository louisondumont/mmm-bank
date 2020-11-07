
# mmm-bank

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

It displays your bank account balance. Works with major US banks with Plaid API.

![Screenshot](https://raw.githubusercontent.com/louisondumont/mmm-bank/master/screenshot_mmm-bank.png)

## Using the module

### Step 1 - Get a Plaid access token
You need to set up an account on Plaid and get an access token for your bank account. It takes an extra step, but that way only you and Plaid have access to your information.

- Create an account on [Plaid.com](https://plaid.com)
- Generate the access token for your bank account
```bash
git clone https://github.com/plaid/quickstart.git
cd quickstart/node
npm install
# Start the Quickstart with your Development API keys from the Dashboard (https://dashboard.plaid.com/team/keys)
PLAID_CLIENT_ID='CLIENT_ID' \
PLAID_SECRET='SECRET' \
PLAID_ENV='development' \
PLAID_PRODUCTS='transactions' \
PLAID_COUNTRY_CODES='US' \
node index.js
# Go to http://localhost:8000
```
- Go to [http://localhost:8000](http://localhost:8000) and link your account. This is all happening locally, none of these informations are shared with this module. 
- Copy the access token.
    
### Step 2 - Put your Plaid infos in the config

Add the following configuration block to the modules array in the `config/config.js` file of your MagicMirror installation:
```js
var config = {
    modules: [
        {
            module: 'mmm-bank',
            config: {
                plaid: {
                    'client_id': 'YOUR_PLAID_CLIENT_ID',
                    'secret': 'YOUR_PLAID_SECRET',
                    'access_token': 'THE_TOKEN_YOU_GENERATED_IN_STEP1'
                },
                position: 'bottom_left' // or anywhere you want
            }
        }
    ]
}
```

That's it!

## Refreshing token
If for any reason the module stops working, you might have to refresh the token by redoing Step 1.
