<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\LobbyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/join', function () {
    return view('join');
})->middleware(['auth'])->name('join');

Route::get('/lobby/{gameId}', [LobbyController::class, 'show'])->middleware(['auth'])->name('lobby');
Route::get('/game/{gameId}', [GameController::class, 'show'])->middleware(['auth'])->name('game');


require __DIR__.'/auth.php';
