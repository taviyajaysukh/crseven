<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Recharge</ion-title>
            <ion-buttons slot="end">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-grid class="ion-padding">
            <ion-row>
                <ion-col size="2"></ion-col>
                <ion-col size="4">
                    <ion-thumbnail>
                        <img alt="Silhouette of mountains" :src="trophyIcon" />
                    </ion-thumbnail>
                </ion-col>
                <ion-col size="6" class="custom-top-50">
                    <h3>Please scan qr code and add transaction id</h3>
                    <div class="input_box">
                        <!-- Input with value -->
                        <ion-label>
                            <ion-img :src="verifycodeIcon" style="width: 25px; height: 25px"></ion-img>
                        </ion-label>
                        <ion-input type="text" placeholder="Enter upi transaction id" v-model="upitransactionid">
                        </ion-input>
                    </div>
                    <div class="button_box">
                        <ion-button class="gocode" @click="recharge">
                            Submit
                        </ion-button>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>
<script lang="ts">
let dataState = {
    mobile: "",
    isvalid: true,
    is_active: 0,
    is_exists: 0,
    upitransactionid: '',
    referralfrommobile: 0,
    referralfromreferralcode: 0,
    rcode: "",
    isDisabled: true,
    currentUser: "",
    userRech: {
        status: "",
        message: "",
        mobile: ""
    }
};
import axios from "axios";
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    modalController,
    toastController,
    IonThumbnail
} from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import { arrowBack } from "ionicons/icons";
import { useRouter } from "vue-router";
import '@google-pay/button-element';
export default defineComponent({
    name: "ModalPayment",///
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonButton,
        IonItem,
        IonInput,
        IonThumbnail,
        modalController
    },
    props: {
        getSession: {
            type: Function,
            required: true,
        },
    },
    setup() {
        const trophyIcon = computed(() => '/assets/qrcode/qrcode.png')
        const verifycodeIcon = computed(() => "/assets/images/verifycode.png");
        const router = useRouter();
        return {
            router, trophyIcon, verifycodeIcon
        };
    },
    data() {
        return dataState;
    },
    mounted() {
        console.log()
    },
    methods: {
        onLoadPaymentData: (event: any) => {
            console.log('load payment data', event.detail);
        },
        onError: (event: any) => {
            console.error('error', event.error);
        },
        onPaymentDataAuthorized: (paymentData: any) => {
            console.log('payment authorized', paymentData);

            return {
                transactionState: 'SUCCESS',
            };
        },
        onReadyToPayChange: (event: any) => {
            console.log('ready to pay change', event.detail);
        },
        onClick: () => {
            console.log('click');
        },
        onClickPreventDefault: (event: any) => {
            console.log('prevent default');
            event.preventDefault();
        },
        cancel() {
            return modalController.dismiss(null, 'cancel');
        },
        async recharge() {
            let transactionid = this.upitransactionid || '';
            let currentUser = localStorage.getItem('session_user') || '';
            if (transactionid == '' || transactionid.length < 10) {
                this.toastfunction('Please enter valid upi transaction id', 1000)
            }
            else {
                await axios
                    .post('http://localhost:3000/users/recharge', { mobile: currentUser, transactionid: transactionid })
                    .then(res => this.userRech = res?.data)
                if (this.userRech?.status || this.userRech.message != '') {
                    if (this.userRech?.status == 'success') {
                        this.upitransactionid = ''
                        modalController.dismiss(null, 'cancel');
                    }
                    this.toastfunction(this.userRech?.message, 3000);
                }
            }
        },
        async checkAuth() {
            await axios
                    .get('http://localhost:3000/users/check', {})
                    .then((res) => console.log('check login'))
        },
        async toastfunction(message: string, duration?: number) {
            const toast = await toastController.create({
                message: message,
                duration: duration,
                position: "middle",
                cssClass: "custom-toast",
                buttons: [
                    {
                        text: "Dismiss",
                        role: "cancel",
                    },
                ],
            });
            await toast.present();
        },
    },
});
</script>

<style>
ion-thumbnail {
    --size: 250px;
    --border-radius: 14px;
}

.custom-top-50 {
    padding-top: 20px;
}

.padding-top20 {
    padding-top: 20px;
}

ion-toast.custom-toast {
    --background: #f4f4fa;
    --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
    --color: #4b4a50;
}

ion-toast.custom-toast::part(message) {
    font-style: italic;
}

ion-toast.custom-toast::part(button) {
    border-left: 1px solid #d2d2d2;
    color: #030207;
    font-size: 15px;
}

.gocode {
    width: 100%;
    height: 46px;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 12%);
    line-height: 46px;
    border-radius: 2px;
    border: 0;
    text-align: center;
    --background: #f5f5f5;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.87);
}

.input_box {
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 12%);
    padding: 0 12px;
    box-sizing: border-box;
    line-height: 48px;
    background: #fff;
    border-radius: 2px;
    margin-bottom: 35px;
    position: relative;
}
</style>