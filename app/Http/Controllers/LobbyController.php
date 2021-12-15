<?php

namespace App\Http\Controllers;

class LobbyController extends Controller
{
    public function show($gameId)
    {
        return view('lobby', [
//            'id' => User::findOrFail($id)
            'gameId' => $gameId
        ]);
    }

}
