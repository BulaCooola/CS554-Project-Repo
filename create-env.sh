#!/bin/bash

echo "Generating nextauth_secret..."
nextauth_secret=$(openssl rand -hex 32)
echo "NEXTAUTH_SECRET=$nextauth_secret" > .env
echo ".env file created with AUTH_SECRET"
