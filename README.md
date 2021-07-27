Overview
This is a fullstack app for petcare service providers to display their services, communicate with, and book clients. 
Describe the purpose of the project.
- Link to a live working demo whenever possible. If you have a live working. Screenshots, videos, or gifs of your work in action. Don’t assume someone will take the time to clone your project to see how it works. Screenshots, videos, and gifs accomplish the same thing right on the page. Seeing that something works and looks good is very enticing.

Features:
- Different appearance depending on if client or provider logs in.
    For clients: 4 navigation tabs (home, services, chat, & user info).
    For provider: 2 navigation tabs (chat & calendar).
Calendar can be modified by provider to offer different services on different days.
Range pricing allowing clients to choose how much they pay.
Chat component allowing users and provider to chat directly.
Login where users can add pets, care instructions, and personal address.

Setup & Installation
Install npm, nodejs ...??
Pull project and install .... <??>
Give instructions on how to set up and install your project.
Link to an installer or release if you have one available.


Usage & Details
Explain how to use your project.
Include a design diagram if your application is complex.


ChangeLog & Roadmap
Currently with a working home & services components.
In future, chat & user components will be implemented, as well as the interface for the provider. There is a lot of work left to do, not the least of which being a functioning backend.
Lay out your vision for the project’s future. What new features do you want to add? Which bugs do you want to squash


Credits
Use someone else’s code for any part of your project? Couldn’t function without dependencies? Lean heavily on someone’s guide? Give them credit! Always cite your sources.





project for MalsPals

Installed packages include (but aren't limited to):
- **UNUSED yarn add react-native-collapsible-list ** UNUSED   
- **UNUSED expo install @react-native-community/datetimepicker

- https://github.com/peacechen/react-native-modal-selector
- yarn add react-native-calendar-picker & yarn add moment
- @aws-sdk/client-s3
- @aws-sdk/client-cognito-identity @aws-sdk/credential-provider-cognito-identity
<!-- - yarn add lottie-react-native ??? but this doesnt work??? idgi -->
    - expo install expo-sms
- yarn add react-native-awesome-alerts https://www.npmjs.com/package/react-native-awesome-alerts
--->>> will need to alter that code a bit for pretty-ing up
----->>> as an alternate idea to the btn, having a popup that displays when the screen 1st focuses on that tab would be cool, couldnt figure it out.
    https://medium.com/technoetics/creating-first-time-user-welcome-screen-in-react-native-42f08cb0ebbe (async storage want working initially): https://react-native-async-storage.github.io/async-storage/docs/usage : https://stackoverflow.com/questions/47954666/the-bind-value-at-index-1-is-null-getting-data-from-from-asyncstorage-in-react : https://blog.jscrambler.com/how-to-use-react-native-asyncstorage/ : 
    https://reactjs.org/docs/react-component.html#componentdidmount
    https://stackoverflow.com/questions/56808330/componentdidmount-working-only-at-first-time-screen-load-in-react-native
    https://reactnavigation.org/docs/4.x/function-after-focusing-screen/



Components:

TODO:
1. Complete components + linkage
2. Instagram on homepage
3. add alt text to images
4. C         fix homepage hero - reviews header malfunction
5. more images
6. fix comments
7. error & loading messages
8. make reviews on homepage collapsible
9. Add share capabilities & email contact
10. Cancel btn for service request
11. add login page that appears on app startup

thank you to:
https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/