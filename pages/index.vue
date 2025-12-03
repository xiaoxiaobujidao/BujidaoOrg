<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('index.seo.title'),
  description: () => t('index.seo.description'),
  keywords: () => t('index.seo.keywords')
})

function goUrl(url: string) {
  window.location.href = url;
}
</script>
<template>
  <div class="index">
    <div class="welcome">
      <div>
        <h2 class="welcome-title">{{ $t('index.welcome.title') }}
          <br />
          {{ $t('index.welcome.subtitle') }}
        </h2>
        <div class="welcome-content">
          <div class="welcome-inner">
            <div class="welcome-item">
              <section>
                <div class="container">
                  <p>{{ $t('index.welcome.description1') }}</p>
                  <p>{{ $t('index.welcome.description2') }}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div class="welcome-button-wrapper">
        <button class="register-button" @click="goUrl('https://app.bujidao.org/login')">
          {{ $t('index.welcome.registerButton') }}
        </button>
      </div>
    </div>
    <h2 class="section-title">{{ $t('index.whyChooseUs.title') }}</h2>
    <div class="details">
      <div class="details-row">
        <div class="detail-item">
          <section>
            <h3 class="detail-title">{{ $t('index.whyChooseUs.anonymousPayment.title') }}</h3>
            <div class="container">
              <p>{{ $t('index.whyChooseUs.anonymousPayment.description') }}</p>
            </div>
          </section>
        </div>
        <div class="detail-item">
          <section>
            <h3 class="detail-title">{{ $t('index.whyChooseUs.privacyProtection.title') }}</h3>
            <div class="container">
              <p>{{ $t('index.whyChooseUs.privacyProtection.description') }}</p>
            </div>
          </section>
        </div>
      </div>
      <div class="details-row">
        <div class="detail-item">
          <section>
            <h3 class="detail-title">{{ $t('index.whyChooseUs.payAsYouGo.title') }}</h3>
            <div class="container">
              <p>{{ $t('index.whyChooseUs.payAsYouGo.description') }}</p>
            </div>
          </section>
        </div>
        <div class="detail-item">
          <section>
            <h3 class="detail-title">{{ $t('index.whyChooseUs.alwaysConnected.title') }}</h3>
            <div class="container">
              <p>{{ $t('index.whyChooseUs.alwaysConnected.description') }}</p>
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

// Tailwind 替代样式
.welcome-title {
  text-align: center;
  // text-lg 的字体大小会被 .welcome h2 的样式覆盖，所以这里只设置 text-align
}

.welcome-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.welcome-inner {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.welcome-item {
  padding: 0.375rem; // p-1.5 (6px)
}

.welcome-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem; // m-4 (16px)
}

.section-title {
  // text-xl 的字体大小会被 .index h2 的样式覆盖，所以这里只设置 text-align
  text-align: center;
}

.details {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.details-row {
  display: inline-flex;
  flex-wrap: wrap;
  flex: 0 1 auto; // flex-initial
  justify-content: center;
}

.detail-item {
  padding: 0.375rem; // p-1.5 (6px)
}

.detail-title {
  font-size: 1.125rem; // text-lg
  text-align: center;
}

.container {
  margin: 0.75rem; // m-3 (12px)
  
  @media (min-width: 1024px) {
    max-width: 28rem; // lg:max-w-md (448px)
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
  border-radius: 999px;
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