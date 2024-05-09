import os
import secrets

print("Configuring MongoDB connection...")
print("Choose your MongoDB connection type:")
print("1. Local")
print("2. Cloud")
connection_type = input("Enter your choice (1 or 2): ")

if connection_type == "1":
    mongo_link = "mongodb://127.0.0.1:27017/"
    print("Local MongoDB connection configured:", mongo_link)
elif connection_type == "2":
    # Adjust this connection string according to your cloud MongoDB setup
    mongo_link = "mongodb+srv://username:password@cluster.mongodb.net/dbname"
    print("Cloud MongoDB connection configured:", mongo_link)
else:
    print("Invalid choice. Exiting...")
    exit()

print("Generating nextauth_secret...")
nextauth_secret = secrets.token_hex(32)
with open(".env", "w") as env_file:
    env_file.write(f"MONGO_LINK={mongo_link}\n")
    env_file.write(f"NEXTAUTH_SECRET={nextauth_secret}\n")
    env_file.write(f"NEXTAUTH_URL=http://localhost/api/auth/{nextauth_secret}\n")
print(".env file created with NEXTAUTH_SECRET and NEXTAUTH_URL")
