# AwesomeChat Elixir
This is the AwesomeChat chat application ported to Elixir using the Phoenix web-framework. It was developed and tested using Elixir v1.0.4 Redis v3.0.2.

## Setup

Install elixir `brew install elixir`

Clone repository `git clone https://github.com/bodymindarts/awesomechat-elixir.git`

`cd awesomechat-elixir`

Install dependencies `npm install && mix deps.get`

Start Redis on localhost

`brew install redis`

`redis-server /usr/local/etc/redis.conf` (in another TAB)


## Run the server

Start Phoenix endpoint with `mix phoenix.server`

Now you can visit `localhost:4000` from your browser.
