# Post Stream

## Text-Based Social Network
Tentative example post:

    [real name] [username] [time stamp]
    [post]

    Bill Atkinson billatkinson 2016.07.24 10:27:29
    I invented the double-click.

## Prerequisites
- [Node](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Setup Your Project

Download and unpack [Post Stream](https://github.com/JoeKarlsson1/post-stream). Or alternatively checkout from source:

    git clone git@github.com:JoeKarlsson1/post-stream.git
    cd post-stream

Next, inside the project, you need to install the project's various NPM dependencies:

    npm install

Setup up Postgres, make a new data base and add your DB info to `config.json`

    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"

Run the seed scripts to enter the default data in the DB.

    sequelize db:seed:all

And you should now be ready to spin up a development build of your new project:

    npm start

Navigate to [http://localhost:3000](http://localhost:3000) in your browser of choice.

## Update Your Project

In order to get an update from this repo, open your directory and type this command:

    git pull

### Important concepts
- No public metrics
  - No visible follower/following numbers
  - No visible like/dislike numbers
- No global public feed
  - No "moments" or news-related feeds
  - No trending topics to browse
- Character limit
  - Brevity
  - Accessibilty
  - Stream shows 256 characters with "read more" expandable to 2048 character limit
- No video/images/gifs
  - Unicode support 🆗
- Contextual responses
  - agree
  - agree for $reason
  - disagree 
  - disagree for $reason
  - tell me more about $thought / $opinion
  - thank you for sharing
  - brilliant
- No ads or sponsored posts

## Todo
  - EmojiOne support
  - Verifed Users

## Stretch Goals
  - Possible fuzzy metrics (Your engagement is {very high} {high} {average})
  - SMS-support
  - Filtering of topics
    - Mute options for keywords
    - Signup categories - subscribe to posts from only certain categories
    - Autofilter based on keywords, hashtags
  - Verification
    - Keybase???
  - Highlight text [medium.com]
  - Permalinks - jump to comment or highlight
  - Customize appearance
    - Theme support (Github, Solarized, Tomorrow, etc.)

### Handling posts
#### Viewing shared links:

- collapsible (a la [Folding Text](http://www.foldingtext.com), [Minimal Reader](http://www.minimalreader))
- plain-text reader mode stripped of images for articles
- viewable highlights/annotations from share

#### Idea on infinite nested comments: http://ux.stackexchange.com/a/1736

- collapsible
- one comment at a time
- nested comments display below


## Inspiration

- [Little Voices](http://www.littlevoicesapp.com)
- [Rainbow Stream](http://www.rainbowstream.org)

## Contributing
1. Fork it!
2. Create your feature branch: ```git checkout -b my-new-feature```
3. Commit your changes: ```git commit -am 'Add some feature'```
4. Push to the branch: ````git push origin my-new-feature````
5. Submit a pull request :D

## Credits
- Ray Farias
- Jacoby Young
- Joe Carlson
