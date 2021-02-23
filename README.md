# meetingmanager

## Description

A chrome extension for managing recurring meeting links for applications like zoom.


## Installation Instructions
Install nodejs and npm  
`sudo apt install nodejs`  
Clone the repo.  
Update dependencies run `npm install` in cloned folder.  
run `npm run build` to build the extension.  
In google chrome, navigate to `chrome://extensions`  
Enable "developer mode" in the top right.  
Click `load unpacked extension` and point it to the `dist` folder generated after running build.  

## Optional "hot reload" mode for UI changes
You can use `npm run start` for quick development of UI without building. This runs a local server at `localhost:3000` by default, and you can view the extension as a web page. 
