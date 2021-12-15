<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Exception;
use Symfony\Component\VarDumper\Server\Connection;

class WebSocketController extends Controller implements MessageComponentInterface
{
    private $connections;
    protected $gamers;
    protected $userScore;
    protected $currentDrawer;
    protected $wordArray;
    protected $curWord;

    public function __construct()
    {
        $this->connections = collect();
        $this->gamers = ["gamer"];
        $this->userScore = ["score"];
        $this->currentDrawer = ["drawer", 1];
        $this->wordArray = ["bird", "spoon", "bear", "howest", "pen", "laptop", "lake", "fish", "cup", "man"];
        $this->curWord = ["word", $this->wordArray[rand(0, 9)]];
    }

    function onOpen(ConnectionInterface $conn)
    {
        echo "Connection opened \n";
        $this->connections->push($conn);
    }

    function onClose(ConnectionInterface $conn)
    {
        echo "Connection closed \n";
        $this->connections->reject(function ($elem) {
            return $conn = $elem;
        });
    }

    function onError(ConnectionInterface $conn, Exception $exception)
    {
        echo "Error occured: " . $exception->getMessage() . "\n";
    }

    function onMessage(ConnectionInterface $conn, $msg)
    {
//        echo "message received: " . $msg . "\n";

        $message = explode("_", json_decode($msg)->action)[0];

        foreach ($this->connections as $conn) {
            $conn->send($msg);
        }

//        switch ($message) {
//            case "username":
//                $username = explode("_", json_decode($msg)->action)[1];
//
//                if (array_search($username, $this->gamers)) {
//                    echo "username already connected \n";
//                } else {
//                    array_push($this->gamers, $username);
//                    array_push($this->userScore, 0);
//                }
//
//                foreach ($this->connections as $conn) {
//                    $conn->send(json_encode($this->gamers));
//                    $conn->send(json_encode($this->userScore));
//                    $conn->send(json_encode($this->currentDrawer));
//                    $conn->send(json_encode($this->curWord));
//                }
//                break;
//            case "incr":
//                $winningUserId = explode("_", json_decode($msg)->action)[1];
//                $this->userScore[$winningUserId]++;
//
//                foreach ($this->connections as $conn) {
//                    $conn->send(json_encode($this->userScore));
//                }
//                break;
//            case "rightGuess":
//                $this->rightGuesses = 0;
//                $this->curWord = ["word", $this->wordArray[rand(0, 9)]];
//
//                if ($this->currentDrawer[1] >= count($this->gamers) - 1) {
//                    $this->currentDrawer[1] = 1;
//                } else {
//                    $this->currentDrawer[1] = $this->currentDrawer[1] + 1;
//                }
//
//                foreach ($this->connections as $conn) {
//                    $conn->send(json_encode($this->currentDrawer));
//                    $conn->send(json_encode($this->curWord));
//                }
//                break;
//            default:
//                foreach ($this->connections as $conn) {
//                    $conn->send($msg);
//                }
//        }
    }
}
