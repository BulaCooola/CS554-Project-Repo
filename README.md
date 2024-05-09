# TourneyPro
## CS 554 Web Programming 2 Project Spring 2024

### Collaborators
* Branden Bulatao: [BulaCooola](https://github.com/BulaCooola)
* Lennon Okun: [lennonokun](https://github.com/lennonokun)
* Paul Odre: [Mudkip101004](https://github.com/Mudkip101004)
* Padraig Phelps: [Padraig-Phelps](https://github.com/Padraig-Phelps)

## Demo Video
* [Our Youtube Video]()

## Getting Started
This web application uses the following independent technologies which require installation.
- **imagemagick**
- **Elasticsearch**
- **redis**
- **Docker / Docker Desktop**

### ImageMagick
To install ImageMagick, download it from this link for your respective device [https://imagemagick.org/script/download.php]
Note: When installing, be sure to check "Install Legacy Utilities" and (depending on your system) "Add to system path", for the correct
utilities to be installed. Specifically, when testing on Windows, for some users the computer had to be restarted/ImageMagick manually
added to system path before it would work.

### Redis (Local) And Docker Desktop 
To install Docker Desktop, click this link and download the version for your operating system [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)


To install Redis Stack using Docker, do the following.
* If you don't have docker desktop:
    ```
    $ docker pull redis/redis-stack
    ```
* If you do have docker desktop, search for redis/redis-stack and pull from there

Next, do the following commands in the command prompt
```
$ docker pull redis/redis-stack
$ docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
$ docker exec -it redis-stack redis-cli
```



## How to Use
Open a **bash** terminal and install the dependencies.

```
npm i
``` 

We now need to run a script file to set up our important environment variables. 
To generate, simply run any of these commands into a bash terminal. 
* Option 1
    ```
    npm run create-env
    ```  
* Option 2
    ```
    sh create-env.sh
    ```
* Option 3 
    ```
    ./create-env.sh
    ```
You will then see a wizard saying if you want to run the website on local or cloud.
```
1. Local 
2. Cloud
```
Simply press either 1 or 2. ***(We recommend cloud)***

**DISCLAIMER:** 
1. **Running elasticsearch (localhost:3000/search) on the local branch will not be able to search from the local database but instead the cloud database. Clicking on these results will end up being a 404**
2. When running on cloud, your redis AND mongo will also be on cloud therefore **you won't be able to see your keys.** 

Once you created your secret, you can now build the project
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to initiate the application.

## Proposal
* [Original Doc](https://docs.google.com/document/d/1-M6Vw1qfhapALMU4rNLHGqhodm4MG-xmozxVXpK0CHw/edit?usp=sharing)

### Function and General Overview
In athletics, teams across all sports face the task of organizing tournaments, scheduling matches, and managing team activities. However, the solutions to fit these needs come in various shapes and sizes, and there is no easy way to create such events. This is where our application comes in.

Our application is designed to revolutionize the way sports events are managed and organized, offering a seamless experience to fulfill the needs of athletes, coaches, and organizers. The main features of this app are its tools for creating brackets for tournaments based on the sport, creating and scheduling events/tournaments/games/matches, offering a live scorekeeping feature for every game/match in the event, and communication systems for enhanced user experience. The app also allows any current or existing teams to register as well as register any new teams/individuals who are new to their sport. Our focus will be to implement a general bracket that works for both individual sports such as wrestling and team competitions such as basketball. 

### Course Technologies
#### Redis 
An in-memory data structure store is used as a database and cache, which offers high performance. Redis will be used to optimize response times.
#### React
A JavaScript frontend library for building user interfaces. Will be used to make single-page applications.
#### Next.js
Web development framework to be used as the server to provide our web application that is going to be using React.

### Independent Technologies
#### ImageMagick
A software used to create, edit, and manipulate digital images, with support to many image formats. This will be used to format the images that a user uploads from the web application.

#### Elasticsearch
A  search engine and analytics engine that is optimized for speed and performance. This will be used to enhance our search feature to look up profiles, teams, and tournaments/brackets

