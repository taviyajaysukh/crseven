<template>
  <ion-page>
    <ion-content :fullscreen="true" class="padding-ctm15">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="win-header">
              <ion-title class="ion-padding-bottom text-ctm-white" v-if="sessionMobile != ''">Available balance:
                ₹{{ userBalance }}</ion-title>
              <ion-button color="secondary" shape="round" @click="() => console.log('payment')"
                v-if="sessionMobile != ''">Recharge
              </ion-button>
              <ion-button color="medium" shape="round" v-if="sessionMobile != ''">{{ sessionMobile }}</ion-button>
              <ion-button color="medium" shape="round" v-if="sessionMobile == ''"
                @click="openModalregister()">Register</ion-button>
              <ion-button color="medium" shape="round" v-if="sessionMobile == ''"
                @click="openModallogin()">Login</ion-button>
              <ion-button color="medium" shape="round" v-if="sessionMobile != ''" @click="logout()">Logout</ion-button>
              <ion-img :src="reloadIcon" class="ion-float-right reload-period"></ion-img>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div class="parity-div">
        Parity
      </div>
      <div class="game-timer-main">
        <ion-grid>
          <ion-row>
            <ion-col>
              <div class="center_top">
                <ion-img :src="trophyIcon" class="reload-trophy"></ion-img><span class="ion-margin-start">Period</span>
              </div>
              <h3>{{ currPeriod }}</h3>
            </ion-col>
            <ion-col class="ion-text-right">
              <h5>Count Down</h5>
            </ion-col>
            <ion-fab-button color="light" size="small">{{ minutes }}</ion-fab-button>
            <ion-fab-button color="light" size="small">{{ seconds }}</ion-fab-button>
          </ion-row>
        </ion-grid>
      </div>
      <div class="game-joinsession-main">
        <ion-grid>
          <ion-row>
            <ion-col class="ion-text-left">
              <ion-button shape="round" :class="{ btncolorgreen: btncolorgreen, btnsomedisabled: btncolordisabled }"
                :disabled="isDisabled" @click="openModalString('green', 10)">Join
                Green</ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
              <ion-button shape="round" :class="{ btncolorviolet: btncolorviolet, btnsomedisabled: btncolordisabled }"
                :disabled="isDisabled" @click="openModalString('violet', 11)">Join
                Violet</ion-button>
            </ion-col>
            <ion-col class="ion-text-right">
              <ion-button shape="round" :class="{ btncolorred: btncolorred, btnsomedisabled: btncolordisabled }"
                :disabled="isDisabled" @click="openModalString('red', 11)">
                Join Red</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="game-joinsession-main">
        <ion-grid>
          <ion-row class="text-center">
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorpattern1: btncolorpattern1, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(0)">0
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorgreen: btncolorgreen, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(1)">1
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorred: btncolorred, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(2)">2
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorgreen: btncolorgreen, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(3)">3
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorred: btncolorred, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(2)">4
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-grid>
          <ion-row class="text-center">
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorpattern2: btncolorpattern2, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(5)">5
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorred: btncolorred, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(6)">6
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorgreen: btncolorgreen, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(7)">7
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorred: btncolorred, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(8)">8
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{ btncolorgreen: btncolorgreen, btnsomedisabled: btncolordisabled }" :disabled="isDisabled"
                @click="openModalNumber(9)">9
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="record-header">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-img :src="trophyIcon" class="reload-trophy1"></ion-img>
              <p>Parity Record </p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="game-result-main">
        <EasyDataTable :headers="headers" :items="itemsAllRecord" buttons-pagination rows-per-page="10">
        </EasyDataTable>
      </div>
      <div class="record-header" v-if="sessionMobile != ''">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-img :src="trophyIcon" class="reload-trophy1"></ion-img>
              <p>My Record</p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="game-myrecord-main text-center" v-if="sessionMobile != ''">
        <EasyDataTable  :headers="headers" :items="itemsMyRecord" buttons-pagination :rowsPerPage="rowsperpage">
          
        </EasyDataTable>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import axios from 'axios'
