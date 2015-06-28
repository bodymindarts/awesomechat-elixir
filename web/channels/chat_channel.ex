defmodule AwesomeChat.ChatChannel do
  use AwesomeChat.Web, :channel
  alias AwesomeChat.Storage

  @topic "chat"

  def join(@topic, _auth_msg, socket) do
    {:ok, socket}
  end

  def handle_in("new_msg", msg, socket) do
    # redis = Exredis.start
    msg
    |> Storage.store_msg(@topic)
    |> broadcast_msg(socket)

    {:noreply, socket}
  end

  def handle_in("sync", %{"history" => history}, socket) do
    @topic
    |> Storage.all
    |> push_history(socket)

    history
    |> Enum.map(&Storage.store_msg(&1, @topic))
    |> Enum.map(&broadcast_msg(&1, socket))

    {:noreply, socket}
  end

  def handle_out("new_msg", msg, socket) do
    push socket, "new_msg", msg
    {:noreply, socket}
  end

  defp broadcast_msg({:ok, msg}, socket), do: broadcast!(socket, "new_msg", msg)
  defp broadcast_msg(_no_msg, _socket), do: nil

  defp push_history(history, socket) do
    push socket, "sync", %{"history" => history}
  end
end
