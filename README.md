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
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to initiate the application.
