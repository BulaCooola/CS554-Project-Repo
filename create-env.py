import os
import secrets

print("Generating nextauth_secret...")
nextauth_secret = secrets.token_hex(32)
with open('.env', 'w') as env_file:
    env_file.write(f'NEXTAUTH_SECRET={nextauth_secret}\n')
    env_file.write(f'NEXTAUTH_URL=http://localhost/api/auth/{nextauth_secret}\n')
print(".env file created with NEXTAUTH_SECRET and NEXTAUTH_URL")