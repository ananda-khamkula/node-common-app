const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const argsArray = process.argv;
const args = require('minimist')(process.argv.slice(2))
const passingArgs = process.argv.slice(2);
let hash = "";
let bytes = "";
let encrypt = "";
let decrypt = "";

switch (passingArgs[0]) {
	case 'hash':
		bcrypt.hash(passingArgs[1], Number(passingArgs[2]), function(err, hash) {
			console.log("Original Text :", passingArgs[1]);
			console.log("hash :", hash);
			bcrypt.compare(passingArgs[1], hash, function(err, result) {
				if (!err) {
					console.log("hash compared with " + passingArgs[1] + " :", result);
				} else {
					console.log("hash not correct #1 !!!");
				}
			});
			bcrypt.compare("other text", hash, function(err, result) {
				if (!err) {
					console.log("hash compared with other text :", result);
				} else {
					console.log("hash not correct #2 !!!");
				}
			});
		});

		break;
	case 'dehash':
		bcrypt.compare(passingArgs[2], passingArgs[1], function(err, result) {
			console.log("hash :", passingArgs[1]);
			console.log("hash compared with " + passingArgs[2] + " :", result);
		});

		break;
	case 'encode':
		encrypted = CryptoJS.AES.encrypt(passingArgs[1], passingArgs[2]).toString();
		bytes  = CryptoJS.AES.decrypt(encrypted, passingArgs[2]);
		decrypted = bytes.toString(CryptoJS.enc.Utf8);
		console.log("Original Text :", decrypted);
		console.log("Encrypted :", encrypted);
		break;
	case 'decode':
		bytes  = CryptoJS.AES.decrypt(passingArgs[1], passingArgs[2]);
		decrypted = bytes.toString(CryptoJS.enc.Utf8);
		encrypted = CryptoJS.AES.encrypt(decrypted, passingArgs[2]).toString();
		console.log("Original Text :", encrypted);
		console.log("Decrypted :", decrypted);
		break;
	default:
		console.log('-- HELP --');
		console.log(' ');
		console.log('node ' , argsArray[1] , ' hash   [text_to_be_hashed] [saltRounds] ');
		console.log('node ' , argsArray[1] , " dehash '[hashed]' [text_to_test_hash] ");
		console.log('node ' , argsArray[1] , ' encode [text_to_be_encoded] [SECRET_KEY] ');
		console.log('node ' , argsArray[1] , ' decode [text_to_be_decoded] [SECRET_KEY] ');
		console.log(' ');
}

