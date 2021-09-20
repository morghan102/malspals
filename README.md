#MalsPals

#Overview
This is a fullstack app for petcare service providers to display their services, communicate with, and book clients, who can request these services in their very own account with their personal details and pets.

This application uses React Native for the front and Firebase on the backend.


Full App after logging in
https://user-images.githubusercontent.com/48462502/134087116-2bcb5f34-62d7-492f-9bee-e954bd3b69fd.mp4

https://user-images.githubusercontent.com/48462502/134085801-9584e90b-0a47-4266-a7a9-e0ca101eab19.mp4


Signup Flow
https://user-images.githubusercontent.com/48462502/134087129-7d697fe0-c526-4e00-9dc0-0c75bac29049.mp4


#Features:
- Different appearance depending on if client or provider logs in.
    For clients: 4 navigation tabs (home, services, chat, & user info).
    For provider: 2 navigation tabs (chat & calendar).
Calendar can be modified by provider to offer different services on different days.
Range pricing allowing clients to choose how much they pay.
Chat component allowing users and provider to chat directly.
Login where users can add pets, care instructions, and personal address.

#Setup & Installation
download and yarn add or npm install
Create project on firebase and add your data to the firebase folder with the config info.

#Future features
1. Chat component will be implemented - interface for the provider and client to communicate directly on the app. 
2. 2 different flows for client and admin: client side will show what I have now, what's on the videos. Admin side will be for admin to use the chat component and see who has created an account. This can also be acheived by using firebase but I want it to be available in the app as well.
3. User screen: will allow editing of personal and pet information as well as adding a thumbnail image of user and/or pet.
4. ServiceInfoComponent modal: currently resets state after about a minute. I will get this to reset immediately.
5. Styling: add color to user and add pet components and change the images on the homescreen.
6. Instagram linkage?: this will depend on if Mal puts more in her business' Instagram, but I'd like to add this to the homepage.

Credits
This app could not have been done without the inspiration of my sister who is running her own petcare business in Raleigh, NC. She is doing a great job and her clients love her.
As for the app itself, I had so much help and encouragement from friends and family. Huge credits to freecodecamp for some of their react + firebase tutorials.
