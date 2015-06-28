defmodule AwesomeChat.PageController do
  use AwesomeChat.Web, :controller

  plug :action

  def index(conn, _params) do
    conn
    |> render("index.html")
  end
end
