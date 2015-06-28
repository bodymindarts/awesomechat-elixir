defmodule AwesomeChat.Storage do
  import Exredis.Api, only: [get: 2, set: 3, zadd: 4, zrange: 4]
  import Poison, only: [decode!: 1]
  import Poison.Encoder, only: [encode: 2]

  def all(topic, redis) do
    zrange(redis, topic <> ":history", 0, -1)
    |> Enum.map &(decode!(get(redis, &1)))
  end

  def store_msg(msg = %{"id" => id}, topic, redis) do
    _store_msg(msg, topic, redis, contains?(id, redis))
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
