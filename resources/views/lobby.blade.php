<x-app-layout>
    <x-slot name="content">
        <div>
            Hi {{ Auth::user()->name }}, please wait while the game {{ $gameId }} fills up
        </div>
        <ul>
            <li>Player 1</li>
            <li>Player 2</li>
            <li>Player 3</li>
            <li>Player 4</li>
        </ul>

    </x-slot>

</x-app-layout>
