<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Sketchit 2</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    </head>
    <body>
        @if (Route::has('login'))
            <header>
                <img src="./images/logo.svg" class="smallLogo">
                @auth
                    <nav>
                        <span>Logged in as {{ Auth::user()->name }}</span>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf

                            <a class="pictionaryButton" href="{{ route('logout') }}" onclick="event.preventDefault(); this.closest('form').submit();">
                                {{ __('Log Out') }}
                            </a>
                        </form>
                    </nav>
                @else
                    <nav>
                        <a class="pictionaryButton" href="{{ route('login') }}">Log in</a>

                        @if (Route::has('register'))
                            <a class="pictionaryButton" href="{{ route('register') }}">Register</a>
                        @endif
                    </nav>
                @endauth
            </header>
        @endif

        <main class="content">
            <p>
                @auth
                    <a href="{{ url('/join') }}" class="joinButton">Join game</a>
                @endauth
            </p>
        </main>
    </body>
</html>
