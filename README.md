# smart-reviewing-system
Conference Paper Reviewing System built on Ethereum Blockchain using Web3, Truffle, Solidity and Javascript.

In recent years, many organizations have sprung up which publish journals 	submitted to the conferences organized by them. However such organizations do 	not check the quality of the papers/journals submitted to them and publish them by 	taking money from the authors. Even the authors don’t object since they can 	mention their publications in the resume. Due to such malpractices the quality of 	papers available for the scientific community degrades. Hence there is a need of a 	system which can assure the credibility of the papers published and gain the trust of 	the people who will be referring such papers for their research. This paper proposes 	a new quality assessment system of papers using ethereum blockchain. The system 	aims at using the distributed nature of blockchain for reviewing of papers and also 	rewarding those who provide value to the system by their contributions.

**Note: This application is in development phase. This repo contains the basic modules that the application will contain. More modules can be added as per requirement.**

The basic applicaton consists of 3 modules:
- User Signup and Signin
- Uploading Documents (Conference papers uploaded by participants to be reviewed)
- Voting Panel (used by domain experts to approve/disapprove papers based on its quality)

# Prerequisites before using the application:
  - Browser- Any modern browser will work just as fine preferably Chrome or Firefox.
  - [Metamask](https://metamask.io/)- Download and install metamask as a plugin on your browser.
  - [Truffle](https://truffleframework.com/) - Download and install truffle framework on your system.
  - [Ganache](https://truffleframework.com/ganache)- Download and install Ganache on your system.
  - [Nodejs](https://nodejs.org/) - Download and install Nodejs and NPM on your system.
  - [IPFS](https://ipfs.io/) - Download and install IPFS on your system.


# How to use

1. Clone the repo by typing the following:
```git clone https://github.com/Sangatdas/smart-audit-system```

2. Start [Ganache](https://truffleframework.com/ganache) application.

3. Open Metamask and and click on the arrow on left-upper corner. Select custom RPC among the options.

4. In the New RPC URL field type- http://127.0.0.1:7545. Then click on save.

5. Open Ganache and copy the seed words present on the top.

6. Now open Metamask and select restore from seed words. Paste the seed words copied in the above step. Enter your password and then login.

7. Now open the terminal in the folder that you have extracted after cloning the repo. Type the following:
```npm install```
See this [page] if there are any build issues. If not then we can move forward.

8. Initialise local IPFS repository:
```
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "[\"true\"]"
ipfs daemon
```
**Note: No other application should be running on port 8080 else IPFS won't start.**

9. Now your local IPFS is up and running and hosted on port 8080. Now in another terminal at the same location type the following:
```
truffle migrate --reset
npm run dev
```
Your application is up and running on port 8081(most probably).

10. Now you can use the application. It contains of 3 pages.
    - index.html
    - client.html
    - accountant.html
    
Type the respective page name after the / in the browser to use that page. you can switch between accounts using metamask. Although you have to import all accounts from Ganache using their private key. Refer [Metamask official page](https://metamask.io/) and [Ganache](https://truffleframework.com/ganache) to learn how to do that.

For usage details and demonstration watch the [video](https://youtu.be/0o5oC16X-BA)

# Contributors
  - [Sangat Das](https://github.com/Sangatdas)
  - [Anand Kumar Sinha](https://github.com/anandsinha07)
  - [Rohit Barde](https://github.com/)
  - [Ashish Daulatabad](https://github.com/)
