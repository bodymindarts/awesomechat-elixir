defmodule AwesomeChat.Storage.Worker do
  use GenServer

  def start_link do
    GenServer.start_link __MODULE__, []
  end

  def init(_args) do
    {:ok, redis} = Exredis.start_link
  end

  def all(topic, worker) do
    GenServer.call worker, {:all, topic}
  end

  def store_msg(msg, topic, worker) do
    GenServer.call worker, {:store, msg, topic}
  end

  import Exredis.Api, only: [get: 2, set: 3, zadd: 4, zrange: 4]
  import Poison, only: [decode!: 1]
  import Poison.Encoder, only: [encode: 2]

  def handle_call({:all, topic}, _from, redis) do
    result = zrange(redis, topic <> ":history", 0, -1)
    |> Enum.map &(decode!(get(redis, &1)))
    {:reply, result, redis}
  end

  def handle_call({:store, msg = %{"id" => id}, topic}, _from, redis) do
    result = _store_msg(msg, topic, redis, contains?(id, redis))
    {:reply, result, redis}
  end

  defp _store_msg(msg, topic, redis, true), do: nil
  defp _store_msg(msg = %{"id" => id, "score" => score}, topic, redis, false) do
    msg = %{ msg | "pending" => false }
    set(redis, id, to_string(encode(msg, [])))
    zadd(redis, topic <> ":history", score, id)
    {:ok, msg}
  end

  defp contains?(id, redis), do: get(redis, id) != :undefined
end
