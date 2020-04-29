Prerequisites:

1. Install node js
2. Visual Studio Code(Preferable)
3. Mongo DB Community edition
4. Any Rest client - Preferably 'Postman'

To Do:
Set environment variables for mongo and node js

To run the project in local:
1. Clone the project into local repository.
2. Open the project folder Image Search in Visual Studio Code

3. There are two components of the application:
	Frontend(angular views)
	Backend(backend api)

4. In Visual studio code, open a new terminal and navigate to 'backend' folder by 'cd backend', install node modules and up the server by following these commands:		
run 'npm install' command and wait for node modules to get installed, then enter
nodemon app.js or node app.js

5. Open another new terminal(for frontend) and navigate to 'frontend' folder by 'cd frontend', install node modules and up the server by following these commands:		
run 'npm install' command and wait for node modules to get installed, then enter
ng serve

6. Now if there are no errors and both the servers are up and runnning, Go to browser and run the application at the below url:
	http://localhost:4200/