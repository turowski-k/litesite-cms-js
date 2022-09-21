# LitesiteCMS.js

## Introduction
LitesiteCMS is a lightweight CMS (or rather: blogging) engine coded in pure JavaScript. Runs entirely client-side, requires no installation process, backend setup or database. Can be hosted on any server that allows hosting static web pages and serves dynamic content itself.

Why?
* It was fun to create
* Also, why not?

There's a handful of obvious downsides: you have to edit the files on the ftp to change the content and data is always publicly available for anyone to scrape.

You can find a live demo [HERE](https://tk-litesitejs-demo.glitch.me/#/blog/sample-post), although it can run a little sluggish on Glitch.com. Currently hosting `0.1.0-preview` release.

## Features

Some of functionalities that LitesiteCMS provides:
* Listing and displaying posts
* Displaying non-blog pages
* Filtering posts by tags and categories
* Custom top menu page structure
* Markdown parsing
* ~~Themes~~*

*\*will provide, that is - when it's released*

## Installation
Clone or download this repo. Add required config and data files (refer to wiki and example data in `sample/data`). Upload to a webhost of your choice.

To run locally, just start an http-server of your choice inside of the `src` dir.

## Usage
When modifying content, just push changed data files to your ftp.

## Contributing

Make sure you follow these rules when contributing changes to this project:

1. **Don't**

This isn't a case of hubris. Quite opposite. As I'm writing this, in the early stages of LitesiteCMS development, I'm still very inept at JavaScript. This is a solo project I intend to learn JS with and enjoy every bit of it.

**But** while I don't want anyone else to contribute code to the repository, if anyone wishes to contribute bug findings or suggestions, [Issues](https://github.com/turowski-k/litesitejs/issues) is the way to go about it. Open one, tag it properly and describe your findings.

I will appreciate **greatly** any insights on improving the app.

At the same time, please remember that some of the stuff is coded in a way that might not make sense for one of two reasons. Firstly, I am inexperienced and willing to improve on it. Secondly, I might've included something that didn't make sense, because I wanted to learn something by coding it.

## License
This project is licensed under the terms of the [**MIT** license](https://github.com/turowski-k/LitesiteCMS.js/blob/dev/LICENSE).
