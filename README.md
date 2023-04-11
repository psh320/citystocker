# citystocker

## Project Introduction

This is my final year project in City University of Hong Kong. I came up with this project because I have seen so many people loosing their money in cryptocurrency market in 2021~2022. 

I wanted people to try practicing the coin trade without loosing any real money. Also run a backtesting of customizable trade algorithm to check the performance of algorithm based on the real coin market price.

The customizable algorithm is where you can write the code in code editor provided in the website using the class provided by the website. Without any other settings, you can simply run algorithm trading of your own.

---

## Repository Information

**Stocker-app** is for Frontend. I have used Next.js and Material UI to develop the client side. **Inside stocker-app, there is folder stocker-core which provide hooks related to Firebase SDK.** Firebase is also used to store users database of trading coins and wallet status. Login system and hosting of website is also done through firebase.

**Stocker-worker** is for Backend server, I have deployed a node.js server using docker container with cloud build in google cloud platform. In this server, it provides endpoint API from binance and api that runs the users’ custom trading algorithm.
