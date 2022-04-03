# cygnus-parser
Parser for Maplestory Ranking API written in Node.js. This was meant to complement [Cygnus Bot](https://github.com/chew01/cygnus-bot).

This draws data from the Global Maplestory API and inserts the data into a PostgreSQL database. Not much more can be said about that.

#### Usage
1. Install [Node.js (16.14.2 LTS)](https://github.com/nodejs/node). Your installation should include [npm](https://github.com/npm/cli).
2. Run `npm install`. This will install the required dependencies.
3. Fill in the required fields in the `.env.example` file, and rename the file to `.env`.
4. Run `npm run build`. This will compile the code into a `build` folder and run the app.
5. You can use [node-cron](https://github.com/node-cron/node-cron) as a task scheduler, similar to GNU crontab.
