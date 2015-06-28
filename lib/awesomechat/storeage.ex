defmodule AwesomeChat.Storage do
  import Exredis.Api, only: [get: 2, set: 3, zadd: 4, zrange: 4]
  import Poison, only: [decode!: 1]
  import Poison.Encoder, only: [encode: 2]

  def store_msg(redis, topic, msg = %{ "id" => id , "score" => score}) do
    if contains?(redis, id) do
      false
    else
      msg = %{ msg | "pending" => false }

      set(redis, id, to_string(encode(msg, [])))
      zadd(redis, topic <> ":history", score, id)

      {:ok, msg}
    end
  end

  def all(redis, topic) do
    zrange(redis, topic <> ":history", 0, -1)
    |> Enum.map &(decode!(get(redis, &1)))
  end

  defp contains?(redis, id) do
    get(redis, id) != :undefined
  end
end