import { IonContent, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonButton, IonImg, IonFabButton, loadingController, modalController } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import { trophy } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import type { Header } from "vue3-easy-data-table";
import ModalRegister from './components/ModalRegister.vue'
import ModalLogin from './components/ModalLogin.vue'
import ModalParity from './components/ModalParity.vue'
interface MyWindow extends Window {
  myFunction(): void;
}
declare var window: MyWindow;
export default defineComponent({
  name: 'WinPage',
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonTitle,
    IonButton,
    IonImg,
    IonFabButton,
  },
  setup() {
    const headers: Header[] = [
      { text: "Period", value: "perityperiod" },
      { text: "Price", value: "peritytotalamount" },
      { text: "Number", value: "amount" },
      { text: "Quantity", value: "qty" },
      { text: "Joinsection", value: "joinsection" },
      { text: "Result", value: "result" },
    ];
    const reloadIcon = computed(() => '/assets/images/reload.png')
    const trophyIcon = computed(() => '/assets/images/trophy.png')
    const router = useRouter();
    return {
      trophy, reloadIcon, trophyIcon, router, headers
    }
  },
  data() {
    return {
      currentUser: '',
      sessionMobile: "",
      paymentModal: 0,
      periodSession: 0,
      currPeriod: 0,
      minutes: 0,
      seconds: 0,
      time: 0,
      isDisabled: false,
      btncolorgreen: true,
      btncolorviolet: true,
      btncolorred: true,
      btncolorpattern1: true,
      btncolorpattern2: true,
      btncolordisabled: false,
      currentPeriod: 0,
      rowsperpage: 10,
      result: 15,
      lastPeriod: 0,
      items: [{ "period": 0, "amount": 0, "result": 0, "color": '' }],
      itemsAllRecord: [{ "perityperiod": 0, "peritytotalamount": 0, "amount": 0,"qty":0,"joinsection": '',"result":0 }],
      itemsMyRecord: [{ "perityperiod": 0, "peritytotalamount": 0, "amount": 0,"qty":0,"joinsection": '',"result":0 }],
      tabFocus: false,
      balance: 0,
      sessionData: {},
      userBalance: 0
    }
  },
  async beforeMount() {
    this.sessionMobile = localStorage.getItem("session_user") || '';
    this.countdownmain()
    this.getBalance()
  },
  async mounted() {
    await axios
      .get('http://localhost:3000/users/getPeriod', {})
      .then(res => this.currPeriod = res?.data?.period)
    this.getBalance()
    this.getGridRow()
  },
  methods: {
    async getBalance() {
      let currentUser = localStorage.getItem('session_user') || '';
      await axios
        .post('http://localhost:3000/users/getBalance', { mobile: currentUser })
        .then(res => this.userBalance = res.data?.balance)
    },
    getSessionMobile(mobile: string) {
      this.sessionMobile = mobile
    },
    getSessionBalance(balance: number) {
      this.userBalance = balance
    },
    async getGridRow() {
      let currentUser = localStorage.getItem('session_user') || '';
      await axios
        .get('http://localhost:3000/users/getPerity', { })
        .then(res=>this.itemsAllRecord = res.data.data)
        await axios
        .post('http://localhost:3000/users/getPerityByMobile', {mobile:currentUser })
        .then(res=>this.itemsMyRecord = res.data.data)
    },
    async openModalregister() {
      const modal = await modalController.create({
        component: ModalRegister,
      });
      modal.present();
    },
    async openModallogin() {
      const modal = await modalController.create({
        component: ModalLogin,
        componentProps: { getSession: this.getSessionMobile}
      });
      modal.present();
    },
    async openModalString(title: string, number: number) {
      if (this.sessionMobile != '') {
        const modal = await modalController.create({
          component: ModalParity,
          componentProps: { title: title, number: number }
        });
        modal.present();
      } else {
        this.openModallogin()
      }
    },
    async openModalNumber(number: number) {
      if (this.sessionMobile != '') {
        const modal = await modalController.create({
          component: ModalParity,
          componentProps: { number: number,getSessionamount:this.getSessionBalance },
          cssClass: 'setting-modal',
          backdropDismiss: false,
        });
        modal.present();
      } else {
        this.openModallogin()
      }
    },
    // countdown method
    countdownmain: async function (this: any) {
      await axios
        .get('http://localhost:3000/timer/countdown', {})
        .then(res => this.sessionData = res?.data?.data)
      let startsession = parseInt(this.sessionData?.sessionValue);
      let currPeriod = parseInt(this.sessionData?.period)
      this.currPeriod = currPeriod
      this.startsession = startsession
      setInterval(async function (this: any) {
        let minutes = Math.floor(startsession / 60)
        let seconds = Math.floor(startsession % 60)
        this.minutes = minutes
        this.seconds = seconds
        --startsession
        if (minutes == 0 && seconds > 1 && seconds <= 30) {
          this.btncolordisabled = true
          this.btncolorgreen = false
          this.isDisabled = true
          let result = Math.floor(Math.random() * 12);
          this.result = result
        }
        if (startsession == 1) {
          await axios
            .get('http://localhost:3000/users/getPeriod', {})
            .then(res => this.currPeriod = res?.data?.period)
          startsession = 60 * 3
          this.btncolordisabled = false
          this.btncolorgreen = true
          this.isDisabled = false
          let currentUser = localStorage.getItem('session_user') || '';
          await axios
        .get('http://localhost:3000/users/getPerity', { })
        .then(res=>this.itemsAllRecord = res.data.data)
        await axios
        .post('http://localhost:3000/users/getPerityByMobile', {mobile:currentUser })
        .then(res=>this.itemsMyRecord = res.data.data)
        }
        minutes = minutes < 10 ? 0 + minutes : minutes;
        seconds = seconds < 10 ? 0 + seconds : seconds;
      }.bind(this), 1000)
    },
    async logout() {
      localStorage.clear();
      this.sessionMobile = ''
      await axios
        .get('http://localhost:3000/users/userLogout', {})
        .then(res => console.log('Logout'))
    },
  }
});
</script>
<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.text-center {
  text-align: center;
}

