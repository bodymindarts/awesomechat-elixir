defmodule AwesomeChat.ChatChannel do
  use AwesomeChat.Web, :channel

  def join("chat", _auth_msg, socket) do
    IO.puts("CHAT JOINED")
    {:ok, socket}
  end


  def handle_in("new_msg", %{"body" => body}, socket) do
    msg = %{body | "pending" => false}
    broadcast! socket, "new_msg", %{body: msg}
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end
end
