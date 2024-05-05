#!/bin/bash

echo "Generating nextauth_secret..."
nextauth_secret=$(openssl rand -hex 32)
echo "NEXTAUTH_SECRET=$nextauth_secret" > .env
echo "NEXTAUTH_URL=http://localhost/api/auth/$nextauth_secret" >> .env
echo ".env file created with NEXTAUTH_SECRET and NEXTAUTH_URL"
