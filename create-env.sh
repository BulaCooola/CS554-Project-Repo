#!/bin/bash

echo "Generating auth_secret..."
nextauth_secret=$(openssl rand -hex 32)
echo "AUTH_SECRET=$nextauth_secret" > .env
echo ".env file created with AUTH_SECRET"
