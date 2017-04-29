
import {LoadingController} from 'ionic-angular';
import {Injectable} from "@angular/core";

@Injectable()
export class Loader {

  loader:any;

  constructor(public loadingCtrl: LoadingController) {
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  stopLoading(){
    this.loader.dismiss().catch(() => {});;
  }

}
