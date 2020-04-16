<template>
  <div>
    <!-- landing section -->
    <section class="white pa-5">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <h1 class="display-2 mb-4 mt-md-8">Landing page title</h1>
            <p class="subtitle-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ratione repellendus dolor delectus? Dolores consequuntur enim, voluptas ducimus voluptatibus reprehenderit!</p>
            <v-btn class="mb-3" color="primary" x-large>Get Started</v-btn>
          </v-col>

          <v-col cols="12" md="6" class="landing-image">
            <img src="images/landing.png" alt="">
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- partners -->
    <section class="grey lighten-5 partners pa-3">
      <v-container>
        <div class="d-flex justify-center align-center flex-column flex-sm-column flex-md-row">
          <img src="images/partners/slack.png" alt="">
          <img src="images/partners/instagram.png" alt="">
          <img src="images/partners/github.png" alt="">
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

              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                v-text="title"
              ></v-card-title>

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
            <div class="text-uppercase caption">Posts</div>
            <div class="display-1">332</div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="text-uppercase caption">Followers</div>
            <div class="display-1">12k</div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="text-uppercase caption">Stories</div>
            <div class="display-1">4,344</div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="text-uppercase caption">Repositories</div>
            <div class="display-1">85</div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="white pa-5">
      <v-container class="text-center">
        <h2 class="display-1 ma-4">What people are saying</h2>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [{
        image: 'images/features/feature4.svg',
        title: 'Feature',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      },
      {
        image: 'images/features/feature2.svg',
        title: 'Frequent Updates',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      },
      {
        image: 'images/features/feature3.svg',
        title: 'Social Feature',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      }],
      testimonies: [{
        image: 'images/testimonies/person1.png',
        name: 'John Burg',
        company: 'Company',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      },
      {
        image: 'images/testimonies/person2.png',
        name: 'Sandra Bullocks',
        company: 'Company',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
      },
      {
        image: 'images/testimonies/person3.png',
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

  @include media('md-and-up') {
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
