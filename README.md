# auto-sync-s3-app
Simple app to sync your local destination folder with aws s3

## How to run the project
1. Pull `auto-sync-s3-app` project, `cd` to `auto-sync-s3-app` folder
2. `cd` to each `client` and `server` folder and run `npm i` to install their packages.
2. To run a client app, `cd` to `client` folder and run `npm run client`
3. To run a server app, `cd` to `server` folder and run `make build`(If this command is required `sudo` permission, run `sudo make build`). Then run `make start.dev` to start a server.
4. Client app run on port 3000. Server app run on port 8080.

> Note: This app just only run in your local machine. 
> Note: I can't autorun this app on OS start up and write a Unit tests as requirement in Backend Assignment 2 docs (This is my restrict). You must be to run client and server app manually.
> Note: Make sure that your AWS bucket policy is allow all traffics come from any resources.