.product-card {
  border: 2px solid gray;
  padding: 30px;
}

.product-image .pimg {
  height: 60vh !important;
  width: 70vh !important;
  position: relative;
  left: 10%;
  align-items: center;
}

.parity-div {
  background: #dddddd;
  padding: 18px 5px;
  text-align: center;
}

.prd-label {
  text-align: center;
}

.text-ctm-white {
  color: #fff;
}

.padding-ctm15 {
  --padding-top: 5px;
  --padding-bottom: 5px;
  --padding-start: 5px;
  --padding-end: 5px;
}

.prd-label h4 {
  font-size: 24px;
}

.win-header {
  background: #009688;
  padding: 10px;
  border-radius: 2px;
}

.reload-period {
  width: 40px;
  height: 40px;
}

.reload-trophy {
  width: 20px;
  height: 20px;
}

.center_top {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  color: #7d7d7d;
}

.ion-padding-custom {
  --padding-start: 100px;
  --padding-end: 100px;
}

.game-result-main table {
  width: 100%;
  border-collapse: collapse;
}

.game-result-main table tr {
  border-bottom: 1px solid #e0e0e0;
}

.game-result-main table th {
  width: 20%;
  height: 56px;
  line-height: 56px;
  color: rgba(0, 0, 0, .54);
  font-size: 12px;
  text-align: center;
}

.game-result-main table td {
  height: 48px;
  line-height: 48px;
  font-size: 12px;
  text-align: center;
}

.btncolorgreen {
  --background: #4caf50;
}

.btncolorred {
  --background: #f44336;
}

.btncolorviolet {
  --background: #9c27b0;
}

.btncolorpattern1 {
  --background: linear-gradient(to right bottom, rgb(156, 39, 176) 50%, rgb(244, 67, 54) 50%);
}

.btncolorpattern2 {
  --background: linear-gradient(to right bottom, rgb(156, 39, 176) 50%, rgb(76, 175, 80) 50%);
}

.btnsomedisabled {
  --background: #fff;
  --color: #000000;
}

.record-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #009587;
  padding: 12px 0;
}

.record-header p {
  color: rgba(0, 0, 0, .87);
  font-size: 14px;
  margin-top: 10px;
}

.reload-trophy1 {
  width: 20px;
  height: 20px;
  margin-left: 30px;
}
</style>