<template>
  <div>
    <!-- landing section -->
    <section class="white pb-6">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6" class="mt-md-8">
            <h1 class="display-2 mb-6">{{ $t('home.title') }}</h1>
            <p class="body-1 font-weight-bold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ratione repellendus dolor delectus? Dolores consequuntur enim, voluptas ducimus voluptatibus reprehenderit!</p>
            <v-btn
              class="text-uppercase"
              color="primary"
              x-large
              :to="localePath('/auth/register')"
              nuxt
            >{{ $t('home.getstarted') }}</v-btn>
            <v-btn class="ml-2 text-uppercase" x-large nuxt :to="localePath('/about')">
              <v-icon left>mdi-magnify</v-icon>
              {{ $t('common.about') }}
            </v-btn>
          </v-col>

          <v-col cols="12" md="6" class="landing-image">
            <img src="/images/landing.png" alt="">
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- partners -->
    <section class="grey lighten-5 partners pa-3">
      <v-container>
        <div class="d-flex justify-center align-center flex-column flex-sm-column flex-md-row">
          <img src="/images/partners/slack.png" alt="">
          <img src="/images/partners/instagram.png" alt="">
          <img src="/images/partners/github.png" alt="">
        </div>
      </v-container>
    </section>

    <!-- features -->
    <section class="white text-center">
      <v-container>
        <v-row>
          <v-col
            v-for="({ image, title, text }, i) in features"
            :key="i"
            cols="12"
            md="4"
          >
            <v-card class="py-12 px-4" flat>
              <v-img
                class="mb-5"
                height="200px"
                contain
                :src="image"
              ></v-img>

              <v-card-title class="justify-center font-weight-black text-uppercase">
                {{ $t(title) }}
              </v-card-title>

              <v-card-text class="subtitle-1" v-text="text"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="grey lighten-5 pa-5">
      <v-container class="text-center">
        <v-row>
          <v-col cols="6" md="3">
            <div class="text-uppercase caption">{{ $t('home.stat1') }}</div>
            <div class="display-1">332</div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="text-uppercase caption">{{ $t('home.stat2') }}</div>
            <div class="display-1">12k</div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="text-uppercase caption">{{ $t('home.stat3') }}</div>
            <div class="display-1">4,344</div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="text-uppercase caption">{{ $t('home.stat4') }}</div>
            <div class="display-1">85</div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="white pa-5">
      <v-container class="text-center">
        <h2 class="display-1 ma-4">{{ $t('home.testimonies') }}</h2>

        <v-row>
          <v-col
            v-for="({ image, text, name, company }, i) in testimonies"
            :key="i"
            cols="12"
            md="4"
          >
            <v-card class="py-12 px-4">
              <div>
                <v-avatar color="primary" size="88">
                  <img :src="image">
                </v-avatar>
              </div>

              <v-card-text>
                <div class="subtitle-1">{{ text }}</div>
                <div class="subtitle-1 font-weight-bold mt-5">{{ name }}</div>
                <div class="caption">{{ company }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="white text-center pt-2">
      <v-container>
        <div class="display-1 font-weight-bold">{{ $t('newsletter.title') }}</div>
        <p class="mt-2">{{ $t('newsletter.subtitle') }}</p>
        <newsletter-form />
      </v-container>
      <v-divider class="mt-2"></v-divider>
    </section>
  </div>
</template>
<script>
import NewsletterForm from '../components/common/NewsletterForm'

export default {
  components: {
    NewsletterForm
  },
  data() {
    return {
      features: [{
        image: '/images/features/feature4.svg',
        title: 'home.feature1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      },
      {
        image: '/images/features/feature2.svg',
        title: 'home.feature2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      },
      {
        image: '/images/features/feature3.svg',
        title: 'home.feature3',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      }],
      testimonies: [{
        image: '/images/testimonies/person1.png',
        name: 'John Burg',
        company: 'Company',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      },
      {
        image: '/images/testimonies/person2.png',
        name: 'Sandra Bullocks',
        company: 'Company',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      },
      {
        image: '/images/testimonies/person3.png',
        name: 'Dave Blake',
        company: 'Company',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  text-align: center;

  @include media("md-and-up") {
    text-align: left;
  }
}

.landing-image {
  text-align: center;

  img {
    width: 100%;
    max-width: 600px;
  }
}

.partners {
  img {
    max-width: 160px;
    margin: 0 10px;
  }
}
</style>
