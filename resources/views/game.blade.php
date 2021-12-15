<x-app-layout>
    <x-slot name="content">
        <div class="gameWrapper">
            <section class="game">
                game here
            </section>
            <section id="chat">
                <div>
                    <h3><b id="app">Gamechat</b></h3>
                    <ul class="gameChat" id="chatList">
                    </ul>
                </div>
                <form class="messageInputForm">
                    <input type="text" placeholder="Message chat" class="messageInput">
                    <input type="submit" value="Send" class="messageSubmit">
                </form>
            </section>
        </div>

        <script src="{{url("https://cdn.jsdelivr.net/npm/vue/dist/vue.js")}}"></script>
        <script src="{{url("/js/script.js")}}"></script>
        <script type="text/javascript">
            let username = "{{ Auth::user()->name }}";
        </script>
    </x-slot>
</x-app-layout>
