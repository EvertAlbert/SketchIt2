<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Sketchit 2') }}</title>

        <!-- Fonts -->

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>
    </head>
    <body>
        <!-- Page Heading -->
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

        <!-- Page Content -->
        <main>
            {{ $slot }}
        </main>
    </body>
</html>
