<?php

namespace App\Http\Controllers;

class GameController extends Controller
{
    public function show($gameId)
    {
        return view('game', [
            'gameId' => $gameId
        ]);
    }
}
