<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Login Form</ion-title>
            <ion-buttons slot="end">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-grid class="ion-padding">
            <ion-row>
                <ion-col>
                    <div class="input_box">
                        <!-- Input with value -->
                        <ion-label>
                            <ion-img :src="mobileIcon" style="width: 25px; height: 25px"></ion-img>
                        </ion-label>
                        <ion-input type="tel" placeholder="Mobile Number" v-model="mobile"></ion-input>
                    </div>
                </ion-col>
            </ion-row>

            <ion-row>
                <ion-col>
                    <div class="input_box">
                        <!-- Input with value -->
                        <ion-label>
                            <ion-img :src="passwordIcon" style="width: 25px; height: 25px"></ion-img>
                        </ion-label>
                        <ion-input type="password" placeholder="Password" v-model="password">
                        </ion-input>
                    </div>
                </ion-col>
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-checkbox :checked="true"></ion-checkbox>
                    <ion-label class="ion-padding-start">I Agree Privacy Policy</ion-label>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="2"></ion-col>
                <ion-col size="8">
                    <ion-button class="gocode" @click="login()">
                        Login
                    </ion-button>
                </ion-col>
                <ion-col size="2"></ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>
<script lang="ts">
let dataState = {
    mobile: "",
    password: "",
    verification_code: "",
    recommendation_code: "",
    isvalid: true,
    is_active: 0,
    is_exists: 0,
    updatedate: "",
    info: null,
    referralfrommobile: 0,
    referralfromreferralcode: 0,
    rcode: "",
    isDisabled: true,
    currentUser: "",
    loginData: {
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
} from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import { arrowBack } from "ionicons/icons";
import { useRouter } from "vue-router";
export default defineComponent({
    name: "ModalRegister",///
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonButton,
        IonItem,
        IonInput,
        modalController
    },
    props: {
        getSession: {
            type: Function,
            required: true,
        },
    },
    setup() {
        const router = useRouter();
        const mobileIcon = computed(() => "/assets/images/phone.png");
        const verifycodeIcon = computed(() => "/assets/images/verifycode.png");
        const passwordIcon = computed(() => "/assets/images/password.png");
        const recomdIcon = computed(() => "/assets/images/recomd.png");
        return {
            arrowBack,
            mobileIcon,
            verifycodeIcon,
            passwordIcon,
            recomdIcon,
            router,
        };
    },
    data() {
        return dataState;
    },
    mounted() {
        let rcode = this.$route.query.r_code;
        if (rcode) {
            let tstr = rcode.toLocaleString();
            if (typeof tstr === "string") {
                this.rcode = tstr;
            }
        }
    },
    methods: {
        cancel() {
            return modalController.dismiss(null, 'cancel');
        },
        async login() {
            let mobilepattern = this.mobile.search(
                /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/
            );
            if (this.mobile === "" || mobilepattern !== 0) {
                this.toastfunction("Please enter valid mobile number", 3000);
                this.isvalid = false;
            } else if (this.password === "") {
                this.toastfunction("Please enter password", 3000);
                this.isvalid = false;
            } else {
                this.isvalid = true;
            }
            if (this.isvalid === true) {
                await axios
                    .post('http://localhost:3000/users/userLogin', { "mobile": this.mobile, "password": this.password })
                    .then((res) => this.loginData = res.data)
                if (this.loginData?.status == "success") {
                    localStorage.clear()
                    this.toastfunction(this.loginData?.message, 1000);
                    let mobileUser = this.loginData?.mobile
                    localStorage.setItem("session_user", mobileUser);
                    this.getSession(mobileUser)
                    this.mobile = ''
                    this.password = ''
                    return modalController.dismiss(null, 'cancel');
                } else {
                    this.toastfunction(this.loginData?.message, 1000);
                }

            }
        },
        checkAuth() {
            console.log('check auth')
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