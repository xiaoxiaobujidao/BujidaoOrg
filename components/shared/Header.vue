<script setup lang="ts">
function goUrl(url: string) {
    window.location.href = url;
}
</script>
<template>
    <div>
        <header>
            <div class="flex justify-between items-center">
                <div></div>
                <div>
                    <button @click="goUrl('https://bujidaoChat.t.me')" class="chat-button">加入社群</button>
                </div>
            </div>
        </header>
    </div>
</template>
<style lang="scss" scoped>
h1 {
    color: #333;
    font-size: 24px;
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    border: none;
}

.chat-button {
    color: #888;
    margin: 15px 3vw;
    border: 1px solid #9e7cf0;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

header {
    // position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: solid 1px #ccc;
}

.dark-mode {
    header {
        border-bottom: solid 1px #333;
    }

    .chat-button {
        color: #ccc;
        border: 1px solid #38affff0;
    }

}
</style>