<template>
  <div>
    <!-- landing section -->
    <section class="ma-5">
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
    <section class="grey lighten-5 partners">
      <v-container>
        <div class="d-flex justify-center align-center flex-column flex-sm-column flex-md-row">
          <img src="images/partners/slack.png" alt="">
          <img src="images/partners/instagram.png" alt="">
          <img src="images/partners/github.png" alt="">
        </div>
      </v-container>
    </section>

    <!-- features -->
    <section class="text-center">
      <v-container>
        <h2 class="display-1 ma-4">Features</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi dolores autem officiis quam neque deserunt facere ea ab amet. Aspernatur soluta corporis autem delectus quos officiis, consectetur quaerat sequi necessitatibus!</p>

        <v-timeline>
          <v-timeline-item
            v-for="n in 3"
            :key="n"
            color="primary darken-1"
            large
          >
            <template v-slot:opposite>
              <span>Feature X</span>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="headline">Lorem ipsum</v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </section>
  </div>
</template>

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
