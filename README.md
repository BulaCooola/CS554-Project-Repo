# TourneyPro

## Getting Started
This web application uses the following independent technologies which require installation.
- **imagemagick**
- **Elasticsearch**

<hr></hr>
Open a **bash** terminal and install the dependencies.

```
npm i
``` 

Before you build and start the project, the authentification requires a secret key. To generate, simply run any of these commands into a bash terminal. 
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

* If you do not have a bash terminal and have a powershell terminal, paste this into your terminal. 
    ```
    npx auth secret
    ``` 
    Make sure that you add the new secret to your `.env` file.
    ```
    NEXTAUTH_SECRET="your auto generated secret"
    ```

Once you created your secret, you can now build the project
```
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to initiate the application.
