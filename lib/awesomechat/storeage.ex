defmodule AwesomeChat.Storage do
  def start_link(conn_mod, opts) do
    # {:ok, _} = Application.ensure_all_started(:poolboy)
    # {pool_opts, conn_opts} = split_opts(opts)
    # :poolboy.start_link(pool_opts, {conn_mod, conn_opts})
  end
end
