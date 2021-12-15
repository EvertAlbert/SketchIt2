<x-app-layout>
    <x-slot name="content">
        <div>
            Hi {{ Auth::user()->name }}, please select a game to join
        </div>
        <nav class="lobbySelect">
            <a href="/lobby/1" class="lobbyButton">game 1</a>
            <a href="/lobby/1" class="lobbyButton">game 2</a>
            <a href="/lobby/1" class="lobbyButton">game 3</a>
            <a href="/lobby/1" class="lobbyButton">game 4</a>
            <a href="/lobby/1" class="lobbyButton">game 5</a>
            <a href="/lobby/1" class="lobbyButton">game 6</a>
            <a href="/lobby/1" class="lobbyButton">game 7</a>
            <a href="/lobby/1" class="lobbyButton">game 8</a>
        </nav>
    </x-slot>

</x-app-layout>
