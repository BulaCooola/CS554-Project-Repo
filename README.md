# TourneyPro
## CS 554 Web Programming 2 Project Spring 2024

### Collaborators
* Branden Bulatao: [BulaCooola](https://github.com/BulaCooola)
* Lennon Okun: [Mudkip101004](https://github.com/Mudkip101004)
* Paul Odre: [lennonokun](https://github.com/lennonokun)
* Padraig Phelps: [Padraig-Phelps](https://github.com/Padraig-Phelps)

## Demo Video
* [Our Youtube Video]()

## Getting Started
This web application uses the following independent technologies which require installation.
- **imagemagick**
- **Elasticsearch**

### How to Use
Open a **bash** terminal and install the dependencies.

```
npm i
``` 

The secret key has already been provided in the code. But, if you want to create your own secret key follow these instructions! 
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

* If you do not have a bash terminal and have a powershell terminal, follow one of the following options:
* Option 1: Run create-env.py python script
   ```
    py -'version number' create-env.py
   ```  
* Option 2: Paste this into your terminal. 
    ```
    npx auth secret
    ``` 
    Make sure that you add the new secret to your `.env` file.
    ```
    NEXTAUTH_SECRET="your auto generated secret"
    ```

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

