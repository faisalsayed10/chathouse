## Chathouse

A Public Drop-in Chat App built with NodeJS, GraphQL, Firebase, React, Chakra UI and React Draft.

### How to contribute?

1. Clone the repository.

2. Run `yarn install` to install the required dependencies.

3. Change the required API keys (Firebase) in the `.env` file with your own.

4. Create your own `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` in the `.env` file.

5. Make sure to comment out the `sameSite: "None"` and `secure: true` options wherever the cookies are set/removed. (These options are only used for production).

6. Run `yarn start` inside the `client/` directory to start the front-end and `yarn dev` inside the `server/` directory to start the server.

7. That's it! Add the features you want or fix any bug, make a PR and it'll be merged!

Website --> https://chathouse.now.sh