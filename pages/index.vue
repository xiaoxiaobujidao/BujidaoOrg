<script setup lang="ts">
useSeoMeta({
  title: '小小布吉岛',
  description: '百慕大里的小小布吉岛，让您畅享全球互联。',
  keywords: '布吉岛,百慕大里的小小布吉岛,小小布吉岛,机场,全球互联,VPN,GFW,XMR,Monero,USDT,USDC,Polygon,加速器,网络加速,网络优化,XMR购买VPN,匿名VPN,门罗币购买VPN'
})
function goUrl(url: string) {
  window.location.href = url;
}
</script>
<template>
  <div class="index">
    <div class="welcome ">
      <div>
        <h2 class="text-center text-lg">快来小小布吉岛
          <br />
          看大大大世界吧～
        </h2>
        <div class="flex flex-row flex-wrap justify-center">
          <div class="flex flex-row flex-wrap justify-center">
            <div class="p-1.5">
              <section>
                <div class="container lg:max-w-md  m-3">
                  <p>布吉岛采用优质直连加中转的方案，以及最新的Reality、Hy2协议。致力于为用户提供更好的上网体验。</p>
                  <p>我们的节点遍布全球，为您提供更多的选择，给您更好的全球互联体验。</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center align-center m-4">
        <button class="register-button" @click="goUrl('https://app.bujidao.org/login')">
          立即注册
        </button>
      </div>
    </div>
    <h2 class="text-xl text-center">为什么选择我们</h2>
    <div class="details flex flex-row flex-wrap justify-center">
      <div class="inline-flex flex-wrap flex-initial justify-center">
        <div class="p-1.5">
          <section>
            <h3 class="text-lg text-center">匿名支付</h3>
            <div class="container lg:max-w-md  m-3">
              <p>为了大家的隐私，岛岛支持支付宝、微信充值的同时，特引入了虚拟货币的充值方式。
                包括且不限于Monero(门罗币)、USDT、USDC、TRX ...</p>
            </div>
          </section>
        </div>
        <div class="p-1.5">
          <section>
            <h3 class="text-lg text-center">隐私守护</h3>
            <div class="container lg:max-w-md  m-3">
              <p>自研无日志面板，后台不记录用户访问数据，更安心。</p>
            </div>
          </section>
        </div>
      </div>
      <div class="inline-flex flex-wrap flex-initial justify-center ">
        <div class="p-1.5">
          <section>
            <h3 class="text-lg text-center">按量计费</h3>
            <div class="container lg:max-w-md  m-3">
              <p>无套餐的束缚，冲多少用多少。按量计费让您冲起来更放心，用起来更省心。</p>
            </div>
          </section>
        </div>
        <div class="p-1.5">
          <section>
            <h3 class="text-lg text-center">永不失联</h3>
            <div class="container lg:max-w-md  m-3">
              <p>注册即可试用至多1000G免费节点流量，即使余额用尽仍然可以保证有节点可以使用。</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dark-mode {
  .welcome {
    color: #888;
  }

  .index {
    h2 {
      background: linear-gradient(0deg, #38afff, #36aef8);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }

    .details {
      h3 {
        background: linear-gradient(0deg, #38afff, #36aef8);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
    }
  }

  .register-button {
    background: linear-gradient(0deg, #38afff, #36aef8);
  }
}

.welcome {
  margin: 80px 80px;
  color: #888888;

  h2 {
    font-size: 60px !important;
    line-height: 80px !important;
  }

  .details {

    >div>div {
      border-radius: 10px;
      margin: 10px;
      background-color: #4444;
    }

    color:#888888;
  }
}


.index {
  >h2 {
    margin-bottom: 40px;
  }

  .details {

    >div>div {
      border-radius: 10px;
      padding: 5px;
      margin: 10px;
      width: 300px;
    }

    color:#888888;

    h3 {
      font-size: 38px;
      line-height: 50px;
      font-weight: bold;
      background: linear-gradient(0deg, #c179df, #957df5);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  p {
    text-indent: 2em;
    font-size: 18px;
  }

  h2 {
    font-size: 38px;
    line-height: 50px;
    font-weight: bold;
    background: linear-gradient(0deg, #c179df, #957df5);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .welcome {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
}

.register-button {
  background: linear-gradient(0deg, #c179df, #957df5);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

@media screen and (max-width: 600px) {
  .register-button {
    font-size: 16px;
  }

  .welcome {

    h2 {
      font-size: 40px !important;
      line-height: 50px !important;
    }
  }

  h3 {
    font-size: 20px !important;
    line-height: 30px !important;
  }

  p {
    font-size: 14px !important;
  }
}
</style>