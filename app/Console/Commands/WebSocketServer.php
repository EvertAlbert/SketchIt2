<?php

namespace App\Console\Commands;

use App\Http\Controllers\WebSocketController;
use Illuminate\Console\Command;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;

class WebSocketServer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ws:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'run the websocket for the chat';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $chatServer = IoServer::factory
        (new HttpServer(new WsServer(new WebSocketController())), 1234);

        $chatServer -> run();
//
//        $canvasServer = IoServer::factory
//        (new HttpServer(new WsServer(new WebSocketController())), 1235);
//
//        $canvasServer -> run();
    }
}
