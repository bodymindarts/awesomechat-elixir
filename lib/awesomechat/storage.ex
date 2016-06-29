defmodule AwesomeChat.Storage do
  alias AwesomeChat.Storage.Worker

  @pool_name :storage_pool

  def start_link() do
    Application.ensure_all_started(:poolboy)

    pool_options = [
      {:name, {:local, @pool_name}},
      {:worker_module, Worker},
      {:size, 5},
      {:max_overflow, 10}
    ]

    :poolboy.start_link pool_options, []
  end

  def all(topic) do
    :poolboy.transaction(@pool_name, &Worker.all(&1, topic))
  end

  def store_msg(msg, topic) do
    :poolboy.transaction(@pool_name, &Worker.store_msg(&1, msg, topic))
  end
end
