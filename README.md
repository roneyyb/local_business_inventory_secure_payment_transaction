# local_business_inventory_secure_payment_transaction
This software provides local inventory support to local business where they can add item to inventory that will be identified by barcode.
Customer can scan the item with the help of barcode scanner.
Customer can make his cart by adding product and then pay the bill.
For paying bill securly three factor authentication method is implemented. 
First authentication with userid and password then finger scan after that otp based authentication with mobile number. 
User needs to register with the bank if he is unregistered.
If all successful then customer will be able to pay bill.
Various Network security algorithm is used to secure data like AES to store otp and bcryptjs to encrypt userid and password.
Used react-native, expo, mongoDB, nodeJS.

Steps to run:-
1. Install NodeJS.
2. Install expo-cli.
3. Install react-native-cli
