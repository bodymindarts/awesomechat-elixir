use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :awesomechat, Awesomechat.Endpoint,
  secret_key_base: "+3yTwLst++tAdnnYH/LCEy/9gO0MTZ7s413Rd43bhfJVh30W8KJ4SVKdJtxwHNkf"

# Configure your database
config :awesomechat, Awesomechat.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "awesomechat_prod",
  size: 20 # The amount of database connections in the pool
