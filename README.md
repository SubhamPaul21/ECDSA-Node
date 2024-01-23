# ECDSA-Node
This is the first week project of Ethereum Developer BootCamp by Alchemy University.

This project is an example of using a client and server to facilitate transfers between different addresses. This is clearly very centralized since there is just a single server on the back end handling transfers. However, we have incorporated Public Key Cryptography. 

By using the Elliptic Curve Digital Signature Algorithm, we have made the server only allow transfers signed for by the person who owns the associated address.

## Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

# Client
The client folder contains a react app using vite. To get started, follow these steps:

1. Open up a terminal in the /client folder
2. Run npm install to install all the depedencies
3. Run npm run dev to start the application
4. ow you should be able to visit the app at http://127.0.0.1:5173/

# Server
The server folder contains a node.js server using express. To run the server, follow these steps:

1. Open a terminal within the /server folder
2. Run npm install to install all the depedencies
3. Run node index to start the server
4. The application should connect to the default server port (3042) automatically!

Hint - Use nodemon instead of node to automatically restart the server on any changes.