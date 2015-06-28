defmodule AwesomeChat.ChatChannel do
  use AwesomeChat.Web, :channel
  alias AwesomeChat.Storage

  @topic "chat"

  def join(@topic, _auth_msg, socket) do
    {:ok, socket}
  end

  def handle_in("new_msg", msg, socket) do
    redis = Exredis.start

    redis
    |> Storage.store_msg(@topic, msg)
    |> broadcast_msg(socket)

    Exredis.stop redis

    {:noreply, socket}
  end

  def handle_in("sync", %{"history" => history}, socket) do
    redis = Exredis.start

    push_history(redis, socket)
    history
    |> Enum.map(&(Storage.store_msg(redis, @topic, &1)))
    |> Enum.map(&(broadcast_msg(&1, socket)))

    Exredis.stop redis

    {:noreply, socket}
  end

  def handle_out("new_msg", msg, socket) do
    push socket, "new_msg", msg
    {:noreply, socket}
  end


  def broadcast_msg({:ok, msg}, socket) do
    broadcast! socket, "new_msg", msg
  end
  def broadcast_msg(false, socket) do
  end

  def push_history(redis, socket) do
    push socket, "sync", %{"history" => Storage.all(redis, @topic)}
  end
end
