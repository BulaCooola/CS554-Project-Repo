#!/bin/bash

echo "Generating nextauth_secret..."
nextauth_secret=$(openssl rand -hex 32)
echo "NEXTAUTH_SECRET=$nextauth_secret" > .env
echo "NEXTAUTH_URL=http://localhost/api/auth/$nextauth_secret" >> .env
echo ".env file created with NEXTAUTH_SECRET and NEXTAUTH_URL"

# Step 1: Choose Connection Type
echo "Welcome to MongoDB Configuration Wizard"
echo "Choose your MongoDB connection type:"
echo "1. Local"
echo "2. Cloud"
read -p "Enter your choice (1 or 2): " connection_type

# Local Connection
if [ "$connection_type" == "1" ]; then
    echo "MONGO_LINK=mongodb://127.0.0.1:27017/" >> .env
    echo "Local MongoDB connection configured:"
    echo "mongodb://127.0.0.1:27017/"
fi

# Cloud Connection
if [ "$connection_type" == "2" ]; then
    echo "MONGO_LINK=mongodb+srv://pphelps:TourneyPro1@tourneypro.lzylpud.mongodb.net/?retryWrites=true&w=majority&appName=TourneyPro" >> .env
    echo "Cloud MongoDB connection configured"
fi


echo "Configuration saved successfully!"

