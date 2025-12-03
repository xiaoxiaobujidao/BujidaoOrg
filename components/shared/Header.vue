<script setup lang="ts">
import LanguageSelector from '~/components/shared/LanguageSelector.vue'

function goUrl(url: string) {
    window.location.href = url;
}
</script>
<template>
    <div>
        <header>
            <div class="header-container">
                <div class="header-left">
                    <LanguageSelector />
                </div>
                <div>
                    <button @click="goUrl('https://bujidaoChat.t.me')" class="chat-button">{{ $t('common.joinCommunity') }}</button>
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

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-left {
    display: flex;
    align-items: center;
}

.chat-button {
    color: #888;
    border: 1px solid #9e7cf0;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: solid 1px rgba(204, 204, 204, 0.3);
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 1000;
    padding: 15px 3vw;
}

.dark-mode {
    header {
        border-bottom: solid 1px rgba(51, 51, 51, 0.3);
        background-color: rgba(34, 34, 34, 0.4);
    }

    .chat-button {
        color: #ccc;
        border: 1px solid #38affff0;
        background:transparent;
    }

}
</style>